import React, { useEffect, useRef } from 'react';
import { Card, Col, Row, Statistic, Progress, Avatar, Divider } from 'antd';
import { Pie, Line } from '@antv/g2plot';
import Upper_Left from '../../components/base/Upper-Left';
import Upper_Right from "../components/base/Upper-Right";

const Statistics = () => {
    const pieChartRef = useRef(null);
    const lineChartRef = useRef(null);

    useEffect(() => {
        const pieChart = new Pie(pieChartRef.current, {
            data: [
                { type: '小天国学', value: 65.8 },
                { type: '社区团购', value: 20.5 },
                { type: '其他', value: 35.9 },
            ],
            angleField: 'value',
            colorField: 'type',
            radius: 1,
            label: {
                type: 'outer',
                content: '{name} {percentage}',
            },
            interactions: [{ type: 'element-active' }],
        });

        pieChart.render();

        const lineChart = new Line(lineChartRef.current, {
            data: [
                { date: '03/01', value: 2400 },
                { date: '03/15', value: 2500 },
                { date: '03/30', value: 2434 },
            ],
            xField: 'date',
            yField: 'value',
            smooth: true,
        });

        lineChart.render();

        return () => {
            pieChart.destroy();
            lineChart.destroy();
        };
    }, []);

    return (
        <div>
            <Row gutter={16}>
                <div style={{ padding: 24 }}>
                    <Upper_Left />
                </div>
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
                <Upper_Right logData={[
                    {
                        id: 1,
                        pricingId: 101,
                        oldPrice: 100.0,
                        newPrice: 120.0,
                        changedAt: "2024-08-13T10:00:00",
                        changedBy: 12345,
                        oldValue: 10,
                        newValue: 15,
                        describe: "价格调整及值变更",
                    },
                    // 可以继续添加更多数据
                ]} />

            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={24}>
                    <Card title="店铺数据">
                        <Row gutter={16}>
                            <Col span={8}>
                                <Statistic title="支付转化率" value="15.11%" />
                                <Statistic title="访客数" value="4,589" />
                            </Col>
                            <Col span={8}>
                                <Statistic title="支付订单数" value="463" />
                                <Statistic title="浏览量" value="2,455" />
                            </Col>
                            <Col span={8}>
                                <Avatar
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    style={{ marginBottom: 16 }}
                                />
                                <Divider>杨氏炖鸡饭</Divider>
                                <Statistic title="商品评分" value="4.9" />
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
                <Col span={24}>
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
                </Col>
            </Row>
        </div>
    );
};

export default Statistics;
