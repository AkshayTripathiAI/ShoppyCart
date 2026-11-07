import { useContext, useRef } from "react";

import CartModal from "./CartModal.jsx";
import { CartContext } from "../store/shopping-cart-context.jsx";
import { cartTotals } from "../format";

export default function Header() {
  const modal = useRef();
  const { items } = useContext(CartContext);
  const { count } = cartTotals(items);

  return (
    <>
      <CartModal ref={modal} />
      <header id="main-header">
        <div id="main-title">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="ShoppyCart logo" />
          <h1>ShoppyCart</h1>
        </div>
        <p>
          <button onClick={() => modal.current.open()}>Cart ({count})</button>
        </p>
      </header>
    </>
  );
}
