import { Node } from 'tiptap';
import * as echarts from 'echarts';

export default class EChartsNode extends Node {
  get name() {
    return 'echarts';
  }

  get schema() {
    return {
      attrs: {
        chartType: {
          default: 'bar' // Default chart type if not specified
        },
        data: {
          default: null // Default data for the chart
        }
      },
      group: 'block',
      selectable: false,
      parseDOM: [{
        tag: 'div.echarts-node',
        getAttrs: dom => ({
          chartType: dom.getAttribute('data-chart-type'),
          data: JSON.parse(dom.getAttribute('data-chart-data'))
        })
      }],
      toDOM: node => {
        return ['div', {
          class: 'echarts-node',
          'data-chart-type': node.attrs.chartType,
          'data-chart-data': JSON.stringify(node.attrs.data)
        }];
      }
    };
  }

  // Called when the node is first added to the document
  // and whenever the node's content is updated.
  render(node, view) {
    const chartContainer = document.createElement('div');
    chartContainer.classList.add('echarts-container');
    chartContainer.style.width = '100%';
    chartContainer.style.height = '300px'; // Adjust height as needed

    // Initialize ECharts instance
    const chart = echarts.init(chartContainer);

    // Set chart options based on node attributes
    const { chartType, data } = node.attrs;
    let option = null;

    if (chartType === 'pie') {
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
    } else if (chartType === 'line') {
      option = {
        // Line chart options based on data
        series: [{
          type: 'line',
          data: data
        }]
      };
    } else {
      option = {
        // Bar chart options based on data
        series: [{
          type: 'bar',
          data: data
        }]
      };
    }

    chart.setOption(option);

    // Append chart container to editor's DOM
    view.dom.appendChild(chartContainer);

    // Return the chart container element
    return chartContainer;
  }
}
