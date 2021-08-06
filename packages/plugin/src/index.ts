import path from 'path';
import Vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';
import RegisterComponents from 'vite-plugin-components';
import MarkdownEmoji from 'markdown-it-emoji';
import MarkdownPrism from 'markdown-it-prism';
import MarkdownAnchor from 'markdown-it-anchor';
import MarkdownToc from 'markdown-it-toc-done-right';

export default function framework(config) {
  return [
    Vue({
      include: [
        /\.vue$/,
        /\.md$/
      ],
      ssr: true
    }),

    RegisterComponents({
      deep: true,
      dirs: [
        path.resolve(process.cwd(), 'components'),
      ],
      extensions: [
        'vue',
        'md'
      ],
      customLoaderMatcher: path => path.endsWith('.md'),
    }),

    Markdown({
      headEnabled: true,
      markdownItOptions: {
        html: true,
        xhtmlOut: true,
        breaks: true,
        linkify: true,
        typographer: true,
      },
      markdownItSetup(md) {
        md.use(MarkdownAnchor);
        md.use(MarkdownEmoji);
        md.use(MarkdownPrism);
        md.use(MarkdownToc);
      }
    })
  ];
}
