import React, { useState } from 'react';
import { Table, Input, Button, Select, Modal, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// 引入自定义样式

const { Option } = Select;

const data = [
    {
        key: '1',
        orderNumber: 'order_9639441582',
        orderStatus: '已取消',
        orderType: '积分充值',
        amount: '¥9.99',
        expiryTime: '2024-07-10 00:22:51',
        createTime: '2024-07-10 00:17:50',
        description: '增加18999坤币到钱包',
    },
    {
        key: '2',
        orderNumber: 'order_8577286710',
        orderStatus: '待支付',
        orderType: '积分充值',
        amount: '¥9.99',
        expiryTime: '2024-07-10 00:22:54',
        createTime: '2024-07-10 00:17:53',
        description: '增加18999坤币到钱包',
    },
    {
        key: '3',
        orderNumber: 'order_0340752834',
        orderStatus: '已完成',
        orderType: '积分充值',
        amount: '¥1.99',
        expiryTime: '2024-07-10 01:43:02',
        createTime: '2024-07-10 01:38:02',
        description: '增加3000坤币到钱包',
    },
];

const OrderTable = () => {
    const [searchOrderNumber, setSearchOrderNumber] = useState('');
    const [searchOrderStatus, setSearchOrderStatus] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleSearch = () => {
        const filtered = data.filter(item =>
            (!searchOrderNumber || item.orderNumber.includes(searchOrderNumber)) &&
            (!searchOrderStatus || item.orderStatus === searchOrderStatus)
        );
        setFilteredData(filtered);
    };

    const handleView = (order) => {
        setSelectedOrder(order);
        setVisibleModal(true);
    };

    const handleDelete = (order) => {
        Modal.confirm({
            title: '确认删除',
            content: '您确定要删除这个订单吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                message.success('订单已删除');
                setFilteredData(prevData => prevData.filter(item => item.key !== order.key));
            },
        });
    };

    const columns = [
        {
            title: '订单号',
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
        },
        {
            title: '订单类型',
            dataIndex: 'orderType',
            key: 'orderType',
        },
        {
            title: '订单金额',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '过期时间',
            dataIndex: 'expiryTime',
            key: 'expiryTime',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '订单描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <>
                    {record.orderStatus === '待支付' && (
                        <Button type="primary" onClick={() => handleView(record)}>去支付</Button>
                    )}
                    {(record.orderStatus === '已取消' || record.orderStatus === '已完成') && (
                        <Button onClick={() => handleView(record)}>查看</Button>
                    )}
                    <Button style={{ marginLeft: 8, color: 'red' }} onClick={() => handleDelete(record)}>删除</Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <div style={{ marginBottom: 16 }}>
                <Input
                    placeholder="订单号：请输入"
                    value={searchOrderNumber}
                    onChange={e => setSearchOrderNumber(e.target.value)}
                    style={{ width: 200, marginRight: 16 }}
                />
                <Select
                    placeholder="订单状态"
                    value={searchOrderStatus}
                    onChange={value => setSearchOrderStatus(value)}
                    style={{ width: 200, marginRight: 16 }}
                >
                    <Option value="已取消">已取消</Option>
                    <Option value="已完成">已完成</Option>
                    <Option value="待支付">待支付</Option>
                </Select>
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                    查询
                </Button>
            </div>
            <Table columns={columns} dataSource={filteredData} pagination={{ pageSize: 4 }} />

            <Modal
                title="订单详情"
                visible={visibleModal}
                onCancel={() => setVisibleModal(false)}
                footer={[
                    <Button key="back" onClick={() => setVisibleModal(false)}>
                        关闭
                    </Button>,
                ]}
                bodyStyle={{ padding: '20px' }}
                centered
                className="order-modal"
            >
                {selectedOrder && (
                    <div className="order-details">
                        <div className="order-row">
                            <div className="order-label">订单名称:</div>
                            <div className="order-value">18999坤币</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">过期时间:</div>
                            <div className="order-value">{selectedOrder.expiryTime}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单号:</div>
                            <div className="order-value">{selectedOrder.orderNumber}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单金额 (元):</div>
                            <div className="order-value">{selectedOrder.amount}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单状态:</div>
                            <div className="order-value">{selectedOrder.orderStatus}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">创建时间:</div>
                            <div className="order-value">{selectedOrder.createTime}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">商品类别:</div>
                            <div className="order-value">{selectedOrder.orderType}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">商品描述:</div>
                            <div className="order-value">{selectedOrder.description}</div>
                        </div>
                        <Button type="primary" danger style={{ marginTop: '20px' }} onClick={() => handleDelete(selectedOrder)}>
                            删除订单
                        </Button>
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default OrderTable;