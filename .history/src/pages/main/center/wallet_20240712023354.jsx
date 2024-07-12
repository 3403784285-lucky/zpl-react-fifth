import React, { useState } from 'react';
import { Card, Typography, Button, message } from 'antd';
import { Spin } from 'antd';
import ProCard, {CheckCard} from "@ant-design/pro-card";
import KunCoin from './kunCoin';
const { Title, Text } = Typography;

const pointsData = [
    { id: 1, addPoints: 10, total: 1, description: '增加100积分到钱包', productType: 'NORMAL' },
    { id: 2, addPoints: 100, total: 99, description: '增加1000积分到钱包', productType: 'NORMAL' },
    { id: 3, addPoints: 300, total: 199, description: '增加3000积分到钱包', productType: 'NORMAL' },
    { id: 4, addPoints: 999, total: 699, description: '增加9999积分到钱包', productType: 'NORMAL' },
    { id: 5, addPoints: 1599, total: 888, description: '增加15999积分到钱包', productType: 'NORMAL' },
    { id: 6, addPoints: 1899, total: 999, description: '增加18999积分到钱包', productType: 'NORMAL' },

];

const Wallet = () => {
    const [total, setTotal] = useState("0.00");
    const [productId, setProductId] = useState(null);
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        if (productId === null) {
            message.error('请先选择一个商品');
            return;
        }
        setLoading(true);
        // Simulate a payment request
        setTimeout(() => {
            setLoading(false);
            message.success('支付成功');
        }, 1500);
    };

    return (
        <div style={{height:'80.5vh',overflowY:'auto'}}>
            <Spin spinning={loading}>
                <Card style={{ minWidth: 360 }}>
                    <ProCard type={"inner"} headerBordered bordered tooltip={"用于平台AI问答"} title={<strong>我的钱包</strong>}>
                        <strong>积分 : </strong><span style={{ color: "red", fontSize: 18 }}>38</span>
                    </ProCard>
                    <br />
                    <Card type={"inner"} title={<strong>积分商城 💰️</strong>}>
                        <ProCard wrap>
                            <CheckCard.Group
                                onChange={(checkedValue) => {
                                    if (!checkedValue) {
                                        setTotal("0.00");
                                        return;
                                    }
                                    setTotal(checkedValue);
                                }}
                            >{pointsData.map((item) => (
                                <CheckCard
                                    key={item.id}
                                    onClick={() => {
                                        setTotal(item.total);
                                        setProductId(item.id);
                                    }}
                                    description={item.description}
                                    extra={
                                        <>
                                            <h3 style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
                                                ¥{(item.total / 10).toFixed(1)}
                                            </h3>
                                        </>
                                    }
                                    actions={<><KunCoin></KunCoin></>}
                                    style={{ width: 200, height: 280 }}
                                    title={<strong>💰 {item.addPoints} 积分</strong>}
                                    value={item.total}
                                />
                            ))}
                            </CheckCard.Group>
                        </ProCard>
                        <br />
                        <ProCard style={{ marginTop: -20 }} layout={"center"}>
                            <span>本商品为虚拟内容,用于平台接口调用,购买后不支持<strong style={{ color: "red" }}>退换</strong>。确认支付表示您已阅读并接受用户协议 。如付款成功后10分钟后未到账，请联系站长微信：
                            </span>
                        </ProCard>
                    </Card>
                    <br />
                    <ProCard bordered headerBordered>
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", alignContent: "center" }}>
                            <div style={{ marginRight: "12px", fontWeight: "bold", fontSize: 18 }}>实付</div>
                            <div style={{ marginRight: "20px", fontWeight: "bold", fontSize: 18, color: "red" }}>¥ {(total / 100).toFixed(2)} 元
                            </div>
                            <Button style={{ width: 100, padding: 5 }} onClick={handlePayment} size={"large"} type={"primary"}>立即购买</Button>
                        </div>
                    </ProCard>
                </Card>
            </Spin>
        </div>
    );
};

export default Wallet;