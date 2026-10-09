import { defineConfig } from 'vite';
import { resolve } from 'path';

const pages = [
  'index', 'about', 'apps', 'tech', 'team', 'contact', 'privacy-policy'
];

const input = {};
pages.forEach(p => input[p] = resolve(__dirname, `${p}.html`));

export default defineConfig({
  build: {
    rollupOptions: { input },
    outDir: 'dist',
    assetsInlineLimit: 0,
  },
});
