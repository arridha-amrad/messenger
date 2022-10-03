import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      '/api/': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  plugins: [react()],

  resolve: {
    alias: {
      '@comps/': new URL('./src/components/', import.meta.url).pathname,
      '@features/': new URL('./src/features/', import.meta.url).pathname,
      '@assets/': new URL('./src/assets/', import.meta.url).pathname,
      '@hooks/': new URL('./src/hooks/', import.meta.url).pathname,
      '@utils/': new URL('./src/utils/', import.meta.url).pathname,
    },
  },
});
