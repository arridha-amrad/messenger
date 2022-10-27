import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        base: 'http://localhost',
        port: 3000,
        proxy: {
            '/api/': {
                target: 'http://localhost:5000',
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
            '@app/': new URL('./src/app/', import.meta.url).pathname,
            '@context/': new URL('./src/context/', import.meta.url).pathname,
        },
    },
});
