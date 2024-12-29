import React, { useEffect, useRef } from 'react';
import { Card, Col, Row, Statistic, Progress, Avatar, Divider } from 'antd';
import { Pie, Line } from '@antv/g2plot';
import Upper_Left from '../../components/base/Upper-Left';
import Upper_Right from '../../components/base/Upper-Right';


const Statistics = () => {
   
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
                
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
               
            </Row>
        </div>
    );
};

export default Statistics;
