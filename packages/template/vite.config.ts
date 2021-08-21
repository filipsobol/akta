import { defineConfig } from 'vite';
import Akta from '@akta/plugin';

export default defineConfig({
  plugins: [
    Akta()
  ],
  optimizeDeps: {
    include: [
      '@vueuse/head',
      'vue',
      'vue-router'
    ]
  }
});
