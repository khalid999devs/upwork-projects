import { defineConfig } from 'vite';
import { resolve } from 'path';
import fs from 'fs';

// Dynamically detect all HTML files in root
const htmlFiles = fs
  .readdirSync(resolve(__dirname))
  .filter((file) => file.endsWith('.html'))
  .reduce((entries, file) => {
    const name = file.replace(/\.html$/, '');
    entries[name] = resolve(__dirname, file);
    return entries;
  }, {});

export default defineConfig({
  build: {
    rollupOptions: {
      input: htmlFiles,
    },
    outDir: 'dist',
    emptyOutDir: true,
  },
  server: {
    open: '/index.html',
  },
});
