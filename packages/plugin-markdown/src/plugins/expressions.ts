import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';

/**
 * Adds the `v-pre=""` attribute into `<code>` tags to allow mustache syntax inside
 */
export function expressions(): Plugin {
  return (tree) => {
    visit(tree, (node) => {
      if (node.tagName !== 'code') {
        return;
      }

      node.properties['v-pre'] = '';
    });
  }
}