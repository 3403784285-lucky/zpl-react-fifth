import React, { useEffect, useRef } from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { Bar } from '@antv/g2plot';
import { PageContainer, ProCard } from '@ant-design/pro-components';

const ApiUsageStatistics = ({ data }) => {
  const apiUsageRef = useRef(null);

  useEffect(() => {
    if (apiUsageRef.current) {
      const barChart = new Bar(apiUsageRef.current, {
        data: data.apiUsageList.map(api => ({
          name: api.name,
          usageCount: api.usageCount,
        })),
        xField: 'usageCount',
        yField: 'name',
        seriesField: 'name',
        color: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16', '#7262fd', '#78D3F8', '#9661BC', '#F6903D', '#008685', '#F08BB4'],
        legend: {
          position: 'top-left',
        },
        tooltip: {
          customContent: (title, items) => {
            const item = items[0];
            return `<div>${item.name}: ${item.value}</div>`;
          },
        },
        barWidthRatio: 0.6,
      });

      barChart.render();

      return () => {
        barChart.destroy();
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
      <ProCard title="接口使用量统计" style={{ marginTop: 16 }}>
        <div ref={apiUsageRef} style={{ height: 400 }} />
      </ProCard>
    </PageContainer>
  );
};

export default ApiUsageStatistics;
