import React, { useEffect, useState } from 'react';
import { Card, Typography, Button, message, Spin } from 'antd';
import ProCard, { CheckCard } from "@ant-design/pro-card";
import KunCoin from './kunCoin';
import orderFun from '../../../api/user/order';
import { useStorage } from 'web-localstorage-plus';
import { useNavigate } from 'react-router-dom';
import backFun from '../../../api/user/back'; // 引入接口

const { Title, Text } = Typography;

const Wallet = () => {
    const [total, setTotal] = useState("0.00");
    const [productId, setProductId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [productType, setProductType] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const [pointsData, setPointsData] = useState([]);
    const [pointsDataMember, setPointsDataMember] = useState([]);
    const storage = useStorage();
    const navigate = useNavigate();
    const [description, setDescription] = useState('');
    const [num, setNum] = useState(0);

    useEffect(() => {
        setIsMember(storage.getItem("isBuying"));

        // 获取积分数据和会员数据
        // 获取积分数据和会员数据
        const fetchData = async () => {
            const points = await backFun.getPointsData('积分'); // 获取积分数据
            console.log("积分数据",points)
            const member = await backFun.getPointsDataMember('会员'); // 获取会员数据
            console.log("会员数据",member)
            setPointsData(points);
            setPointsDataMember(member);
        };

        fetchData();
    }, [storage]);

    const handlePayment = async () => {
        if (productId === null) {
            message.error('请先选择一个选项');
            return;
        }
        setLoading(true);
        const userId = storage.getItem("openid");
        const res = await orderFun.createOrderBuyPoints({ userId, orderType: isMember ? "购买会员" : "购买积分", amount: total, num, description: productType });
        if (res) {
            storage.setItem("order", res.data);
            message.success("订单创建成功");
        }
        setLoading(false);
        navigate('/order-pay');
    };

    const dataToRender = isMember ? pointsDataMember : pointsData;

    return (
        <div style={{ height: '80.5vh', overflowY: 'auto' }}>
            <Spin spinning={loading}>
                <Card style={{ minWidth: 360 }}>
                    <ProCard type={"inner"} headerBordered bordered tooltip={"用于平台AI问答"} title={isMember ? <strong>尊享会员</strong> : <strong>我的钱包</strong>}>
                        <strong>{isMember ? '时间：' : '积分 :'} </strong>
                        <span style={{ color: "red", fontSize: 18 }}>{isMember ? '无' : storage.getItem("user").money}</span>
                    </ProCard>
                    <br />
                    <Card type={"inner"} title={<strong>{isMember ? '会员' : '积分'}商城 💰️</strong>}>
                        <ProCard wrap>
                            <CheckCard.Group
                                onChange={(checkedValue) => {
                                    if (!checkedValue) {
                                        setTotal("0.00");
                                        return;
                                    }
                                    setTotal(checkedValue);
                                }}
                            >
                                {dataToRender.map((item) => (
                                    <CheckCard
                                        key={item.id}
                                        onClick={() => {
                                            setTotal(item.total);
                                            setProductId(item.id);
                                            setNum(item.addPoints);
                                            setDescription(item.description);
                                            setProductType(item.productType);
                                        }}
                                        description={item.description}
                                        extra={
                                            <h3 style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
                                                ¥{(item.total).toFixed(1)}
                                            </h3>
                                        }
                                        actions={<KunCoin />}
                                        style={{ width: 190, height: 272 }}
                                        title={<strong>💰 {item.addPoints} {isMember ? '月' : '积分'}</strong>}
                                        value={item.total}
                                    />
                                ))}
                            </CheckCard.Group>
                        </ProCard>
                        <br />
                        <ProCard style={{ marginTop: -20 }} layout={"center"}>
                            <span>本商品为虚拟内容,用于平台接口调用,购买后不支持<strong style={{ color: "red" }}>退换  最近支付宝正在维护可能会造成支付失败</strong>。确认支付表示您已阅读并接受用户协议 。如付款成功后10分钟后未到账，请联系站长微信：lzh15116575485</span>
                        </ProCard>
                    </Card>
                    <br />
                    <ProCard bordered headerBordered>
                        <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", alignContent: "center" }}>
                            <div style={{ marginRight: "12px", fontWeight: "bold", fontSize: 18 }}>实付</div>
                            <div style={{ marginRight: "20px", fontWeight: "bold", fontSize: 18, color: "red" }}>
                                ¥ {(total / 1.0).toFixed(2)} 元
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
