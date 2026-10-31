import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { readdirSync, statSync } from 'node:fs';

function collectIndexHtml(dir = '.', out = []) {
  for (const name of readdirSync(dir)) {
    if (name === 'node_modules' || name === 'dist' || name === '.git' || name === '_optimize' || name === '_checks') continue;
    const path = dir === '.' ? name : `${dir}/${name}`;
    const st = statSync(path);
    if (st.isDirectory()) collectIndexHtml(path, out);
    else if (name === 'index.html') out.push(path);
  }
  return out;
}

const pages = collectIndexHtml().filter(p =>
  p === 'index.html' || p.startsWith('demos/') || p.startsWith('experiments/'),
);

if (!pages.length) throw new Error('vite build: no index.html inputs found');

export default defineConfig({
  build: { rollupOptions: { input: pages.map(page => resolve(page)) } },
});
