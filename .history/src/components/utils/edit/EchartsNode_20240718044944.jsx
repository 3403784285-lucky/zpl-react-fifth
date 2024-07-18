import { Node } from '@tiptap/core';

export const EChartsNode = Node.create({
  name: 'echartsNode',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'div.chart-container' }];
  },

  renderHTML() {
    return ['div', { class: 'chart-container' }, 0];
  },
});
