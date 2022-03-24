import slugify from 'slugify';
import Markdown from 'vite-plugin-md';
import MarkdownEmoji from 'markdown-it-emoji';
import MarkdownPrism from 'markdown-it-prism';
import MarkdownAnchor from 'markdown-it-anchor';
import MarkdownToc from 'markdown-it-toc-done-right';
import { MarkdownLinksToVueRouterLinks } from './transformMarkdownLinks';
import type { Plugin } from 'vite';

// Vue({
//   include: [
//     /\.md$/
//   ]
// }),
// PagesPlugin({
//   extensions: [
//     'md'
//   ]
// }),

// RegisterComponents({
//   extensions: [
//     'vue',
//   ],
//   include: [
//     /\.md$/
//   ],
// }),

export function MarkdownPlugin(): Plugin[] {
  return [
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
  ]
}