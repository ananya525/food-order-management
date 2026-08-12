export type OrderStatus =
  | "Order Received"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface OrderItem {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Customer {
  name: string;
  address: string;
  phone: string;
}

export interface Order {
  id: string;
  items: OrderItem[];
  customer: Customer;
  total: number;
  status: OrderStatus;
  createdAt: string;
}
