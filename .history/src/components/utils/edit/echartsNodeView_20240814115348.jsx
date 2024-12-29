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
    let option = null;
    option=data
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
