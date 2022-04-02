import { defineConfig } from 'vite';
import { AktaPlugin } from '@akta/plugin';
import { MarkdownPlugin } from '@akta/plugin-markdown';
import remarkShikiTwoslash from 'remark-shiki-twoslash';

export default defineConfig({
  plugins: [
    AktaPlugin(),
    MarkdownPlugin({
      remarkPlugins: [
        [remarkShikiTwoslash.default, { theme: 'css-variables' }]
      ]
    })
  ],
  server: {
    watch: {
      ignored: ['!**/node_modules/@akta/**']
    }
  },
  optimizeDeps: {
    include: [
      '@vueuse/head',
      'vue',
      'vue-router'
    ],
    exclude: [
      '@akta/app',
      '@akta/plugin',
      '@akta/plugin-markdown',
      '@akta/server'
    ]
  }
});
