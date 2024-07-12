// remarkMindmap.js
const visit = require('unist-util-visit');

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
  // 这里你可以实现将 Markdown 转换为思维导图的逻辑
  // 这是一个简单的示例，你可以根据需要进行扩展
  return `
    <div class="mindmap">
      ${text.split('\n').map(line => `<div>${line}</div>`).join('')}
    </div>
  `;
}

export default remarkMindmap;
