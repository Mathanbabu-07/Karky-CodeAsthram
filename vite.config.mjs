import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: false,
    proxy: {
      '/api': {
        // Proxy to production backend for prod testing from dev server
        target: 'https://python.tarcin.in',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: false,
      }
    },
    headers: {
      // Allow our API hosts and dev websockets under CSP
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'wasm-unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' ws: wss: https://fonts.googleapis.com https://fonts.gstatic.com *.google.com https://python.tarcin.in http://192.168.1.3:5000 http://127.0.0.1:5000 https://python.tarcin.in; img-src 'self' data: https:; media-src 'self';"
    }
  },
  build: {
    chunkSizeWarningLimit: 1500, // KB — allow larger bundles without warning
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: true,
    }
  }
});