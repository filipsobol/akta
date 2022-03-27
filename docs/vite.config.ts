import { defineConfig } from 'vite';
import { AktaPlugin } from '@akta/plugin';
import { MarkdownPlugin } from '@akta/plugin-markdown';

export default defineConfig({
  plugins: [
    AktaPlugin(),
    MarkdownPlugin()
  ],
  optimizeDeps: {
    include: [
      '@vueuse/head',
      'vue',
      'vue-router'
    ]
  }
});
