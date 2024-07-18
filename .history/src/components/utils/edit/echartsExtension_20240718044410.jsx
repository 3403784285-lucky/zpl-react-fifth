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
              title: {  
                  text: '某公司2021年各季度销售额分布',  
                  left: 'center'  
              },  
              tooltip: {  
                  trigger: 'item'  
              },  
             
              series: [  
                  {  
                      name: '销售额',  
                      type: 'pie',  
                      radius: '50%',  
                      data: [  
                          {value: 1200, name: '第一季度'},  
                          {value: 1800, name: '第二季度'},  
                          {value: 1500, name: '第三季度'},  
                          {value: 1700, name: '第四季度'}  
                      ],  
                      emphasis: {  
                          itemStyle: {  
                              shadowBlur: 10,  
                              shadowOffsetX: 0,  
                              shadowColor: 'rgba(0, 0, 0, 0.5)'  
                          }  
                      }  
                  }  
              ]  
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
