import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, notification } from "antd";
import shareCFun from '../../api/user/share';

const { TextArea } = Input;

const SystemNotificationManager = () => {
    const [notifications, setNotifications] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editingNotification, setEditingNotification] = useState(null);

    // 获取通知列表
    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            // 从后端获取通知列表
            const response = await shareCFun.getNotifications();
            setNotifications(response.data);
        } catch (error) {
            notification.error({
                message: "错误",
                description: "获取通知失败",
            });
        }
    };

    // 创建或编辑通知
    const showModal = (record = null) => {
        setIsModalVisible(true);
        setIsEdit(!!record);
        setEditingNotification(record || { title: "", type: "", content: "" });
    };

    const handleSubmit = async (values) => {
        try {
            if (isEdit) {
                // 编辑已有通知
                await shareCFun.updateNotification(editingNotification.notification_id, values);
                notification.success({ message: "成功", description: "通知更新成功" });
            } else {
                // 创建新通知
                await shareCFun.createNotification(values);
                notification.success({ message: "成功", description: "通知创建成功" });

                // 如果通知类型为文档分享，调用 `shareCFun.document`
                if (values.type === "document") {
                    await shareCFun.document(values);
                }
            }
            fetchNotifications();
            setIsModalVisible(false);
        } catch (error) {
            notification.error({
                message: "错误",
                description: "保存通知失败",
            });
        }
    };

    // 删除通知
    const handleDelete = async (notificationId) => {
        try {
            await shareCFun.deleteNotification(notificationId);
            notification.success({ message: "成功", description: "通知删除成功" });
            fetchNotifications();
        } catch (error) {
            notification.error({
                message: "错误",
                description: "删除通知失败",
            });
        }
    };

    const columns = [
        { title: "标题", dataIndex: "title", key: "title" },
        { title: "类型", dataIndex: "type", key: "type" },
        { title: "内容", dataIndex: "content", key: "content", ellipsis: true },
        {
            title: "操作",
            key: "actions",
            render: (_, record) => (
                <>
                    <Button onClick={() => showModal(record)} type="link">
                        编辑
                    </Button>
                    <Button onClick={() => handleDelete(record.notificationId)} type="link" danger>
                        删除
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: 16 }}>
                创建通知
            </Button>
            <Table
                rowKey="notification_id"
                columns={columns}
                dataSource={notifications}
                pagination={{ pageSize: 10 }}
            />
            <Modal
                title={isEdit ? "编辑通知" : "创建通知"}
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
            >
                <Form
                    initialValues={editingNotification}
                    onFinish={handleSubmit}
                    layout="vertical"
                >
                    <Form.Item
                        name="title"
                        label="标题"
                        rules={[{ required: true, message: "请输入通知标题!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="type"
                        label="类型"
                        rules={[{ required: true, message: "请输入通知类型!" }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="content"
                        label="内容"
                        rules={[{ required: true, message: "请输入通知内容!" }]}
                    >
                        <TextArea rows={4} />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            {isEdit ? "更新" : "创建"}
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default SystemNotificationManager;
