# ShoppyCart

A small React storefront with a shopping cart, built to practise sharing state with the Context API and `useReducer`.

Built as a practice project while learning React.

![Landing page](./screenshots/LandingPage.png)
![Cart modal](./screenshots/ShoppingCartModal.png)

## Features

- Product grid of six sample clothing items, with an "in cart" badge on each product
- Add items to the cart; adding the same item again increases its quantity
- Cart modal (native `<dialog>`) with +/- quantity controls, remove buttons and a running total
- Checkout step: order summary (subtotal, shipping, total) and a short name/email/address form, followed by an "order placed" confirmation that empties the cart. It is a demo, so no payment is taken.
- Cart is saved to `localStorage`, so it survives page reloads
- Cart state shared across components via React Context and a reducer
- Responsive layout for phones and tablets

## Tech stack

- React 18 (Context API, `useReducer`, portals)
- Vite 4

## Getting started

Prerequisites: Node.js 18+ and npm.

```bash
git clone https://github.com/AkshayTripathiAI/ShoppyCart.git
cd ShoppyCart
npm install
npm run dev
```

Then open the URL Vite prints (by default http://localhost:5173).

Other scripts: `npm run build` (outputs `dist/`, built for the `/ShoppyCart/` path used by GitHub Pages), `npm run preview`.

## Project structure

```
src/
  App.jsx                          # wraps the app in the cart provider
  dummy-products.js                # sample product data
  format.js                        # price formatting and cart totals
  store/shopping-cart-context.jsx  # CartContext + reducer + localStorage persistence
  components/
    Header.jsx                     # title and cart button
    Shop.jsx, Product.jsx          # product grid
    CartModal.jsx                  # dialog that switches between cart, checkout and confirmation
    Cart.jsx, Checkout.jsx         # cart line items and checkout form
```

## License

MIT - see [LICENSE](LICENSE).
