import { CartItem } from "../types";

export function Cart({
  items, onChange, onCheckout
}: {
  items: CartItem[];
  onChange: (id: string, quantity: number) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <aside className="cart">
      <h2>Cart</h2>
      {items.length === 0 ? <p>Your cart is empty.</p> : items.map(item => (
        <div className="cartItem" key={item.id}>
          <div>
            <strong>{item.name}</strong>
            <div>₹{item.price * item.quantity}</div>
          </div>
          <div className="qty">
            <button onClick={() => onChange(item.id, item.quantity - 1)}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => onChange(item.id, item.quantity + 1)}>+</button>
          </div>
        </div>
      ))}
      <hr />
      <div className="row"><strong>Total</strong><strong>₹{total}</strong></div>
      <button className="primary full" disabled={!items.length} onClick={onCheckout}>
        Checkout
      </button>
    </aside>
  );
}
