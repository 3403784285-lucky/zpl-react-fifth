import { NodeViewWrapper } from '@tiptap/react';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartContainer = chartRef.current;
    const chart = echarts.init(chartContainer);

    let { data } = props.node.attrs;
    console.log('Decoded Data:', data);

    const option = data || {
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
  }, [props.node.attrs.data]);

  return (
    <NodeViewWrapper className="echarts-node">
      <div ref={chartRef} className="chart-container" style={{ width: '600px', height: '400px' }} />
    </NodeViewWrapper>
  );
};
