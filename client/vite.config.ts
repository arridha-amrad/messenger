import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@comps/': new URL('./src/components/', import.meta.url).pathname,
      '@features/': new URL('./src/features/', import.meta.url).pathname,
      '@assets/': new URL('./src/assets/', import.meta.url).pathname,
      '@hooks/': new URL('./src/hooks/', import.meta.url).pathname,
    },
  },
});
