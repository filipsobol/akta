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
import { links } from './plugins/links';
import type { Plugin } from 'vite';

async function parseMarkdown(content: string) {
  const file = await unified()
    .use(Parse)
    .use(Frontmatter, { type: 'yaml', marker: '-' })
    .use(ExtractFrontmatter, { yaml: yaml.parse, name: 'frontmatter' })
    .use(GitHubFlavor)
    .use(Emoji)
    .use(AccessibleEmoji)
    .use(Rehype, { allowDangerousHtml: true })
    .use(Stringify, { allowDangerousHtml: true })
    .use(links)
    .process(content);

  return `
    <template>
      ${ String(file) }
    </template>
  `;
}

export function MarkdownPlugin(): Plugin {
  return {
    name: 'akta-plugin-markdown',

    enforce: 'pre',

    transform(content, filename): Promise<string> | undefined {
      if (!filename.endsWith('.md')) {
        return;
      }

      return parseMarkdown(content);
    },

    async handleHotUpdate(ctx) {
      if (!ctx.file.endsWith('.md')) {
        return;
      }

      const defaultRead = ctx.read;
      ctx.read = async () => parseMarkdown(await defaultRead());
    },
  };
}
