import { MenuItem } from "../types";

export function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <article className="card">
      <img src={item.image} alt={item.name} />
      <div className="cardBody">
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <div className="row">
          <strong>₹{item.price}</strong>
          <button onClick={onAdd}>Add to cart</button>
        </div>
      </div>
    </article>
  );
}
