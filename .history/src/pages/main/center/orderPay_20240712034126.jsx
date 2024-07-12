import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Button, Row, Col } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_2pkt9tupqya.js'
    ],
});


const OrderPay = () => {
  return (
    <PageContainer>
      <Row justify="center" style={{ marginTop: '50px' }}>
        <Col span={12}>
          <Card>
            <Descriptions title="订单详情" bordered>
              <Descriptions.Item label="订单ID">20240712001</Descriptions.Item>
              <Descriptions.Item label="商品数量">1</Descriptions.Item>
              <Descriptions.Item label="商品描述">React Pro 组件</Descriptions.Item>
              <Descriptions.Item label="商品订单金额">¥ 100.00</Descriptions.Item>
            </Descriptions>
            <Row justify="center" style={{ marginTop: '20px' }}>
              <Button type="primary" icon={<IconFont type=''></IconFont>}
                使用支付宝支付
              </Button>
            </Row>
          </Card>
        </Col>
      </Row>
    </PageContainer>
  );
};

export default OrderPay;
