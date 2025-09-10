import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        privatlivspolitik: resolve(__dirname, 'privatlivspolitik.html'),
        handelsbetingelser: resolve(__dirname, 'handelsbetingelser.html'),
      }
    }
  }
});