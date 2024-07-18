import { Extension } from '@tiptap/core';
import echarts from 'echarts';

export const EChartsExtension = Extension.create({
  name: 'echarts',

  addCommands() {
    return {
      renderChart:
        (data) =>
        ({ tr, dispatch }) => {
          const chartContainer = document.createElement('div');
          chartContainer.classList.add('chart-container');
          const chartContent = `<div class="chart-container">${data}</div>`;
          dispatch(tr.replaceSelectionWith(this.editor.schema.node('echartsNode', {}, this.editor.schema.text(chartContent)), false));
          const chart = echarts.init(chartContainer);
          let option = null;
          if (data === "pie") {
            option = {
              // 饼图配置
            };
          } else if (data === "solid") {
            option = {
              // 折线图配置
            };
          } else {
            option = {
              // 柱状图默认配置
            };
          }
          chart.setOption(option);

          // 监听编辑器内容更新，删除旧图表重新绘制
          this.editor.on('transaction', () => {
            chart.clear(); // 清空旧图表
            chart.setOption(option); // 重新绘制新图表
          });
        },
    };
  },
});
