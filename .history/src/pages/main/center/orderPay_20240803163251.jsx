import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useStorage } from 'web-localstorage-plus';
import { useNavigate } from 'react-router-dom';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
  ],
});
const OrderPay = () => {
  const storage = useStorage()
  const order = storage.getItem("order")
  const navigate=useNavigate()
  const proceedToPayment = () => {
    const order = storage.getItem("order")
    const orderType = order.orderType === '购买积分' ? 'points' : 'membership';
    window.open(`http://192.168.50.41:8090/alipay/pay?orderName=${order.description}&orderId=${order.id}&totalPrice=${order.amount}&orderType=${orderType}`);
    navigate("/person")
  }
  return (
    <PageContainer>
      <Card>
        <Descriptions title="订单详情" bordered>
          <Descriptions.Item label="订单ID">{order.id}</Descriptions.Item>
          <Descriptions.Item label="商品数量">1</Descriptions.Item>
          <Descriptions.Item label="商品描述">{order.description}</Descriptions.Item>
          <Descriptions.Item label="商品订单金额">¥ {order.amount}</Descriptions.Item>
        </Descriptions>
        <div className='flex-c-center-center'><Button onClick={proceedToPayment} type="primary" style={{ marginTop: '20px' }} icon={<IconFont type="icon-zhifubao" className="font-size-lg"></IconFont>}>
          支付宝支付
        </Button></div>

      </Card>
    </PageContainer>
  );
};

export default OrderPay;
