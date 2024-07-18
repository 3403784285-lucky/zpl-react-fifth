

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const EChartsNode = ({ node }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (!chartRef.current) return;

        const chart = echarts.init(chartRef.current);

        const { chartType } = node.attrs;
        let option = null;

        if (chartType === 'pie') {
            option = {
                title: {
                    text: '某公司2021年各季度销售额分布',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },

                series: [
                    {
                        name: '销售额',
                        type: 'pie',
                        radius: '50%',
                        data: [
                            { value: 1200, name: '第一季度' },
                            { value: 1800, name: '第二季度' },
                            { value: 1500, name: '第三季度' },
                            { value: 1700, name: '第四季度' }
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        } else if (chartType === 'solid') {
            option = {
                title: {
                    text: '某公司2021年各季度销售额折线图'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['销售额']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['第一季度', '第二季度', '第三季度', '第四季度']
                },
                yAxis: {
                    type: 'value',
                    name: '销售额（万元）',
                    axisLabel: {
                        formatter: '{value} 万元'
                    }
                },
                series: [
                    {
                        name: '销售额',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {}, // 启用区域填充样式  
                        data: [1200, 1800, 1500, 1700]
                    }
                ]
            };

        } else {
            option = {
                title: {
                    text: '某公司2021年各季度销售额'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                legend: {
                    data: ['销售额']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['第一季度', '第二季度', '第三季度', '第四季度'],
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '销售额（万元）',
                    axisLabel: {
                        formatter: '{value} 万元'
                    }
                },
                series: [
                    {
                        name: '销售额',
                        type: 'bar',
                        data: [1200, 1800, 1500, 1700],
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    }
                ]
            };
        }

        chart.setOption(option);

        // Cleanup when component unmounts
        return () => {
            chart.dispose();
        };
    }, [node.attrs]);

    return <div ref={chartRef} style={{ width: '100%', height: '300px' }} />;
};

export default EChartsNode;
