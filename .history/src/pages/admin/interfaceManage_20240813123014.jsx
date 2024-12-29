import React, { useEffect, useState } from 'react';
import { Table, Button, Modal, Pagination, Input, Form, Space, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


const InterfaceManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // 固定每页显示 6 条
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedInterface, setSelectedInterface] = useState(null);
  const [modalAction, setModalAction] = useState('');
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      // 替换成你的获取接口列表的逻辑
      const res = await getInterfaceList();
      if (res.code === 200) {
        setData(res.data);
      }
    };
    fetchData();
  }, []);

  const showConfirmModal = (intf, action) => {
    setSelectedInterface(intf);
    setModalAction(action);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setData((prevData) =>
      prevData.map((intf) =>
        intf.id === selectedInterface.id
          ? { ...intf, status: modalAction === 'offline' ? 0 : 1 }
          : intf
      )
    );
    setIsModalVisible(false);
    setSelectedInterface(null);
    message.success(`接口已${modalAction === 'offline' ? '下线' : '上线'}`);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedInterface(null);
  };

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleAddModalOk = (values) => {
    setData((prevData) => [
      ...prevData,
      {
        id: prevData.length + 1,
        ...values,
        status: 1, // 新增接口默认上线
      },
    ]);
    setIsAddModalVisible(false);
    message.success('接口已新增并上线');
  };

  const handleAddModalCancel = () => {
    setIsAddModalVisible(false);
  };

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '路由',
      dataIndex: 'route',
      key: 'route',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `¥${price}`,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (status === 1 ? '上线' : '下线'),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          {record.status === 1 ? (
            <Button danger onClick={() => showConfirmModal(record, 'offline')}>
              下线
            </Button>
          ) : (
            <Button type="primary" onClick={() => showConfirmModal(record, 'online')}>
              上线
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='p-10'>
      <h3 className='m-10'><strong>接口管理</strong></h3>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        className='m-b-20'
        onClick={showAddModal}
      >
        新增接口
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
        title={`确认${modalAction === 'offline' ? '下线' : '上线'}接口`}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>{`你确定要${modalAction === 'offline' ? '下线' : '上线'}该接口吗？`}</p>
      </Modal>

      <Modal
        title="新增接口"
        visible={isAddModalVisible}
        onCancel={handleAddModalCancel}
        footer={null}
      >
        <Form onFinish={handleAddModalOk}>
          <Form.Item
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入接口名称' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="路由"
            name="route"
            rules={[{ required: true, message: '请输入接口路由' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="价格"
            name="price"
            rules={[{ required: true, message: '请输入接口价格' }]}
          >
            <Input prefix="¥" type="number" />
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

export default InterfaceManagement;
