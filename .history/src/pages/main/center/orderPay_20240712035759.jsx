import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Descriptions, Button } from 'antd';
import { createFromIconfontCN} from '@ant-design/icons';
import { useStorage } from 'web-localstorage-plus';

const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/c/font_4248113_ocv17bbrd9.js'
    ],
  });
const OrderPay = () => {
    const storage=useStorage()
    const order=storage.getItem("order")
  return (
    <PageContainer>
      <Card>
        <Descriptions title="订单详情" bordered>
          <Descriptions.Item label="订单ID">{order.id}</Descriptions.Item>
          <Descriptions.Item label="商品数量">1</Descriptions.Item>
          <Descriptions.Item label="商品描述">{order.description}</Descriptions.Item>
          <Descriptions.Item label="商品订单金额">¥ {order.amount}</Descriptions.Item>
        </Descriptions>
        <div className='flex-c-center-center'><Button type="primary" style={{ marginTop: '20px' }} icon={<IconFont type="icon-zhifubao" className="font-size-lg"></IconFont>}>
          支付宝支付
        </Button></div>
        
      </Card>
    </PageContainer>
  );
};

export default OrderPay;
