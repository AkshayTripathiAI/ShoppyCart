import { forwardRef, useContext, useImperativeHandle, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Cart from "./Cart";
import Checkout from "./Checkout";
import { CartContext } from "../store/shopping-cart-context";
import { formatPrice } from "../format";

const CartModal = forwardRef(function CartModal(_props, ref) {
  const dialog = useRef();
  const { items } = useContext(CartContext);
  // "cart" -> "checkout" -> "done"
  const [step, setStep] = useState("cart");
  const [order, setOrder] = useState(null);

  useImperativeHandle(ref, () => ({
    open: () => dialog.current.showModal(),
  }));

  function close() {
    dialog.current.close();
  }

  function handleClose() {
    setStep("cart");
    setOrder(null);
  }

  let content;
  if (step === "checkout" && items.length > 0) {
    content = (
      <Checkout
        onBack={() => setStep("cart")}
        onOrderPlaced={(placed) => {
          setOrder(placed);
          setStep("done");
        }}
      />
    );
  } else if (step === "done" && order) {
    content = (
      <div id="order-success">
        <h2>Order placed!</h2>
        <p>
          Thank you, {order.name}. Your order <strong>{order.id}</strong> of{" "}
          {order.count} item{order.count === 1 ? "" : "s"} totalling{" "}
          <strong>{formatPrice(order.total)}</strong> is confirmed.
        </p>
        <p>A (pretend) confirmation is on its way to {order.email}.</p>
        <div className="modal-actions">
          <button type="button" onClick={close}>
            Continue shopping
          </button>
        </div>
      </div>
    );
  } else {
    content = (
      <>
        <h2>Your Cart</h2>
        <Cart />
        <div className="modal-actions">
          <button type="button" onClick={close}>
            Close
          </button>
          {items.length > 0 && (
            <button type="button" onClick={() => setStep("checkout")}>
              Checkout
            </button>
          )}
        </div>
      </>
    );
  }

  return createPortal(
    <dialog id="modal" ref={dialog} onClose={handleClose}>
      {content}
    </dialog>,
    document.getElementById("modal-root"),
  );
});

export default CartModal;
