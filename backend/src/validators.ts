import { z } from "zod";

export const createOrderSchema = z.object({
  items: z.array(
    z.object({
      menuItemId: z.string().min(1),
      quantity: z.number().int().min(1).max(20)
    })
  ).min(1),
  customer: z.object({
    name: z.string().trim().min(2).max(100),
    address: z.string().trim().min(5).max(300),
    phone: z.string().regex(/^[6-9]\d{9}$/, "Phone must be a valid 10-digit Indian mobile number")
  })
});

export const updateOrderSchema = z.object({
  customer: createOrderSchema.shape.customer.optional(),
  items: createOrderSchema.shape.items.optional()
});

export const statusSchema = z.object({
  status: z.enum([
    "Order Received",
    "Preparing",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
  ])
});
