import { NodeViewWrapper } from '@tiptap/react';
import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export default (props) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartContainer = chartRef.current;
    const chart = echarts.init(chartContainer);

    let { data } = props.node.attrs;

    // Step 1: 解码 HTML 实体
    const decodeHTML = (html) => {
      const txt = document.createElement('textarea');
      txt.innerHTML = html;
      return txt.value;
    };

    // Step 2: 将解码后的字符串解析为 JSON 对象
    try {
      if (typeof data === 'string') {
        data = JSON.parse(decodeHTML(data));
      }
    } catch (error) {
      console.error('Error parsing data:', error);
      return; // 如果解析失败，提前返回，避免传入错误数据
    }

    // Step 3: 设置 ECharts 的配置项
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
