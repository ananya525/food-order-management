import request from "supertest";
import { describe, expect, it } from "vitest";
import { app } from "../src/app";

describe("Order API", () => {
  it("gets the menu", async () => {
    const response = await request(app).get("/api/menu");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("rejects an empty cart", async () => {
    const response = await request(app).post("/api/orders").send({
      items: [],
      customer: { name: "Aaryan", address: "Delhi", phone: "9876543210" }
    });
    expect(response.status).toBe(400);
  });

  it("creates and retrieves an order", async () => {
    const created = await request(app).post("/api/orders").send({
      items: [{ menuItemId: "classic-burger", quantity: 2 }],
      customer: { name: "Aaryan", address: "Delhi, India", phone: "9876543210" }
    });

    expect(created.status).toBe(201);
    expect(created.body.total).toBe(398);

    const fetched = await request(app).get(`/api/orders/${created.body.id}`);
    expect(fetched.status).toBe(200);
    expect(fetched.body.status).toBe("Order Received");
  });

  it("rejects an invalid phone number", async () => {
    const response = await request(app).post("/api/orders").send({
      items: [{ menuItemId: "classic-burger", quantity: 1 }],
      customer: { name: "Test", address: "Delhi, India", phone: "123" }
    });
    expect(response.status).toBe(400);
  });

  it("updates order status", async () => {
    const created = await request(app).post("/api/orders").send({
      items: [{ menuItemId: "french-fries", quantity: 1 }],
      customer: { name: "Test", address: "Delhi, India", phone: "9876543210" }
    });

    const updated = await request(app)
      .patch(`/api/orders/${created.body.id}/status`)
      .send({ status: "Preparing" });

    expect(updated.status).toBe(200);
    expect(updated.body.status).toBe("Preparing");
  });

  it("deletes an order", async () => {
    const created = await request(app).post("/api/orders").send({
      items: [{ menuItemId: "french-fries", quantity: 1 }],
      customer: { name: "Test", address: "Delhi, India", phone: "9876543210" }
    });

    const deleted = await request(app).delete(`/api/orders/${created.body.id}`);
    expect(deleted.status).toBe(204);

    const fetched = await request(app).get(`/api/orders/${created.body.id}`);
    expect(fetched.status).toBe(404);
  });
});
