import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Form, Input, Select, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Option } = Select;

const priceManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // 固定每页显示 6 条
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalAction, setModalAction] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // 替换成你的获取商品列表的逻辑
      const res = await getItemList();
      if (res.code === 200) {
        setData(res.data);
      }
    };
    fetchData();
  }, []);

  const showEditModal = (item) => {
    setSelectedItem(item);
    setIsModalVisible(true);
    setModalAction('edit');
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleModalOk = (values) => {
    if (modalAction === 'edit') {
      setData((prevData) =>
        prevData.map((item) =>
          item.id === selectedItem.id
            ? { ...item, ...values }
            : item
        )
      );
      message.success('商品信息已更新');
    } else if (modalAction === 'add') {
      setData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          ...values,
          isDeleted: 0,
        },
      ]);
      message.success('商品已新增');
    }
    setIsModalVisible(false);
    setIsAddModalVisible(false);
    setSelectedItem(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setIsAddModalVisible(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (itemId) => {
    setData((prevData) => prevData.filter((item) => item.id !== itemId));
    message.success('商品已删除');
  };

  const handleToggleItemStatus = (item) => {
    setData((prevData) =>
      prevData.map((it) =>
        it.id === item.id
          ? { ...it, isDeleted: it.isDeleted === 0 ? 1 : 0 }
          : it
      )
    );
    message.success(`商品已${item.isDeleted === 0 ? '下架' : '上架'}`);
  };

  const columns = [
    {
      title: '类型',
      dataIndex: 'itemType',
      key: 'itemType',
    },
    {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price.toFixed(2)}`,
    },
    {
      title: '状态',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (isDeleted) => (isDeleted === 0 ? '上架' : '下架'),
    },
    {
      title: '数量',
      dataIndex: 'itemValue',
      key: 'itemValue',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showEditModal(record)}>
            编辑
          </Button>
          <Button danger onClick={() => handleDeleteItem(record.id)}>
            删除
          </Button>
          <Button onClick={() => handleToggleItemStatus(record)}>
            {record.isDeleted === 0 ? '下架' : '上架'}
          </Button>
        </Space>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='p-10'>
      <h3 className='m-10'><strong>商品管理</strong></h3>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className='m-b-20'
        onClick={showAddModal}
      >
        新增商品
      </Button>
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
        title={modalAction === 'edit' ? '编辑商品信息' : '新增商品'}
        open={isModalVisible || isAddModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <Form initialValues={selectedItem} onFinish={handleModalOk}>
          <Form.Item
            label="类型"
            name="itemType"
            rules={[{ required: true, message: '请输入商品类型' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="金额"
            name="price"
            rules={[{ required: true, message: '请输入商品金额' }]}
          >
            <Input prefix="¥" type="number" />
          </Form.Item>
          <Form.Item
            label="数量"
            name="itemValue"
            rules={[{ required: true, message: '请输入商品数量' }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              {modalAction === 'edit' ? '保存修改' : '确认新增'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default priceManagement;
