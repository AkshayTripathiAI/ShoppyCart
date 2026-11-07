import { createContext, useEffect, useReducer } from "react";

import { DUMMY_PRODUCTS } from "../dummy-products.js";

const STORAGE_KEY = "shoppycart.cart";

export const CartContext = createContext({
  items: [],
  addItemToCart: () => {},
  updateItemQuantity: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

function loadInitialCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(stored)) return { items: [] };
    // Rebuild items from the product catalogue so stale names/prices are never shown.
    const items = stored
      .map(({ id, quantity }) => {
        const product = DUMMY_PRODUCTS.find((p) => p.id === id);
        if (!product || !Number.isInteger(quantity) || quantity <= 0) return null;
        return { id, name: product.title, price: product.price, quantity };
      })
      .filter(Boolean);
    return { items };
  } catch {
    return { items: [] };
  }
}

function shoppingCartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload);
      if (existing) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        };
      }
      const product = DUMMY_PRODUCTS.find((p) => p.id === action.payload);
      if (!product) return state;
      return {
        ...state,
        items: [
          ...state.items,
          { id: product.id, name: product.title, price: product.price, quantity: 1 },
        ],
      };
    }
    case "UPDATE_ITEM": {
      const { productId, amount } = action.payload;
      return {
        ...state,
        items: state.items
          .map((item) =>
            item.id === productId
              ? { ...item, quantity: item.quantity + amount }
              : item,
          )
          .filter((item) => item.quantity > 0),
      };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

export default function CartContextProvider({ children }) {
  const [shoppingCartState, shoppingCartDispatch] = useReducer(
    shoppingCartReducer,
    undefined,
    loadInitialCart,
  );

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          shoppingCartState.items.map(({ id, quantity }) => ({ id, quantity })),
        ),
      );
    } catch {
      // Storage may be unavailable (private mode); the cart still works in memory.
    }
  }, [shoppingCartState.items]);

  const ctxValue = {
    items: shoppingCartState.items,
    addItemToCart: (id) => shoppingCartDispatch({ type: "ADD_ITEM", payload: id }),
    updateItemQuantity: (productId, amount) =>
      shoppingCartDispatch({ type: "UPDATE_ITEM", payload: { productId, amount } }),
    removeItem: (id) => shoppingCartDispatch({ type: "REMOVE_ITEM", payload: id }),
    clearCart: () => shoppingCartDispatch({ type: "CLEAR_CART" }),
  };

  return (
    <CartContext.Provider value={ctxValue}>{children}</CartContext.Provider>
  );
}
