import { randomUUID } from "crypto";
import { repository } from "./repository";
import { Order, OrderStatus } from "./types";

const progression: OrderStatus[] = [
  "Order Received",
  "Preparing",
  "Out for Delivery",
  "Delivered"
];

export function buildOrder(input: any): Order {
  const menu = repository.getMenu();
  const items = input.items.map((item: any) => {
    const product = menu.find(m => m.id === item.menuItemId);
    if (!product) throw new Error(`Menu item not found: ${item.menuItemId}`);
    return {
      menuItemId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    };
  });

  return {
    id: randomUUID(),
    items,
    customer: input.customer,
    total: items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0),
    status: "Order Received",
    createdAt: new Date().toISOString()
  };
}

export function simulateStatus(order: Order) {
  progression.slice(1).forEach((status, index) => {
    setTimeout(() => {
      const current = repository.getOrder(order.id);
      if (current && current.status !== "Cancelled") {
        repository.updateOrder(order.id, { status });
      }
    }, (index + 1) * 5000);
  });
}
