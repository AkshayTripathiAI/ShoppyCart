const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPrice(value) {
  return currency.format(value);
}

export function cartTotals(items) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const count = items.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= 200 ? 0 : 9.99;
  return { subtotal, count, shipping, total: subtotal + shipping };
}
