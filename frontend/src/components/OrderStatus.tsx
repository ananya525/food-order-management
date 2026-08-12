import { useEffect, useState } from "react";
import { getOrder } from "../api";
import { Order } from "../types";

export function OrderStatus({ order: initial }: { order: Order }) {
  const [order, setOrder] = useState(initial);

  useEffect(() => {
    const timer = window.setInterval(async () => {
      try {
        const latest = await getOrder(initial.id);
        setOrder(latest);
        if (latest.status === "Delivered" || latest.status === "Cancelled") clearInterval(timer);
      } catch {}
    }, 2000);
    return () => clearInterval(timer);
  }, [initial.id]);

  const steps = ["Order Received", "Preparing", "Out for Delivery", "Delivered"];
  const active = steps.indexOf(order.status);

  return (
    <section className="status">
      <p className="muted">Order #{order.id.slice(0, 8)}</p>
      <h2>{order.status}</h2>
      <div className="timeline">
        {steps.map((step, index) => (
          <div className={index <= active ? "step active" : "step"} key={step}>
            <span>{index + 1}</span><strong>{step}</strong>
          </div>
        ))}
      </div>
      <p>Total: <strong>₹{order.total}</strong></p>
      <p>Delivering to: {order.customer.address}</p>
    </section>
  );
}
