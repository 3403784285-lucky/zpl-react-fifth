import { visit } from 'unist-util-visit';

const remarkMindmap = () => {
  return (tree) => {
    visit(tree, 'text', (node, index, parent) => {
      if (parent && parent.type === 'root') {
        const html = generateMindmap(node.value);
        parent.children[index] = {
          type: 'html',
          value: html,
        };
      }
    });
  };
};

function generateMindmap(text) {
  // This is a simple example; you can extend this to fit your mind map format
  return `
    <div class="mindmap">
      ${text.split('\n').map(line => `<div>${line}</div>`).join('')}
    </div>
  `;
}

export default remarkMindmap;
