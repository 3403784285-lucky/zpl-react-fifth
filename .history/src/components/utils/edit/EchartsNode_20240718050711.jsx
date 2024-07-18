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
import Component from './Component.jsx'

export default Node.create({
  name: 'reactComponent',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: 'react-component',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['react-component', mergeAttributes(HTMLAttributes)]
  },

  addNodeView() {
    return ReactNodeViewRenderer(Component)
  },
})