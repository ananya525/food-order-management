import { menu, orders } from "./data";
import { MenuItem, Order } from "./types";

export const repository = {
  getMenu(): MenuItem[] {
    return menu;
  },
  getOrder(id: string) {
    return orders.find(o => o.id === id);
  },
  getOrders() {
    return orders;
  },
  createOrder(order: Order) {
    orders.push(order);
    return order;
  },
  updateOrder(id: string, patch: Partial<Order>) {
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return undefined;
    orders[index] = { ...orders[index], ...patch };
    return orders[index];
  },
  deleteOrder(id: string) {
    const index = orders.findIndex(o => o.id === id);
    if (index === -1) return false;
    orders.splice(index, 1);
    return true;
  }
};
