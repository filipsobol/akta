import MarkdownIt from 'markdown-it';
import StateCore from 'markdown-it/lib/rules_core/state_core';

const LinkTag = 'router-link';

export function MarkdownLinksToVueRouterLinks (markdown: MarkdownIt) {
  markdown.core.ruler.push(LinkTag, (state: StateCore): boolean => {
    state.tokens.forEach((tokens) => {
      if (tokens.type !== "inline") {
        return;
      }

      let isRT = false;

      if (!tokens.children) {
        return;
      }

      tokens.children = tokens.children.map(token => {
        if (isRT && token.type === 'link_close') {
          token.tag = LinkTag;
          isRT = false;
          return token;
        }

        if (token.type !== 'link_open') {
          return token;
        }

        const href = token.attrs?.find(v => v[0] === 'href');

        if (href && !href[1].startsWith('http')) {
          token.tag = LinkTag;
          token.attrs = [["to", href[1]]];
          isRT = true;
          return token;
        }

        token.attrs?.push(["rel", "noopener noreferrer"]);
        token.attrs?.push(["target", "_blank"]);
        return token;
      });
    });

    return true;
  });
}