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
                        data: res.data.apiUsageList.map(api => ({
                            name: api.name,
                            usageCount: api.usageCount,
                        })),
                        xField: 'usageCount',
                        yField: 'name',
                        seriesField: 'name',
                        color: ['#ee3f4d', '#61649f', '#5cb3cc', '#b7d07a', '#fed71a', '#c3d7df', '#9661BC', '#F6903D', '#008685', '#F08BB4'],
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
