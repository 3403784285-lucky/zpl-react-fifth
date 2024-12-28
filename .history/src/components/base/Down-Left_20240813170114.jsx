import React, { useEffect, useRef } from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { TinyColumn } from '@antv/g2plot';

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
      });

      usageChart.render();

      return () => {
        usageChart.destroy();
      };
    }
  }, [data.apiUsageList]);

  return (
    <Card bordered={false} style={{ margin: '20px' }}>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="接口总数" value={data.totalApiCount} />
        </Col>
        <Col span={6}>
          <Statistic title="接口使用数" value={data.totalApiUsageCount} />
        </Col>
        <Col span={6}>
          <Statistic title="模版使用统计" value={data.apiUsageList.reduce((total, api) => total + api.usageCount, 0)} />
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
