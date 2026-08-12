import express from "express";
import cors from "cors";
import { createOrderSchema, statusSchema, updateOrderSchema } from "./validators";
import { repository } from "./repository";
import { buildOrder, simulateStatus } from "./service";

export const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => res.json({ ok: true }));

app.get("/api/menu", (_req, res) => {
  res.json(repository.getMenu());
});

app.get("/api/orders", (_req, res) => {
  res.json(repository.getOrders());
});

app.get("/api/orders/:id", (req, res) => {
  const order = repository.getOrder(req.params.id);
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

app.post("/api/orders", (req, res) => {
  const parsed = createOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid order", errors: parsed.error.flatten() });

  try {
    const order = buildOrder(parsed.data);
    repository.createOrder(order);
    simulateStatus(order);
    return res.status(201).json(order);
  } catch (error) {
    return res.status(400).json({ message: error instanceof Error ? error.message : "Invalid order" });
  }
});

app.patch("/api/orders/:id", (req, res) => {
  const existing = repository.getOrder(req.params.id);
  if (!existing) return res.status(404).json({ message: "Order not found" });

  const parsed = updateOrderSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid update", errors: parsed.error.flatten() });

  if (parsed.data.items) {
    try {
      const replacement = buildOrder({
        items: parsed.data.items,
        customer: parsed.data.customer ?? existing.customer
      });
      const updated = repository.updateOrder(existing.id, {
        items: replacement.items,
        total: replacement.total,
        customer: replacement.customer
      });
      return res.json(updated);
    } catch (error) {
      return res.status(400).json({ message: error instanceof Error ? error.message : "Invalid items" });
    }
  }

  res.json(repository.updateOrder(existing.id, { customer: parsed.data.customer }));
});

app.patch("/api/orders/:id/status", (req, res) => {
  const existing = repository.getOrder(req.params.id);
  if (!existing) return res.status(404).json({ message: "Order not found" });

  const parsed = statusSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ message: "Invalid status" });

  res.json(repository.updateOrder(existing.id, { status: parsed.data.status }));
});

app.delete("/api/orders/:id", (req, res) => {
  if (!repository.deleteOrder(req.params.id)) {
    return res.status(404).json({ message: "Order not found" });
  }
  res.status(204).send();
});

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});
