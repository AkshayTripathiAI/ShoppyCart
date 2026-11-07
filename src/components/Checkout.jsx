import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { cartTotals, formatPrice } from "../format";

export default function Checkout({ onBack, onOrderPlaced }) {
  const { items, clearCart } = useContext(CartContext);
  const { subtotal, shipping, total, count } = cartTotals(items);

  function handleSubmit(event) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.target));
    const order = {
      id: `SC-${Date.now().toString(36).toUpperCase()}`,
      name: data.name.trim(),
      email: data.email.trim(),
      total,
      count,
    };
    clearCart();
    onOrderPlaced(order);
  }

  return (
    <form id="checkout" onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <ul className="order-summary">
        {items.map((item) => (
          <li key={item.id}>
            <span>
              {item.quantity} &times; {item.name}
            </span>
            <span>{formatPrice(item.price * item.quantity)}</span>
          </li>
        ))}
        <li>
          <span>Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </li>
        <li>
          <span>Shipping {shipping === 0 && "(free over $200)"}</span>
          <span>{formatPrice(shipping)}</span>
        </li>
        <li className="order-summary-total">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </li>
      </ul>

      <label htmlFor="name">Full name</label>
      <input id="name" name="name" required autoComplete="name" />
      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" required autoComplete="email" />
      <label htmlFor="address">Shipping address</label>
      <input id="address" name="address" required autoComplete="street-address" />

      <p className="checkout-note">
        This is a demo store: no payment is taken and nothing is shipped.
      </p>

      <div className="modal-actions">
        <button type="button" onClick={onBack}>
          Back to cart
        </button>
        <button type="submit">Place order</button>
      </div>
    </form>
  );
}
