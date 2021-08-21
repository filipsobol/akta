import path from 'path';
import string from 'string';
import Vue from '@vitejs/plugin-vue';
import Pages from "vite-plugin-pages";
import Markdown from 'vite-plugin-md';
import RegisterComponents from 'vite-plugin-components';
import MarkdownEmoji from 'markdown-it-emoji';
import MarkdownPrism from 'markdown-it-prism';
import MarkdownAnchor from 'markdown-it-anchor';
import MarkdownToc from 'markdown-it-toc-done-right';
import { MarkdownLinksToVueRouterLinks } from './transformMarkdownLinks';

const slugify = (s: string): string => string(s).slugify().toString();

export default function framework() {
  return [
    Vue({
      include: [
        /\.vue$/,
        /\.md$/
      ]
    }),

    Pages({
      pagesDir: 'pages',
      extensions: [
        'vue',
        'md'
      ],
      importMode: 'async'
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
        md.use(MarkdownAnchor, {
          level: 1,
          slugify,
          permalink: MarkdownAnchor.permalink.headerLink()
        });

        md.use(MarkdownToc, {
          level: 1,
          slugify,
          containerClass: 'markdown-toc'
        });

        md.use(MarkdownEmoji);
        md.use(MarkdownPrism);
        md.use(MarkdownLinksToVueRouterLinks);
      }
    })
  ];
}
