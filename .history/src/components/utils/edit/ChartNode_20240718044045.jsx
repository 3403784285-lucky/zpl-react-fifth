import { Node } from '@tiptap/core';

export const ChartNode = Node.create({
  name: 'chartNode',

  group: 'block',

  content: 'inline*',

  parseHTML() {
    return [{ tag: 'div.chart-container' }];
  },

  renderHTML() {
    return ['div', { class: 'chart-container' }, 0];
  },

  addCommands() {
    return {
      insertChart(data) {
        return ({ tr, dispatch }) => {
          const chartContent = `<div class="chart-container">${data}</div>`;
          dispatch(tr.replaceSelectionWith(editor.schema.node('chartNode', {}, this.editor.schema.text(chartContent)), false));
        };
      },
    };
  },
});
