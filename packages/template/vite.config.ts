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
  },
  build: {
    minify: false
  },
  ssr: {
    noExternal: []
  },
  resolve: {
    // necessary because vue.ssrUtils is only exported on cjs modules
    alias: [
      {
        find: '@vue/runtime-dom',
        replacement: '@vue/runtime-dom/dist/runtime-dom.cjs.js'
      },
      {
        find: '@vue/runtime-core',
        replacement: '@vue/runtime-core/dist/runtime-core.cjs.js'
      }
    ]
  }
});
