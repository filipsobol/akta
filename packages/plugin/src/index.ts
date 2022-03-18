import path from 'path';
import slugify from 'slugify';
import Vue from '@vitejs/plugin-vue';
import Markdown from 'vite-plugin-md';
import RegisterComponents from 'unplugin-vue-components/vite';
import MarkdownEmoji from 'markdown-it-emoji';
import MarkdownPrism from 'markdown-it-prism';
import MarkdownAnchor from 'markdown-it-anchor';
import MarkdownToc from 'markdown-it-toc-done-right';
import { PagesPlugin } from './plugins/pages';
import { PingPlugin } from './plugins/ping';
import { MarkdownLinksToVueRouterLinks } from './transformMarkdownLinks';

export function AktaPlugin() {
  return [
    Vue({
      include: [
        /\.vue$/,
        /\.md$/
      ]
    }),

    PagesPlugin({
      paths: [
        'pages'
      ],
      extensions: [
        'vue',
        'md'
      ],
      exclude: [],
      onRoutesGenerated: () => {},
      onCodeGenerated: () => {}
    }),

    PingPlugin(),

    RegisterComponents({
      deep: true,
      dirs: [
        path.resolve(process.cwd(), 'components'),
      ],
      extensions: [
        'vue',
        'md'
      ],
      include: [
        /\.vue$/,
        /\.vue\?vue/,
        /\.md$/
      ],
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

export * from './types';