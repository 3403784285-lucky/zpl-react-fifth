import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Form, Input, Select, message } from 'antd';
import backFun from '../../api/user/back';

const { Option } = Select;

const OrderManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // 固定每页显示 6 条
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      // 替换成你的获取订单列表的逻辑
      const res = await backFun.getPaidOrders();
      if (res.code === 200) {
        setData(res.data);
      }
    };
    fetchData();
  }, []);

  const showEditModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleModalOk = (values) => {
    setData((prevData) =>
      prevData.map((order) =>
        order.id === selectedOrder.id
          ? { ...order, ...values }
          : order
      )
    );
    setIsModalVisible(false);
    setSelectedOrder(null);
    message.success('订单信息已更新');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const columns = [
    {
      title: '订单ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '创建者',
      dataIndex: 'userId',
      key: 'userId',
      render: (userId) => `用户 ${userId}`, // 假设 userId 是用户标识，可以根据实际需求改为用户名称
    },
    {
      title: '类型',
      dataIndex: 'orderType',
      key: 'orderType',
    },
    {
      title: '数量',
      dataIndex: 'num',
      key: 'num',
    },
    {
      title: '金额',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `¥${amount.toFixed(2)}`,
    },
    {
      title: '创建时间',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (status === 'completed' ? '已完成' : '进行中'),
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Button type="primary" onClick={() => showEditModal(record)}>
          编辑
        </Button>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='p-10'>
      <h3 className='m-10'><strong>订单管理</strong></h3>
      <Table
        className='m-t-30'
        columns={columns}
        dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false}
        rowKey="id"
      />
      <div className='pagination-container'>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={data.length}
          onChange={handlePageChange}
          showQuickJumper
        />
      </div>

      <Modal
        title="编辑订单信息"
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form initialValues={selectedOrder} onFinish={handleModalOk}>
          <Form.Item
            label="订单ID"
            name="id"
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="类型"
            name="orderType"
            rules={[{ required: true, message: '请输入订单类型' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="数量"
            name="num"
            rules={[{ required: true, message: '请输入订单数量' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            label="金额"
            name="amount"
            rules={[{ required: true, message: '请输入订单金额' }]}
          >
            <Input prefix="¥" type="number" />
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请选择订单状态' }]}
          >
            <Select>
              <Option value="ongoing">进行中</Option>
              <Option value="completed">已完成</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="描述"
            name="description"
          >
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              保存修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OrderManagement;
