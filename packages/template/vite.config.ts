import { defineConfig } from 'vite';
import { AktaPlugin } from '@akta/plugin';

export default defineConfig({
  plugins: [
    AktaPlugin()
  ],
  optimizeDeps: {
    include: [
      '@vueuse/head',
      'vue',
      'vue-router'
    ]
  }
});
