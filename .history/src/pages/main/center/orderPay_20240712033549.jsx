import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Button } from 'antd';

const OrderPay = () => {
  return (
    <PageContainer>
      <Card>
        <Descriptions title="订单详情" bordered>
          <Descriptions.Item label="订单ID">20240712001</Descriptions.Item>
          <Descriptions.Item label="商品数量">1</Descriptions.Item>
          <Descriptions.Item label="商品描述">React Pro 组件</Descriptions.Item>
          <Descriptions.Item label="商品订单金额">¥ 100.00</Descriptions.Item>
        </Descriptions>
        <Button type="primary" style={{ marginTop: '20px' }} icon={<img alt="Alipay" src="https://via.placeholder.com/30x30.png?text=Alipay" />}>
          使用支付宝支付
        </Button>
      </Card>
    </PageContainer>
  );
};

export default OrderPay;
