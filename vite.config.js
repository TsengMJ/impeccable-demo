import { defineConfig } from 'vite';
import { resolve } from 'node:path';

const pages = ['index.html', 'demos/lumina/index.html', 'demos/lumina-classic/index.html',
  'experiments/wallet/index.html', 'experiments/tea/index.html', 'experiments/festival/index.html'];

export default defineConfig({
  build: { rollupOptions: { input: pages.map(page => resolve(page)) } },
});
