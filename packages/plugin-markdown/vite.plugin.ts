import { resolve } from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

const pkg = require('./package.json');

export default defineConfig({
  plugins: [
    Vue()
  ],
  build: {
    ssr: true,
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, './src/plugin.ts'),
      formats: ['cjs'],
      fileName: () => `plugin.js`
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies)
    }
  }
});
