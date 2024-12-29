import { NodeViewWrapper } from '@tiptap/react';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartContainer = chartRef.current;
    const chart = echarts.init(chartContainer);

    // 将 HTML 实体转换为字符串
    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };

    let { data } = props.node.attrs;
    try {
      data = typeof data === 'string' ? JSON.parse(decodeHTML(data)) : data;
    } catch (error) {
      console.error('Error parsing data:', error);
    }

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
      <div ref={chartRef} className="chart-container" style={{ width: '600px', height: '200px' }} />
    </NodeViewWrapper>
  );
};
