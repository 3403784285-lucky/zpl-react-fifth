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
        colorField: 'name',
        color: (datum, index) => {
          // 为每个柱状图条目设置不同的颜色
          const colors = ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16', '#7262fd', '#78D3F8', '#9661BC', '#F6903D', '#008685', '#F08BB4'];
          return colors[index % colors.length];
        },
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
    <PageContainer>
      <ProCard gutter={[16, 16]} wrap>
        <ProCard colSpan="8%">
          <Card>
            <Statistic title="接口总数" value={data.totalApiCount} />
          </Card>
        </ProCard>
        <ProCard colSpan="8%">
          <Card>
            <Statistic title="接口使用数" value={data.totalApiUsageCount} />
          </Card>
        </ProCard>
        <ProCard colSpan="8%">
          <Card>
            <Statistic title="模版使用统计" value={data.totalApiUsageCount} />
          </Card>
        </ProCard>
      </ProCard>
      <ProCard>
        <div ref={apiUsageRef} />
      </ProCard>
    </PageContainer>
  );
};

export default ApiUsageStatistics;
