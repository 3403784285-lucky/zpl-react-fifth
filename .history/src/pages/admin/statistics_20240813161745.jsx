import React from "react";
import { Row, Col } from "antd";

const AdminLogGrid = () => {
  return (
    <div style={{  padding: '10px', height:'70vh'}}>
      <Row gutter={[10, 10]}>
        <Col span={18} style={{ height: '100px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          {/* 上左区域内容 */}
          上左内容
        </Col>
        <Col span={6} style={{ height: '100px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          {/* 上右区域内容 */}
          上右内容
        </Col>
      </Row>
      <Row gutter={[10, 10]}>
        <Col span={18} style={{ height: '300px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          {/* 下左区域内容 */}
          下左内容
        </Col>
        <Col span={6} style={{ height: '300px', backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px' }}>
          {/* 下右区域内容 */}
          下右内容
        </Col>
      </Row>
    </div>
  );
};

export default AdminLogGrid;
