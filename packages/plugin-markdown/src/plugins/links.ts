import { visit } from 'unist-util-visit';

export function links() {
  return (tree) => {
    visit(tree, (node, index, parent) => {
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