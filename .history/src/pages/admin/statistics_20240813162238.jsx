import React from "react";
import { Row, Col } from "antd";
import Upper_Right from "../../components/base/Upper-Right.jsx";
import Upper_Left from "../../components/base/Upper-Left.jsx";
const AdminLogGrid = () => {
  return (
    <div style={{ height: '100%', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Row style={{ flex: 1 }} gutter={[10, 10]}>
        <Col span={18} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          <Upper_Left/>
        </Col>
        <Col span={6} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          <Upper_Right />
        </Col>
      </Row>
      <Row style={{ flex: 2 }} gutter={[10, 10]}>
        <Col span={18} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          {/* 下左区域内容 */}
          下左内容
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
