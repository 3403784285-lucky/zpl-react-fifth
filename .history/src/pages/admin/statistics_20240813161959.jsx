import React from "react";
import { Row, Col } from "antd";

const AdminLogGrid = () => {
  return (
    <div style={{ height: '100%', padding: '10px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Row style={{ flex: 1 }} gutter={[10, 10]}>
        <Col span={18} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          <>
        </Col>
        <Col span={6} style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          {/* 上右区域内容 */}
          上右内容
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
