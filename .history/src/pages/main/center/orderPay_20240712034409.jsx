import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, List, Button, Row, Col } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_ocv17bbrd9.js'
  ],
});

const OrderPay = () => {
  const data = [
    { title: '订单ID', value: '20240712001' },
    { title: '商品数量', value: '1' },
    { title: '商品描述', value: 'React Pro 组件' },
    { title: '商品订单金额', value: '¥ 100.00' },
  ];

  return (
    <PageContainer>
      <Row justify="center" style={{ marginTop: '50px' }}>
        <Col span={12}>
          <Card>
            <List
              header={<div>订单详情</div>}
              bordered
              dataSource={data}
              renderItem={item => (
                <List.Item>
                  <div style={{ flex: 1 }}>
                    <span style={{ fontWeight: 'bold' }}>{item.title}</span>: {item.value}
                  </div>
                </List.Item>
              )}
            />
            <Row justify="center" style={{ marginTop: '20px' }}>
              <Button type="primary" icon={<IconFont type='icon-zhifubao' className='font-size-lg'></IconFont>}>
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
