import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography, Button } from 'antd';

const { Text } = Typography;

function OrderPay() {
  return (
    <PageContainer>
      <Card>
        <Text strong>订单ID:</Text> <Text>1234567890</Text>
      </Card>
      <Card>
        <Text strong>商品数量:</Text> <Text>3</Text>
      </Card>
      <Card>
        <Text strong>商品描述:</Text> <Text>这里是商品描述信息。</Text>
      </Card>
      <Card>
        <Text strong>商品订单金额:</Text> <Text>¥ 500.00</Text>
      </Card>
      <Card>
        <Button type="primary" icon={<img src="alipay-logo.png" alt="支付宝支付" />} size="large">
          使用支付宝支付
        </Button>
      </Card>
    </PageContainer>
  );
}

export default OrderPay;
