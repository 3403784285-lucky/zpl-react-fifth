import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Form, Input, Select, Space, message } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import backFun from '../../api/user/back';

const { Option } = Select;
const { confirm } = Modal;

const PriceManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // 固定每页显示 6 条
  const [data, setData] = useState([]);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetchPriceTable();
  }, []);

  const fetchPriceTable = async () => {
    const res = await backFun.getPriceTable();
    if (res.code === 200) {
      setData(res.data);
    } else {
      message.error('获取价格表失败');
    }
  };

  const showEditModal = (item) => {
    setSelectedItem(item);
    setIsEditModalVisible(true);
  };

  const showAddModal = () => {
    setSelectedItem(null);
    setIsAddModalVisible(true);
  };

  const handleEditModalOk = async (values) => {
    const payload = {
      id: selectedItem.id,
      price: values.price,
      newValue: values.newValue,
    };
    const res = await backFun.updatePriceItem(payload);
    if (res.code === 200) {
      message.success('商品信息已更新');
      fetchPriceTable();
    } else {
      message.error('更新商品信息失败');
    }
    setIsEditModalVisible(false);
    setSelectedItem(null);
  };

  const handleAddModalOk = async (values) => {
    const res = await backFun.addPriceItem(values);
    if (res.code === 200) {
      message.success('商品已新增');
      fetchPriceTable();
    } else {
      message.error('新增商品失败');
    }
    setIsAddModalVisible(false);
  };

  const handleModalCancel = () => {
    setIsEditModalVisible(false);
    setIsAddModalVisible(false);
    setSelectedItem(null);
  };

  const confirmDeleteItem = (itemId) => {
    confirm({
      title: '确认删除该商品?',
      icon: <ExclamationCircleOutlined />,
      content: '删除后该操作无法撤销',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        handleDeleteItem(itemId);
      },
    });
  };

  const confirmToggleItemStatus = (item) => {
    confirm({
      title: `确认${item.isDeleted === 0 ? '下架' : '上架'}该商品?`,
      icon: <ExclamationCircleOutlined />,
      content: `${item.isDeleted === 0 ? '下架' : '上架'}后该操作可以再次更改`,
      okText: '确认',
      cancelText: '取消',
      onOk() {
        handleToggleItemStatus(item);
      },
    });
  };

  const handleDeleteItem = async (itemId) => {
    const res = await backFun.deletePriceItem(itemId);
    if (res.code === 200) {
      message.success('商品已删除');
      fetchPriceTable();
    } else {
      message.error('删除商品失败');
    }
  };

  const handleToggleItemStatus = async (item) => {
    const res = await backFun.togglePriceItemStatus({ id: item.id, isDeleted: item.isDeleted === 0 ? 1 : 0 });
    if (res.code === 200) {
      message.success(`商品已${item.isDeleted === 0 ? '下架' : '上架'}`);
      fetchPriceTable();
    } else {
      message.error(`${item.isDeleted === 0 ? '下架' : '上架'}商品失败`);
    }
  };

  const columns = [
    {
      title: '类型',
      dataIndex: 'itemType',
      key: 'itemType',
      width: '25%',
    },
    {
      title: '金额',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price.toFixed(2)}`,
      width: '25%',
    },
    {
      title: '状态',
      dataIndex: 'isDeleted',
      key: 'isDeleted',
      render: (isDeleted) => (isDeleted === 0 ? '上架' : '下架'),
      width: '20%',
    },
    {
      title: '数量',
      dataIndex: 'itemValue',
      key: 'itemValue',
      width: '15%',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={() => showEditModal(record)}>
              编辑
            </Button>
            <Button danger onClick={() => confirmDeleteItem(record.id)}>
              删除
            </Button>
            <Button onClick={() => confirmToggleItemStatus(record)}>
              {record.isDeleted === 0 ? '下架' : '上架'}
            </Button>
          </Space>
      ),
      width: '15%',
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
      <div className='p-10'>
        <h3 className='m-10 flex' style={{ justifyContent: 'space-between' }}>
          <strong>价格管理</strong>
          <Button
              type="primary"
              icon={<PlusOutlined />}
              className='m-b-20'
              onClick={showAddModal}
          >
            新增选项
          </Button>
        </h3>
        <Table
            className='m-t-12'
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

        {/* 编辑商品信息 */}
        <Modal
            title="编辑商品信息"
            open={isEditModalVisible}
            onCancel={handleModalCancel}
            footer={null}
        >
          <Form initialValues={selectedItem} onFinish={handleEditModalOk}>
            <Form.Item
                label="新价格"
                name="price"
                rules={[{ required: true, message: '请输入新价格' }]}
            >
              <Input prefix="¥" type="number" />
            </Form.Item>
            <Form.Item
                label="新值"
                name="newValue"
                rules={[{ required: true, message: '请输入新值' }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                保存修改
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* 新增商品 */}
        <Modal
            title="新增商品"
            open={isAddModalVisible}
            onCancel={handleModalCancel}
            footer={null}
        >
          <Form onFinish={handleAddModalOk}>
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
                确认新增
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default PriceManagement;
