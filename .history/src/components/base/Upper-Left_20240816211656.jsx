import React, { useEffect, useRef, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { TinyArea } from '@antv/g2plot';
import backFun from '../../api/user/back';
const timeOrder = ["六天前", "五天前", "四天前", "三天前", "昨天", "今天"];
const RealTimeStatistics = () => {
  const tradeAmountRef = useRef(null);
  const orderCountRef = useRef(null);
  const [unPayedNum, setUnPayedNum] = useState(0);
  const [payedNum, setPayedNum] = useState(0);
  const [increaseUserNum, setIncreaseUserNum] = useState(0);
  const [sales, setSales] = useState(0);
  const [salesPer, setSalesPer] = useState(0);
  const [countsPer, setCountsPer] = useState(0);
  const [counts, setCounts] = useState(0);
  const tradeAmountData = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
  ];
  const orderCountData = [
    192, 243, 264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res1 = await backFun.getPaidOrders();
      const res2 = await backFun.getUnpaidOrders();
      const res3 = await backFun.getUsersCount();
      const res4 = await backFun.getScoreAndSales()
      if (res1.code == 200) {
        setPayedNum(res1.data.length)
      }
      if (res2.code == 200) {
        setUnPayedNum(res2.data.unpaidOrderCount)
      }
      if (res3.code == 200) {
        setIncreaseUserNum(res3.length)
      }
      if (res4.code == 200) {
        const todayData = res4.data.find(item => item.timeCategory === "今天")
        const yesData = res4.data.find(item => item.timeCategory === "昨天")
        setSales(todayData.totalSales)
        setCounts(todayData.pointsOrderCount + todayData.membershipOrderCount)
        setSalesPer(((todayData.totalSales - yesData.totalSales) / yesData.totalSales) * 100)
        setCountsPer((((todayData.pointsOrderCount + todayData.membershipOrderCount) - (yesData.membershipOrderCount + yesData.pointsOrderCount)) / yesData.totalSales) * 100)
        const sortedData = res4.data.sort((a, b) => {
          return timeOrder.indexOf(a.timeCategory) - timeOrder.indexOf(b.timeCategory);
        });

        // 提取 totalSales 到一个新的数组中
        const totalSalesArray = sortedData.map(item => item.totalSales);

      }
    }
    const tradeAmountChart = new TinyArea(tradeAmountRef.current, {
      height: 40,
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
      height: 40,
      autoFit: false,
      data: orderCountData,
      smooth: true,
      color: 'rgba(96,95,255,0.2)',
      pattern: { type: 'line', cfg: { stroke: '#5B8FF9' } },
      xAxis: {
        type: 'cat',
        label: {
          formatter: (text) => `${text}`,
        },
      },
    });
    fetchData()
    tradeAmountChart.render();
    orderCountChart.render();
    return () => {
      tradeAmountChart.destroy();
      orderCountChart.destroy();
    };
  }, []);
  return (
    <Card title="实时数据" bordered={false} size="small" bodyStyle={{ padding: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable style={{ backgroundImage: "url('/img/back1.png')", backgroundSize: 'cover' }}>
            <Statistic title={<span style={{ color: 'white' }}>未支付订单数</span>}
              value={unPayedNum} valueStyle={{ color: 'white' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable  style={{ backgroundImage: "url('/img/back2.png')", backgroundSize: 'cover' }}>
            <Statistic title={<span style={{ color: 'white' }}>已支付订单数</span>} valueStyle={{ color: 'white' }} value={payedNum} />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable  style={{ backgroundImage: "url('/img/back3.png')", backgroundSize: 'cover' }}>
            <Statistic title={<span style={{ color: 'white' }}>当日新增用户数</span>} valueStyle={{ color: 'white' }} value={increaseUserNum} />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable  style={{ backgroundImage: "url('/img/back4.png')", backgroundSize: 'cover' }}>
            <Statistic title={<span style={{ color: 'white' }}>当日新增模板数</span>} valueStyle={{ color: 'white' }} value={13} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card hoverable >
            <Row>
              <Col span={12}>
                <Statistic title="交易金额(元)" value={sales} precision={2} />
              </Col>
              <Col span={12}>
                <Statistic
                  title="较昨日"
                  value={Math.abs(salesPer)}
                  precision={2}
                  valueStyle={{ color: salesPer >= 0 ? '#3f8600' : '#cf1322' }}
                  prefix={salesPer >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
            <div ref={tradeAmountRef} style={{ marginTop: 16 }}></div>
          </Card>
        </Col>
        <Col span={12}>
          <Card hoverable >
            <Row>
              <Col span={12}>
                <Statistic title="订单数" value={counts} precision={0} />
              </Col>
              <Col span={12}>
                <Statistic
                  title="较昨日"
                  value={Math.abs(countsPer)}
                  precision={2}
                  valueStyle={{ color: countsPer >= 0 ? '#3f8600' : '#cf1322' }}
                  prefix={countsPer >= 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                  suffix="%"
                />
              </Col>
            </Row>
            <div ref={orderCountRef} style={{ marginTop: 16 }}></div>
          </Card>
        </Col>
      </Row>
    </Card>
  );
};
export default RealTimeStatistics;
