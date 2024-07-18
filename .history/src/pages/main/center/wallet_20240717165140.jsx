import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, message ,Tag} from 'antd';
import { Spin } from 'antd';
import ProCard, { CheckCard } from "@ant-design/pro-card";
import KunCoin from './kunCoin';
import orderFun from '../../../api/user/order';
import { useStorage } from 'web-localstorage-plus';
const { Title, Text } = Typography;

const pointsData = [
    { id: 2, addPoints: 100, total: 99, description: '增加1000积分到钱包', productType: 'BUY_POINTS' },
    { id: 3, addPoints: 300, total: 199, description: '增加3000积分到钱包', productType: 'BUY_POINTS' },
    { id: 4, addPoints: 999, total: 699, description: '增加9999积分到钱包', productType: 'BUY_POINTS' },
    { id: 5, addPoints: 1599, total: 888, description: '增加15999积分到钱包', productType: 'BUY_POINTS' },
    { id: 6, addPoints: 1899, total: 999, description: '增加18999积分到钱包', productType: 'BUY_POINTS' },

];
const pointsDataMember = [
    { id: 2, addPoints: 1, total: 299, description: '购买1个月会员', productType: 'BUY_MEMBER' },
    { id: 3, addPoints: 3, total: 869, description: '购买3个月会员', productType: 'BUY_MEMBER' },
    { id: 4, addPoints: 6, total: 1399, description: '购买6个月会员', productType: 'BUY_MEMBER' },
    { id: 5, addPoints: 9, total: 1999, description: '购买9个月会员', productType: 'BUY_MEMBER' },
    { id: 6, addPoints: 12, total: 2499, description: '购买12个月会员', productType: 'BUY_MEMBER' },

];


const Wallet = () => {
    const [total, setTotal] = useState("0.00");
    const [productId, setProductId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productType, setProductType] = useState(false);
    const [isMember, setIsMember] = useState(true)
    const [num, setNum] = useState(0);
    const storage=useStorage()
    const [description, setDescription] = useState('');
    useEffect(() => {
        const member=storage.getItem("user").level
        member==1?setIsMember(true):setIsMember(false);
        
    },[])
    const handlePayment = async () => {
        if (productId === null) {
            message.error('请先选择一个选项');
            return;
        }
        setLoading(true);
        // Simulate a payment request
        const storage = useStorage()
        const userId = storage.getItem("openid")
        console.log(total, num)
        const res = await orderFun.createOrderBuyPoints({ userId: userId, orderType: isMember ? "购买会员" : "购买积分", amount: total, num: num, description: productType })
        if (res) {
            storage.setItem("order", res.data)
            message.success("订单创建成功")


        }
        setLoading(false);


    };

    return (
        <div style={{ height: '80.5vh', overflowY: 'auto' }}>
            <Spin spinning={loading}>
                <Card style={{ minWidth: 360 }}>
                    <ProCard type={"inner"} headerBordered bordered tooltip={"用于平台AI问答"} title={isMember?<strong>尊享会员</strong>:<strong>我的钱包</strong>}>
                        <strong>{isMember?'时间：':'积分 :'} </strong><span style={{ color: "red", fontSize: 18 }}>{isMember?'2024-5-24到期':'38'}</span>
                    </ProCard>
                    <br />
                    <Card type={"inner"} title={<strong>{isMember?'会员':'积分'}商城 💰️</strong>}>
                        <ProCard wrap>
                            <CheckCard.Group
                                onChange={(checkedValue) => {
                                    if (!checkedValue) {
                                        setTotal("0.00");
                                        return;
                                    }
                                    setTotal(checkedValue);
                                }}
                            >{(isMember?(pointsDataMember):(pointsData)).map((item) => (
                                <CheckCard
                                    key={item.id}
                                    onClick={() => {
                                        setTotal(item.total);
                                        setProductId(item.id);
                                        setNum(item.addPoints)
                                        setDescription(item.description)
                                        setProductType(item.productType)
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
                                    style={{ width: 190, height: 272 }}
                                    title={<strong>💰 {item.addPoints} {isMember?'月':'积分'}</strong>}
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
                            <div style={{ marginRight: "20px", fontWeight: "bold", fontSize: 18, color: "red" }}>¥ {(total / 10).toFixed(2)} 元
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