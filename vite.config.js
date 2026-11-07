import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  // Production build is served from https://akshaytripathiai.github.io/ShoppyCart/
  base: command === 'build' ? '/ShoppyCart/' : '/',
  plugins: [react()],
}))
