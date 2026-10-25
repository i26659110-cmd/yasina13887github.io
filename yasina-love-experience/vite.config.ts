import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' lets the built site work from a domain root or a sub-path (GitHub Pages, Netlify, etc.)
export default defineConfig({
  plugins: [react()],
  base: './',
});
