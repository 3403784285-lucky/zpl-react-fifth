import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import EChartsNodeView from './EchartsNodeView'; // 替换为你的 EChartsNodeView 文件路径

export default Node.create({
  name: 'echartsNode',

  group: 'block',

  content: 'inline*',

  attrs: {
    data: { default: 'bar' }, // 默认图表类型为柱状图
  },

  parseHTML() {
    return [
      {
        tag: 'div.chart-container',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'chart-container' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(EChartsNodeView);
  },

  addCommands() {
    return {
      setChartData: (data) => ({ commands }) => {
        return commands.updateAttributes('echartsNode', { data });
      },
    };
  },
});
