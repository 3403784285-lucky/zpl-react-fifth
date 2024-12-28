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
  const [loading1,setLoading1]=useState(false)
  const [loading2,setLoading2]=useState(false)
  const [loading3,setLoading3]=useState(false)
  const [loading4,setLoading4]=useState(false)
  const tradeAmountData = [
    264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539, 243, 226, 192,
  ];
  const orderCountData = [
    192, 243, 264, 417, 438, 887, 309, 397, 550, 575, 563, 430, 525, 592, 492, 467, 513, 546, 983, 340, 539,
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading1(true)
      setLoading2(true)
      setLoading3(true)
      setLoading4(true)
      const res1 = await backFun.getPaidOrders();
      const res2 = await backFun.getUnpaidOrders();
      const res3 = await backFun.getUsersCount();
      const res4 = await backFun.getScoreAndSales()
      if (res1.code == 200) {
        setPayedNum(res1.data.length)
        setLoading1(false)
      }
      if (res2.code == 200) {
        setUnPayedNum(res2.data.unpaidOrderCount)
        setLoading2(false)

      }
      if (res3.code == 200) {
        setIncreaseUserNum(res3.length)
        setLoading3(false)

      }
      if (res4.code == 200) {
        setLoading4(false)

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
      color: 'l(0) 0:#FF7EC7 1:#FFED46', // 设置区域填充颜色为渐变色
      line: {
        size: 2, // 线条粗细
        style: {
          stroke: '#FFED46', // 设置线条颜色为蓝色
        },
      },
      xAxis: {
        type: 'cat',
        label: null, // 隐藏 x 轴标签
      },
      yAxis: false, // 隐藏 y 轴
      tooltip: false, // 隐藏 tooltip
      areaStyle: {
        fill: 'l(0) 0:#FF7EC7 1:#FFED46', // 设置区域填充颜色为渐变色
      },
    });
    const orderCountChart = new TinyArea(orderCountRef.current, {
      height: '40',
      autoFit: false,
      data: orderCountData,
      smooth: true,
      color: 'rgba(96, 95, 255, 0.2)', // 设置区域填充颜色
      line: {
        size: 2, // 线条粗细
        style: {
          stroke: '#5B8FF9', // 设置线条颜色
        },
      },
      xAxis: {
        type: 'cat',
        label: {
          formatter: (text) => `${text}`,
          style: { fill: '#fff' }, // 设置 x 轴标签颜色
        },
      },
      yAxis: false, // 隐藏 y 轴
      tooltip: false, // 隐藏 tooltip
      areaStyle: {
        fill: 'l(220.55) 0:#8A88FB 1:#D079EE', // 设置渐变背景色
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
    <Card title="实时数据" bordered={false} className='h-full' size="small" bodyStyle={{ padding: '10px' }}>
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <Card hoverable style={{ backgroundImage: "url('/img/back1.png')", backgroundSize: 'cover' }}>
            <Statistic title={<span style={{ color: 'white' }}>未支付订单数</span>}
              value={unPayedNum} loading={loading1} valueStyle={{ color: 'white' }} />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable  style={{ backgroundImage: "url('/img/back2.png')", backgroundSize: 'cover' }}>
            <Statistic loading={loading2}  title={<span style={{ color: 'white' }}>已支付订单数</span>} valueStyle={{ color: 'white' }} value={payedNum} />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable  style={{ backgroundImage: "url('/img/back3.png')", backgroundSize: 'cover' }}>
            <Statistic loading={loading3}  title={<span style={{ color: 'white' }}>当日新增用户数</span>} valueStyle={{ color: 'white' }} value={increaseUserNum} />
          </Card>
        </Col>
        <Col span={6}>
          <Card hoverable  style={{ backgroundImage: "url('/img/back4.png')", backgroundSize: 'cover' }}>
            <Statistic loading={loading4}  title={<span style={{ color: 'white' }}>当日新增模板数</span>} valueStyle={{ color: 'white' }} value={13} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={12}>
          <Card hoverable >
            <Row>
              <Col span={12}>
                <Statistic loading={loading4}  title="交易金额(元)" value={sales} precision={2} />
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
                <Statistic loading={loading4}  title="订单数" value={counts} precision={0} />
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
