import React from "react";
import { Row, Col } from "antd";
import Upper_Right from "../../components/base/Upper-Right.jsx";
import Upper_Left from "../../components/base/Upper-Left.jsx";
import Down_Left from "../../components/base/Down-Left.jsx";
const AdminLogGrid = () => {
    return (
        <div style={{ height: '100%', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                <Col span={18} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
                    {/* 下左区域内容 */}
                    <Down_Left data={[
                                {
                                    "id": 21,
                                    "name": "AI文档助手",
                                    "usageCount": 0
                                },
                                {
                                    "id": 1,
                                    "name": "OCR识别",
                                    "usageCount": 0
                                },
                                {
                                    "id": 11,
                                    "name": "图标生成",
                                    "usageCount": 0
                                },
                                {
                                    "id": 19,
                                    "name": "思维导图",
                                    "usageCount": 35
                                }
                            ]}
                       />
                </Col>
                <Col span={6} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
                    {/* 下右区域内容 */}
                    下右内容
                </Col>
            </Row>
        </div>
    );
};

export default AdminLogGrid;
