# ShoppyCart

A small React storefront with a shopping cart, built to practise sharing state with the Context API and `useReducer`.

Built as a practice project while learning React.

![Landing page](./screenshots/LandingPage.png)
![Cart modal](./screenshots/ShoppingCartModal.png)

## Features

- Product grid of six sample clothing items
- Add items to the cart; adding the same item again increases its quantity
- Cart modal (native `<dialog>`) with +/- quantity controls and a running total
- Cart state shared across components via React Context and a reducer

The Checkout button is a placeholder; there is no checkout or payment flow.

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

Other scripts: `npm run build`, `npm run preview`.

## Project structure

```
src/
  App.jsx                          # wraps the app in the cart provider
  dummy-products.js                # sample product data
  store/shopping-cart-context.jsx  # CartContext + reducer
  components/
    Header.jsx                     # title and cart button
    Shop.jsx, Product.jsx          # product grid
    CartModal.jsx, Cart.jsx        # cart dialog and line items
```

## License

MIT - see [LICENSE](LICENSE).
