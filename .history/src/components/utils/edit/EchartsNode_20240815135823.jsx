import { Node } from '@tiptap/core';
import { ReactNodeViewRenderer ,mergeAttributes } from '@tiptap/react';
import EChartsNodeView from './EchartsNodeView'; // 替换为你的 EChartsNodeView 文件路径

export default Node.create({
  name: 'echartsNode',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      data: {
        default: {
          title: {
            text: '默认图表',
            left: 'center',
          },
          series: [{
            type: 'pie',
            data: [
              { value: 1200, name: '第一季度' },
              { value: 1800, name: '第二季度' },
              { value: 1500, name: '第三季度' },
              { value: 1700, name: '第四季度' },
            ],
          }],
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div.chart-container',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { class: 'chart-container' })];
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
