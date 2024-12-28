import React, { useEffect, useRef } from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { Bar } from '@antv/g2plot';

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
    <Card title="接口使用统计" bordered={false} style={{ margin: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={8}>
          <Statistic title="接口总数" value={data.totalApiCount} />
        </Col>
        <Col span={8}>
          <Statistic title="接口使用数" value={data.totalApiUsageCount} />
        </Col>
        <Col span={8}>
          <Statistic title="模版使用统计" value={data.totalApiUsageCount} />
        </Col>
      </Row>
      <div ref={apiUsageRef} style={{ height: 400, marginTop: 24 }} />
    </Card>
  );
};

export default ApiUsageStatistics;
