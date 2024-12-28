import React, { useEffect, useRef } from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { TinyColumn } from '@antv/g2plot';

const ApiUsageStatistics = ({ data }) => {
  const apiUsageRef = useRef(null);

  useEffect(() => {
    if (apiUsageRef.current) {
      const usageChart = new TinyColumn(apiUsageRef.current, {
        data: data.map(api => api.usageCount),
        height: 60,
        autoFit: true,
        columnWidthRatio: 0.5,
        color: '#5B8FF9',
        xAxis: {
          label: {
            formatter: (text) => data.find(api => api.usageCount === parseInt(text)).name,
            style: { fontSize: 10 },
          },
        },
      });

      usageChart.render();

      return () => {
        usageChart.destroy();
      };
    }
  }, [data]);

  const totalApiCount = data.length;
  const totalApiUsageCount = data.reduce((total, api) => total + api.usageCount, 0);

  return (
    <Card bordered={false} style={{ margin: '20px' }}>
      <Row gutter={16} justify="space-between">
        <Col span={6}>
          <Statistic title="接口总数" value={totalApiCount} />
        </Col>
        <Col span={6}>
          <Statistic title="接口使用数" value={totalApiUsageCount} />
        </Col>
        <Col span={6}>
          <Statistic title="模版使用统计" value={totalApiUsageCount} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={24}>
          <div ref={apiUsageRef}></div>
        </Col>
      </Row>
    </Card>
  );
};

export default ApiUsageStatistics;
