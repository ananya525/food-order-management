import { FormEvent, useState } from "react";

export function CheckoutForm({ onSubmit, onCancel }: {
  onSubmit: (customer: { name: string; address: string; phone: string }) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState({ name: "", address: "", phone: "" });
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Enter your name.");
    if (form.address.trim().length < 5) return setError("Enter a valid address.");
    if (!/^[6-9]\d{9}$/.test(form.phone)) return setError("Enter a valid 10-digit Indian mobile number.");
    setError("");
    onSubmit(form);
  }

  return (
    <form className="checkout" onSubmit={submit}>
      <h2>Delivery Details</h2>
      <label>Name<input value={form.name} onChange={e => setForm({...form, name: e.target.value})} /></label>
      <label>Address<textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} /></label>
      <label>Phone<input value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} /></label>
      {error && <p className="error">{error}</p>}
      <div className="row">
        <button type="button" onClick={onCancel}>Back</button>
        <button className="primary" type="submit">Place Order</button>
      </div>
    </form>
  );
}
