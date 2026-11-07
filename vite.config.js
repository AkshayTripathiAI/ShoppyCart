import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // The app is published at https://akshaytripathiai.github.io/ShoppyCart/,
  // so dev, build and preview all serve it under /ShoppyCart/.
  base: '/ShoppyCart/',
  plugins: [react()],
})
