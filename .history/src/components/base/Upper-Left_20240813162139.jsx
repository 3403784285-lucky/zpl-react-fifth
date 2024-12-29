import React, { useEffect, useRef } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { TinyArea } from '@antv/g2plot';

const RealTimeStatistics = () => {
  const tradeAmountRef = useRef(null);
  const orderCountRef = useRef(null);

  const tradeAmountData = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
  ];

  const orderCountData = [
    192, 243, 264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
  ];

  const yesterdayAmount = 2400;
  const todayAmount = 2434.23;
  const amountChange = ((todayAmount - yesterdayAmount) / yesterdayAmount) * 100;

  const yesterdayOrder = 890;
  const todayOrder = 894;
  const orderChange = ((todayOrder - yesterdayOrder) / yesterdayOrder) * 100;

  useEffect(() => {
    const tradeAmountChart = new TinyArea(tradeAmountRef.current, {
      height: 60,
      autoFit: false,
      data: tradeAmountData,
      smooth: true,
      color: '#E5EDFE',
      pattern: { type: 'line', cfg: { stroke: '#5B8FF9' } },
      xAxis: {
        type: 'cat',
        label: {
          formatter: (text) => `${text}`,
        },
      },
    });

    const orderCountChart = new TinyArea(orderCountRef.current, {
      height: 60,
      autoFit: false,
      data: orderCountData,
      smooth: true,
      color: '#E5EDFE',
      pattern: { type: 'line', cfg: { stroke: '#5B8FF9' } },
      xAxis: {
        type: 'cat',
        label: {
          formatter: (text) => `${text}`,
        },
      },
    });

    tradeAmountChart.render();
    orderCountChart.render();

    return () => {
      tradeAmountChart.destroy();
      orderCountChart.destroy();
    };
  }, []);

  return (
    <Card title="实时数据" bordered={false}>
      <Row gutter={16}>
        <Col span={6}>
          <Statistic title="未支付订单数" value={639} />
        </Col>
        <Col span={6}>
          <Statistic title="已支付订单数" value={320} />
        </Col>
        <Col span={6}>
          <Statistic title="当日新增用户数" value={178} />
        </Col>
        <Col span={6}>
          <Statistic title="当日新增模板数" value={13} />
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 24 }}>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Statistic title="交易金额(元)" value={todayAmount} precision={2} />
            </Col>
            <Col span={12}>
              <Statistic
                title="较昨日"
                value={Math.abs(amountChange)}
                precision={2}
                valueStyle={{ color: amountChange >= 0 ? '#3f8600' : '#cf1322' }}
                prefix={amountChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix="%"
              />
            </Col>
          </Row>
          <div ref={tradeAmountRef} style={{ marginTop: 16 }}></div>
        </Col>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <Statistic title="订单数" value={todayOrder} precision={0} />
            </Col>
            <Col span={12}>
              <Statistic
                title="较昨日"
                value={Math.abs(orderChange)}
                precision={2}
                valueStyle={{ color: orderChange >= 0 ? '#3f8600' : '#cf1322' }}
                prefix={orderChange >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                suffix="%"
              />
            </Col>
          </Row>
          <div ref={orderCountRef} style={{ marginTop: 16 }}></div>
        </Col>
      </Row>
    </Card>
  );
};

export default RealTimeStatistics;
