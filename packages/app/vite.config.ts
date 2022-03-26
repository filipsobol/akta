import { resolve } from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

const pkg = require('./package.json');

export default defineConfig({
  plugins: [
    Vue()
  ],
  build: {
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      formats: ['es'],
      fileName: () => `index.mjs`
    },
    rollupOptions: {
      external: [
        'virtual:routes',
        ...Object.keys(pkg.dependencies)
      ]
    }
  }
});
