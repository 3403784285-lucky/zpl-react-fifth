import React from 'react';
import { Card, Col, Row, Statistic, Progress } from 'antd';
import ReactEcharts from 'echarts-for-react';

const Statistic = () => {
  const renderRealtimeData = () => (
    <Row gutter={16}>
      <Col span={4}>
        <Statistic title="待付款" value={639} />
      </Col>
      <Col span={4}>
        <Statistic title="待发货" value={320} />
      </Col>
      <Col span={4}>
        <Statistic title="待评价" value={178} />
      </Col>
      <Col span={4}>
        <Statistic title="待退款" value={245} />
      </Col>
      <Col span={4}>
        <Statistic title="待处理订单" value={8} />
      </Col>
      <Col span={4}>
        <Statistic title="违约商品" value={13} />
      </Col>
    </Row>
  );

  const getChartOption = () => ({
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['03/01', '03/15', '03/30'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [2400, 2500, 2434],
        type: 'line',
      },
    ],
  });

  const renderConversionDetails = () => (
    <Card title="转化详情">
      <Row gutter={16}>
        <Col span={6}>
          <Progress percent={100} success={{ percent: 100 }} />
          <Statistic title="查看商品" value={100} suffix="%" />
        </Col>
        <Col span={6}>
          <Progress percent={79.21} />
          <Statistic title="查看详情" value={79.21} suffix="%" />
        </Col>
        <Col span={6}>
          <Progress percent={45.18} />
          <Statistic title="加购" value={45.18} suffix="%" />
        </Col>
        <Col span={6}>
          <Progress percent={12.31} />
          <Statistic title="下单" value={12.31} suffix="%" />
        </Col>
      </Row>
    </Card>
  );

  return (
    <div>
      <Row gutter={16}>
        <Col span={24}>
          <Card title="实时数据">{renderRealtimeData()}</Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={16}>
          <Card title="交易金额">
            <ReactEcharts option={getChartOption()} />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="销售报告">
            <ReactEcharts
              option={{
                tooltip: {
                  trigger: 'item',
                },
                legend: {
                  orient: 'vertical',
                  left: 'left',
                },
                series: [
                  {
                    name: '销售占比',
                    type: 'pie',
                    radius: '50%',
                    data: [
                      { value: 1048, name: '小天国学' },
                      { value: 735, name: '社区团购' },
                      { value: 580, name: '其他' },
                    ],
                  },
                ],
              }}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 16 }}>
        <Col span={24}>{renderConversionDetails()}</Col>
      </Row>
    </div>
  );
};

export default Statistic;
