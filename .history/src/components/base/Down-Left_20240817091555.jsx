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
            }
        }
        fetchData()

    }, []);

    return (
        <Card title="接口使用统计" bordered={false} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <Row style={{ flex: 1, display: 'flex' }}>
                {/* 左侧统计数据 */}
                <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{
                        backgroundImage: 'url(https://via.placeholder.com/600x200)', // 替换为你的图片URL
                        backgroundSize: 'cover',
                        padding: '20px',
                        borderRadius: '8px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between'
                    }}>
                        <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.85)', flex: 1 }}>
                            <Statistic
                                title={<span style={{ fontSize: '12px', color: '#999' }}>AI有关接口总数</span>}
                                value={data.totalApiCount}
                                valueStyle={{ fontSize: '28px', color: '#3f8600' }}
                            />
                        </Card>
                        <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.85)', flex: 1, marginTop: '16px' }}>
                            <Statistic
                                title={<span style={{ fontSize: '12px', color: '#999' }}>接口使用数</span>}
                                value={data.totalApiUsageCount}
                                valueStyle={{ fontSize: '28px', color: '#108ee9' }}
                            />
                        </Card>
                        <Card bordered={false} style={{ background: 'rgba(255, 255, 255, 0.85)', flex: 1, marginTop: '16px' }}>
                            <Statistic
                                title={<span style={{ fontSize: '12px', color: '#999' }}>模版使用统计</span>}
                                value={data.totalApiUsageCount}
                                valueStyle={{ fontSize: '28px', color: '#cf1322' }}
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
