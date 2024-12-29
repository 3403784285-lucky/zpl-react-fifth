import React, { useEffect, useRef } from 'react';
import { Row, Col, Statistic, Card } from 'antd';
import { Bar } from '@antv/g2plot';
import backFun from '../../api/user/back';

const ApiUsageStatistics = () => {
    const apiUsageRef = useRef(null);
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const res = await backFun.getApiInfoCount()
            if (res.code == 200) {
                setData(res.data)
                if (apiUsageRef.current) {
                    const barChart = new Bar(apiUsageRef.current, {
                        data: data.map(api => ({
                            name: api.name,
                            usageCount: api.usageCount,
                          })),
                          xField: 'usageCount',
                          yField: 'name',
                          seriesField: 'name',
                          color: ({ name }) => {
                            // 为每个API功能分配不同的渐变色
                            const gradientColors = {
                              'AI文档助手': 'l(270) 0:#FF7EC7 1:#FFED46',
                              'OCR识别': 'l(270) 0:#8A88FB 1:#D079EE',
                              '图标生成': 'l(270) 0:#8FFF85 1:#39A0FF',
                              '思维导图': 'l(270) 0:#FFEB3A 1:#4DEF8E',
                              '扩写': 'l(270) 0:#FF7E7C 1:#FFEDC0',
                              // 根据你的需求添加更多颜色
                            };
                            return gradientColors[name] || 'l(270) 0:#5cb3cc 1:#b7d07a'; // 默认渐变色
                          },
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
                          label: {
                            position: 'middle',
                            style: {
                              fill: '#fff',
                              opacity: 0.6,
                            },
                          },
                    });

                    barChart.render();

                    return () => {
                        barChart.destroy();
                    };
                }
            }
        }
        fetchData()

    }, []);

    return (
        <Card title="接口使用统计"  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Row gutter={[16, 16]} style={{ flex: 1, display: 'flex' }}>
                {/* 左侧统计数据 */}
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{
                        backgroundImage: 'url(/img/static.png)', // 替换为你的图片URL
                        backgroundSize: 'cover',
                        padding: '20px',
                        borderRadius: '8px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.35)', flex: 1 }}>
                            <Statistic
                                title={<span style={{ fontSize: '14px', color: 'white' }}>AI有关接口总数</span>}
                                value={data.totalApiCount}
                                valueStyle={{ fontSize: '28px', color: '#e16723' }}
                            />
                        </Card>
                        <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.35)', flex: 1,}}>
                            <Statistic
                                title={<span style={{ fontSize: '14px', color: 'white' }}>接口使用数</span>}
                                value={data.totalApiUsageCount}
                                valueStyle={{ fontSize: '28px', color: '#ffd111' }}
                            />
                        </Card>
                        <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.35)', flex: 1,  }}>
                            <Statistic
                                title={<span style={{ fontSize: '14px', color: 'white' }}>模版使用统计</span>}
                                value={data.totalApiUsageCount}
                                valueStyle={{ fontSize: '28px', color: '#e2e7bf' }}
                            />
                        </Card>
                    </div>
                </Col>
                {/* 右侧图表 */}
                <Col span={12} style={{ display: 'flex', alignItems: 'center' }}>
                    <div ref={apiUsageRef} style={{ height: '100%', width: '100%' }} />
                </Col>
            </Row>
        </Card>
    );
};

export default ApiUsageStatistics;
