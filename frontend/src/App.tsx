import { useEffect, useMemo, useState } from "react";
import { getMenu, createOrder } from "./api";
import { MenuItem, CartItem, Order } from "./types";
import { MenuCard } from "./components/MenuCard";
import { Cart } from "./components/Cart";
import { CheckoutForm } from "./components/CheckoutForm";
import { OrderStatus } from "./components/OrderStatus";
import "./styles.css";

type View = "menu" | "checkout" | "status";

export default function App() {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [view, setView] = useState<View>("menu");
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getMenu().then(setMenu).catch(e => setError(e.message));
  }, []);

  function add(item: MenuItem) {
    setCart(current => {
      const found = current.find(i => i.id === item.id);
      if (found) return current.map(i => i.id === item.id ? {...i, quantity: i.quantity + 1} : i);
      return [...current, {...item, quantity: 1}];
    });
  }

  function change(id: string, quantity: number) {
    setCart(current => quantity < 1
      ? current.filter(i => i.id !== id)
      : current.map(i => i.id === id ? {...i, quantity: Math.min(quantity, 20)} : i)
    );
  }

  async function placeOrder(customer: {name: string; address: string; phone: string}) {
    try {
      const created = await createOrder({
        customer,
        items: cart.map(i => ({ menuItemId: i.id, quantity: i.quantity }))
      });
      setOrder(created);
      setCart([]);
      setView("status");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to place order");
    }
  }

  const total = useMemo(() => cart.reduce((s, i) => s + i.price * i.quantity, 0), [cart]);

  return (
    <div className="app">
      <header>
        <div>
          <p className="eyebrow">FOOD DELIVERY</p>
          <h1>QuickBite</h1>
        </div>
        <div className="pill">{cart.length} item{cart.length === 1 ? "" : "s"} · ₹{total}</div>
      </header>

      {error && <div className="alert">{error}<button onClick={() => setError("")}>×</button></div>}

      {view === "menu" && (
        <main className="layout">
          <section>
            <h2>Today's Menu</h2>
            <div className="menu">{menu.map(item => <MenuCard key={item.id} item={item} onAdd={() => add(item)} />)}</div>
          </section>
          <Cart items={cart} onChange={change} onCheckout={() => setView("checkout")} />
        </main>
      )}

      {view === "checkout" && (
        <main className="center">
          <CheckoutForm onSubmit={placeOrder} onCancel={() => setView("menu")} />
        </main>
      )}

      {view === "status" && order && (
        <main className="center">
          <OrderStatus order={order} />
          <button onClick={() => {setOrder(null); setView("menu")}}>Back to Menu</button>
        </main>
      )}
    </div>
  );
}
