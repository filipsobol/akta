import path from 'path';
import { defineConfig } from 'vite';
import Vue from '@vitejs/plugin-vue';

const pkg = require('./package.json');

export default defineConfig({
  plugins: [
    Vue()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.mjs',
    },
    rollupOptions: {
      external: [
        'virtual:routes',
        'virtual:notifier',
        ...Object.keys(pkg.dependencies)
      ]
    }
  }
});
