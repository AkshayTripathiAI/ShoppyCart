import { useContext, useEffect, useState } from "react";
import { CartContext } from "../store/shopping-cart-context";
import { formatPrice } from "../format";

export default function Product({ id, image, title, price, description }) {
  const { items, addItemToCart } = useContext(CartContext);
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.find((item) => item.id === id)?.quantity ?? 0;

  useEffect(() => {
    if (!justAdded) return;
    const timer = setTimeout(() => setJustAdded(false), 1200);
    return () => clearTimeout(timer);
  }, [justAdded]);

  function handleAdd() {
    addItemToCart(id);
    setJustAdded(true);
  }

  return (
    <article className="product">
      <img src={image} alt={title} loading="lazy" />
      <div className="product-content">
        <div>
          <h3>{title}</h3>
          <p className="product-price">{formatPrice(price)}</p>
          <p>{description}</p>
        </div>
        <p className="product-actions">
          {inCart > 0 && <span className="product-in-cart">{inCart} in cart</span>}
          <button onClick={handleAdd}>{justAdded ? "Added!" : "Add to Cart"}</button>
        </p>
      </div>
    </article>
  );
}
