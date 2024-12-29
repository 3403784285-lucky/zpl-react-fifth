import React, { useEffect, useRef } from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { TinyColumn } from '@antv/g2plot';
import { PageContainer, ProCard } from '@ant-design/pro-components';

const ApiUsageStatistics = ({ data }) => {
  const apiUsageRef = useRef(null);

  useEffect(() => {
    if (apiUsageRef.current) {
      const usageChart = new TinyColumn(apiUsageRef.current, {
        data: data.apiUsageList.map(api => api.usageCount),
        height: 60,
        autoFit: true,
        columnWidthRatio: 0.5,
        color: '#5B8FF9',
        xAxis: {
          label: {
            formatter: (text, index) => data.apiUsageList[index].name,
            style: { fontSize: 10 },
          },
        },
        yAxis: {
          label: null,
        },
        tooltip: {
          customContent: (title, items) => {
            const item = data.apiUsageList[items[0].dataIndex];
            return `<div>${item.name}: ${item.usageCount}</div>`;
          },
        },
      });

      usageChart.render();

      return () => {
        usageChart.destroy();
      };
    }
  }, [data]);

  return (
    <PageContainer header={{ title: null }} style={{ padding: 0 }}>
      <ProCard gutter={0} style={{ padding: 0 }} bodyStyle={{ padding: 0 }}>
        <ProCard colSpan="25%" bodyStyle={{ padding: 0 }}>
          <Statistic title="接口总数" value={data.totalApiCount} />
        </ProCard>
        <ProCard colSpan="25%" bodyStyle={{ padding: 0 }}>
          <Statistic title="接口使用数" value={data.totalApiUsageCount} />
        </ProCard>
        <ProCard colSpan="25%" bodyStyle={{ padding: 0 }}>
          <Statistic title="模版使用统计" value={data.totalApiUsageCount} />
        </ProCard>
        <ProCard colSpan="25%" bodyStyle={{ padding: 0 }}>
          <div ref={apiUsageRef}></div>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
};

export default ApiUsageStatistics;
