import React from "react";
import { Row, Col } from "antd";
import Upper_Right from "../../components/base/Upper-Right.jsx";
import Upper_Left from "../../components/base/Upper-Left.jsx";
import Down_Left from "../../components/base/Down-Left.jsx";
import Down_Right_Down from "../../components/base/Down-Right-Down.jsx";


const AdminLogGrid = () => {
    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Row style={{ flex: 1 }} gutter={[10, 10]}>
                <Col span={18} style={{ backgroundColor: '#f0f0f0', borderRadius: '4px' }}>
                    <Upper_Left />
                </Col>
                <Col span={6} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
                    <Upper_Right logData={[{
                        id: 1,
                        pricingId: 101,
                        oldPrice: 100.0,
                        newPrice: 120.0,
                        changedAt: "2024-08-13T10:00:00",
                        changedBy: 12345,
                        oldValue: 10,
                        newValue: 15,
                        describe: "价格调整及值变更",
                    },]} />
                </Col>
            </Row>
            <Row style={{ flex: 2 }} gutter={[10, 10]}>
                <Col span={18} style={{ backgroundColor: '#f0f0f0', padding: '5px', borderRadius: '4px' }}>
                    <Down_Left data={{
                        "totalApiCount": 10,
                        "totalApiUsageCount": 374,
                        "apiUsageList": [
                            { "id": 1, "name": "AI文档助手", "usageCount": 47 },
                            { "id": 2, "name": "OCR识别", "usageCount": 59 },
                            { "id": 3, "name": "图标生成", "usageCount": 11 },
                            { "id": 4, "name": "思维导图", "usageCount": 80 },
                            { "id": 5, "name": "语音识别", "usageCount": 39 },
                            { "id": 6, "name": "自然语言处理", "usageCount": 23 },
                            { "id": 7, "name": "数据分析", "usageCount": 67 },
                            { "id": 8, "name": "机器翻译", "usageCount": 9 },
                            { "id": 9, "name": "人脸识别", "usageCount": 22 },
                        ]
                    }}
                    />
                </Col>
                <Col span={6} style={{ backgroundColor: '#f0f0f0', padding: "5px", borderRadius: '4px' }}>
                    {/* 下右区域内容分成上下两个区域 */}
                    <Row style={{ height: '100%' }}>
                        <Col span={24} style={{ marginBottom: '10px', backgroundColor: '#ffffff', padding: '10px', borderRadius: '4px' }}>
                            右上
                        </Col>

                        <Col span={24} style={{ backgroundColor: '#ffffff', padding: '10px', borderRadius: '4px' }}>
                            <Down_Right_Down data={[
                                {
                                    "timeCategory": "2024-08",
                                    "pointsSales": 1200.0,
                                    "membershipSales": 800.0,
                                    "pointsOrderCount": 50,
                                    "membershipOrderCount": 30,
                                    "totalSales": 2000.0
                                },
                                {
                                    "timeCategory": "2024-09",
                                    "pointsSales": 1500.0,
                                    "membershipSales": 1000.0,
                                    "pointsOrderCount": 60,
                                    "membershipOrderCount": 40,
                                    "totalSales": 2500.0
                                }
                            ]} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default AdminLogGrid;