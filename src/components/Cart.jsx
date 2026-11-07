import { useContext } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { cartTotals, formatPrice } from "../format";

export default function Cart() {
  const { items, updateItemQuantity, removeItem } = useContext(CartContext);
  const { subtotal } = cartTotals(items);

  return (
    <div id="cart">
      {items.length === 0 && <p>Your cart is empty. Go find something nice!</p>}
      {items.length > 0 && (
        <ul id="cart-items">
          {items.map((item) => (
            <li key={item.id}>
              <div>
                <span>{item.name}</span>
                <span> ({formatPrice(item.price)})</span>
              </div>
              <div className="cart-item-actions">
                <button
                  type="button"
                  aria-label={`Decrease quantity of ${item.name}`}
                  onClick={() => updateItemQuantity(item.id, -1)}
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  type="button"
                  aria-label={`Increase quantity of ${item.name}`}
                  onClick={() => updateItemQuantity(item.id, 1)}
                >
                  +
                </button>
                <button
                  type="button"
                  className="cart-item-remove"
                  aria-label={`Remove ${item.name}`}
                  onClick={() => removeItem(item.id)}
                >
                  &times;
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formatPrice(subtotal)}</strong>
      </p>
    </div>
  );
}
