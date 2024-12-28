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
    <Card title="接口使用统计" bordered={false} >
      <div style={{
        backgroundImage: 'url(https://via.placeholder.com/600x200)', // 替换为你的图片URL
        backgroundSize: 'cover',
        padding: '20px',
        borderRadius: '8px'
      }}>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px', color: '#999' }}>接口总数</span>} 
                value={data.totalApiCount} 
                valueStyle={{ fontSize: '28px', color: '#3f8600' }} 
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px', color: '#999' }}>接口使用数</span>} 
                value={data.totalApiUsageCount} 
                valueStyle={{ fontSize: '28px', color: '#108ee9' }} 
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.85)' }}>
              <Statistic 
                title={<span style={{ fontSize: '12px', color: '#999' }}>模版使用统计</span>} 
                value={data.totalApiUsageCount} 
                valueStyle={{ fontSize: '28px', color: '#cf1322' }} 
              />
            </Card>
          </Col>
        </Row>
      </div>
      <div ref={apiUsageRef} style={{ height: 250, marginTop: 24 }} />
    </Card>
  );
};

export default ApiUsageStatistics;
