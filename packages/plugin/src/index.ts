import Vue from '@vitejs/plugin-vue';
import RegisterComponents from 'vite-plugin-components';
import Markdown from 'vite-plugin-md';

export default function framework(config) {
  return [
    Vue({
      include: [
        /\.vue$/,
        /\.md$/
      ],
    }),

    RegisterComponents({
      extensions: [
        'vue',
        'md'
      ],

      dirs: [
        'src/components'
      ],

      customLoaderMatcher: path => path.endsWith('.md'),
    }),

    Markdown({
      
    })
  ];
}
