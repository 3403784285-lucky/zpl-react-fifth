import { Node } from '@tiptap/core';

// 定义节点
export const ChartNode = Node.create({
  name: 'chartNode',

  // 可能的节点属性
  content: 'inline*',
  group: 'block',

  parseHTML() {
    return [{ tag: 'div.chart-container' }];
  },

  renderHTML() {
    return ['div', { class: 'chart-container' }, 0];
  },

  addCommands() {
    return {
      renderChart(data) {
        return ({ tr, dispatch }) => {
          // 插入节点的同时调用 renderChart 绘制图表
          const chartData = data || "bar";
          const chartContent = `<div class="chart-container">${chartData}</div>`;
          dispatch(tr.replaceSelectionWith(this.editor.schema.node('chartNode', {}, this.editor.schema.text(chartContent)), false));
        };
      },
    };
  },
});
