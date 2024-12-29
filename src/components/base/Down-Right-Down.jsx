import React, { useEffect, useRef, useState } from 'react';
import { Card } from 'antd';
import { Rose } from '@antv/g2plot';
import backFun from '../../api/user/back';

const SalesRosePlot = () => {
    const chartRef = useRef(null);
    const [data,setData]=useState([])
    useEffect(() => {
    const fetchData=async()=>{
        const res=await backFun.getScoreAndSales()
        if(res.code==200){
            setData(res.data)
        }

    }
    fetchData();
        
    }, [])

    useEffect(() => {
        const transformedData = data.map(item => [
            { type: '会员销售额', value: item.membershipSales, timeCategory: item.timeCategory },
            { type: '积分销售额', value: item.pointsSales, timeCategory: item.timeCategory },
        ]).flat();

        const rosePlot = new Rose(chartRef.current, {
            data: transformedData,
            xField: 'type',
            yField: 'value',
            seriesField: 'type',
            radius: 0.9,
            label: {
                offset: -15,
            },
            interactions: [{ type: 'element-active' }],
        });

        rosePlot.render();

        return () => {
            rosePlot.destroy();
        };
    }, [data]);

    return (
        <Card title="会员与积分销售额占比" bordered={false}>
            <div ref={chartRef} style={{ height: 150 }} /> {/* 将高度调整为200 */}
        </Card>
    );
};

export default SalesRosePlot;