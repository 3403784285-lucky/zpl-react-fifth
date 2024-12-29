import React, { useState, useEffect } from 'react';
import { List, Modal, Pagination, message, Spin, Empty, Typography, Card, Space, Tag } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import backFun from '../../../api/user/back'; // 引入接口

const { Title, Text } = Typography;

const InformationNotice = () => {
    const [notices, setNotices] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentNotice, setCurrentNotice] = useState(null);

    useEffect(() => {
        fetchNotices();
    }, [currentPage]);

    const fetchNotices = async () => {
        setLoading(true);
        try {
            const response = await backFun.getNotices(currentPage, pageSize);
            if (response.code === 200) {
                setNotices(response.data.records);
                setTotal(response.data.total);
            } else {
                message.error('获取通知列表失败');
            }
        } catch (error) {
            message.error('获取通知列表失败');
        } finally {
            setLoading(false);
        }
    };

    const handleNoticeClick = (notice) => {
        setCurrentNotice(notice);
        setModalVisible(true);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleModalClose = () => {
        setModalVisible(false);
        setCurrentNotice(null);
    };

    return (
        <Card
            bordered={false}
            bodyStyle={{ padding: '24px' }}
            className="shadow-lg rounded-lg"
        >
            <Title level={2} style={{ marginBottom: '24px' }}>
                系统通知
            </Title>
            <Spin spinning={loading}>
                {notices.length > 0 ? (
                    <List
                        dataSource={notices}
                        renderItem={(item) => (
                            <List.Item
                                className="hover:bg-gray-100 transition duration-200"
                                onClick={() => handleNoticeClick(item)}
                                style={{
                                    cursor: 'pointer',
                                    padding: '16px',
                                    borderBottom: '1px solid #f0f0f0',
                                }}
                            >
                                <Space direction="vertical" style={{ width: '100%' }}>
                                    <div className="flex justify-between">
                                        <Text strong style={{ fontSize: '16px' }}>
                                            {item.title}
                                        </Text>

                                        &nbsp;
                                        <Tag color="blue">{item.type}</Tag>
                                    </div>
                                    <Space>
                                        <ClockCircleOutlined style={{ color: '#888' }} />
                                        <Text type="secondary">{item.createdAt}</Text>
                                    </Space>
                                </Space>
                            </List.Item>
                        )}
                    />
                ) : (
                    <Empty description="暂无通知" />
                )}
            </Spin>
            <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Pagination
                    current={currentPage}
                    pageSize={pageSize}
                    total={total}
                    onChange={handlePageChange}
                    showQuickJumper
                    showTotal={(total) => `总共 ${total} 条`}
                />
            </div>
            <Modal
                title="通知详情"
                open={modalVisible}
                onCancel={handleModalClose}
                footer={null}
                centered
                bodyStyle={{ padding: '16px' }}
            >
                {currentNotice && (
                    <Space direction="vertical" style={{ width: '100%' }}>
                        <Title level={4}>{currentNotice.title}</Title>
                        <Text type="secondary">
                            <ClockCircleOutlined style={{ marginRight: '8px' }} />
                            {currentNotice.createdAt}
                        </Text>
                        <div
                            style={{
                                padding: '12px',
                                borderRadius: '8px',
                                whiteSpace: 'pre-wrap',
                            }}
                        >
                            {currentNotice.content}
                        </div>
                    </Space>
                )}
            </Modal>
        </Card>
    );
};

export default InformationNotice;
