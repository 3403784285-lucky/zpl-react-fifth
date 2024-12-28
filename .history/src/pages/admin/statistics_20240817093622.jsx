import React from "react";
import { Row, Col } from "antd";
import Upper_Right from "../../components/base/Upper-Right.jsx";
import Upper_Left from "../../components/base/Upper-Left.jsx";
import Down_Left from "../../components/base/Down-Left.jsx";
import Down_Right_Down from "../../components/base/Down-Right-Down.jsx";
import Down_Right_Upper from "../../components/base/Down-Right-Upper.jsx";

const AdminLogGrid = () => {
    return (
        <div style={{ height: '83.5vh', overflowY: 'auto', overflowX: 'hidden', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Row style={{ height:'50vh', width: '100%' }} >
                <Col span={18} style={{ backgroundColor: '#f0f0f0', borderRadius: '4px',  boxSizing: 'border-box' }}>
                    <Upper_Left />
                </Col>
                <Col span={6} style={{ backgroundColor: '#f0f0f0', borderRadius: '4px',  boxSizing: 'border-box' }}>
                    <Upper_Right />
                </Col>
            </Row>
            <Row style={{ flex: 1, width: '100%' }} >
                <Col span={18} style={{ backgroundColor: '#f0f0f0', borderRadius: '4px', boxSizing: 'border-box', minHeight: '300px' }}>
                    <Down_Left />
                </Col>
                <Col span={6} style={{ backgroundColor: '#f0f0f0', borderRadius: '4px', boxSizing: 'border-box', minHeight: '300px' }}>
                    <Row>
                        <Col span={24} style={{ backgroundColor: '#ffffff',  borderRadius: '4px', minHeight: '150px' }}>
                            <Down_Right_Upper />
                        </Col>

                        <Col span={24} style={{ backgroundColor: '#ffffff', borderRadius: '4px', minHeight: '150px' }}>
                            <Down_Right_Down />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default AdminLogGrid;
