import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';

export function links(): Plugin {
  return (tree) => {
    visit(tree, (node) => {
      if (node.tagName !== 'a') {
        return;
      }

      node.tagName = 'a-link';
      node.properties = {
        to: node.properties.href,
      };
    });
  }
}