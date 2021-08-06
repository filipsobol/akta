import { defineConfig } from 'vite';
import Akta from '@akta/plugin';

export default defineConfig({
  resolve: {
    alias: {
      '~/': __dirname
    }
  },

  server: {
    fs: {
      strict: true,
    },
  },

  plugins: [
    Akta()
  ],

  optimizeDeps: {
    include: [
      '@vueuse/head',
      'vue',
      'vue-router'
    ]
  },
});
