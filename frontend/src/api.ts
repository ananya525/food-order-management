import { MenuItem, Order } from "./types";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "Request failed" }));
    throw new Error(error.message || "Request failed");
  }
  return response.status === 204 ? (undefined as T) : response.json();
}

export const getMenu = () => request<MenuItem[]>("/menu");
export const createOrder = (body: unknown) =>
  request<Order>("/orders", { method: "POST", body: JSON.stringify(body) });
export const getOrder = (id: string) => request<Order>(`/orders/${id}`);
