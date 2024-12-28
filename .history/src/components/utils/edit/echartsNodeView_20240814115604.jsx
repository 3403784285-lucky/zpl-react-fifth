import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const EChartsNodeView = ({ node }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartContainer = chartRef.current;
    const chart = echarts.init(chartContainer);
    // 根据节点属性设置图表选项
    const { data } = node.attrs;
    console.log(node)
    let option = {
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
            { value: 1200, name: '第一季度' },
            { value: 1800, name: '第二季度' },
            { value: 1500, name: '第三季度' },
            { value: 1700, name: '第四季度' }
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
    option = data
    chart.setOption(option);

    // 清理和销毁 ECharts 实例
    return () => {
      chart.dispose();
    };
  }, [node.attrs.data]);

  return (
    <NodeViewWrapper className="echarts-node">
      <div ref={chartRef} className="chart-container" style={{ width: '600px', height: '200px' }} />
      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
};

export default EChartsNodeView;
