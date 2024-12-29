import { NodeViewWrapper } from '@tiptap/react'
import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

export default (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartContainer = chartRef.current;
    const chart = echarts.init(chartContainer);

    // 使用传递的data属性来配置图表
    const { data } = props.node.attrs;
    let option = data || {
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
    };
    chart.setOption(option);

    return () => {
      chart.dispose();
    };
  }, [props.node.attrs.data]); // 监听data属性的变化

  return (
    <NodeViewWrapper className="echarts-node">
      <div ref={chartRef} className="chart-container" style={{ width: '600px', height: '200px' }} />
    </NodeViewWrapper>
  );
}
