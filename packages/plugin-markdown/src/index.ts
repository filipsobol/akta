import { unified } from 'unified';
import yaml from 'yaml';
import Parse from 'remark-parse';
import Emoji from 'remark-emoji';
import Rehype from 'remark-rehype';
import GitHubFlavor from 'remark-gfm';
import Stringify from 'rehype-stringify';
import AccessibleEmoji from '@fec/remark-a11y-emoji';
import Frontmatter from 'remark-frontmatter';
import ExtractFrontmatter from 'remark-extract-frontmatter';
import type { Plugin } from 'vite';
import type { PluggableList } from 'unified';
import { links } from './plugins/links';
import type { MarkdownPluginOptions } from './types';

export function MarkdownPlugin(options?: MarkdownPluginOptions): Plugin {
  return {
    name: 'akta-plugin-markdown',

    enforce: 'pre',

    transform(content, filename): Promise<string> | undefined {
      if (!filename.endsWith('.md')) {
        return;
      }

      return parseMarkdown(content, options);
    },

    async handleHotUpdate(ctx) {
      if (!ctx.file.endsWith('.md')) {
        return;
      }

      const defaultRead = ctx.read;
      ctx.read = async () => parseMarkdown(await defaultRead(), options);
    },
  };
}

async function parseMarkdown(content: string, options?: MarkdownPluginOptions) {
  const processor = unified();
  const plugins: PluggableList = [
    // Remark plugins
    Parse,
    [Frontmatter, { type: 'yaml', marker: '-' }],
    [ExtractFrontmatter, { yaml: yaml.parse, name: 'frontmatter' }],
    GitHubFlavor,
    Emoji,
    AccessibleEmoji,

    // Custom remark plugins
    ...(options?.remarkPlugins ?? []),

    // Rehype plugins
    [Rehype, { allowDangerousHtml: true }],
    [Stringify, { allowDangerousHtml: true }],
    links,

    // Custom rehype plugins
    ...(options?.rehypePlugins ?? [])
  ];

  const file = await processor
    .use(plugins)
    .process(content);

  const html = String(file)
    .replaceAll('{{', '&lcub;&lcub;')
    .replaceAll('}}', '&rcub;&rcub;');
  
  return `<template>${ html }</template>`;
}
