import React, { useEffect, useState } from 'react';
import { Table, Button, Avatar, Pagination, Modal,Tag } from 'antd';
import 'antd/dist/reset.css';
import backFun from '../../api/user/back';

const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6); // 固定每页显示 6 条
  const [data, setData] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalAction, setModalAction] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const res = await backFun.getUserList();
      if (res.code === 200) {
        setData(res.data);
      }
    };
    fetchData();
  }, []);

  const showConfirmModal = (user, action) => {
    setSelectedUser(user);
    setModalAction(action);
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setData((prevData) =>
      prevData.map((user) =>
        user.id === selectedUser.id
          ? { ...user, status: modalAction === 'freeze' ? 1 : 0 }
          : user
      )
    );
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setSelectedUser(null);
  };

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <Avatar src={avatar} size={35} />, // 调整头像大小
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',

      render: (nickname, record) => (
        <>
          <span>{nickname}</span>
          {record.level === 1 && (
            <Tag className='m-l-6 m-t-6' color="cyan">
              尊贵会员 {record.memberExpireTime}
            </Tag>
          )}
        </>
      ),
    },
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <>
          {record.status === 0 ? (
            <Button type="primary" onClick={() => showConfirmModal(record, 'freeze')}>
              冻结
            </Button>
          ) : (
            <Button onClick={() => showConfirmModal(record, 'unfreeze')}>解冻</Button>
          )}
        </>
      ),
    },
  ];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='p-10'>
      <h3 className='m-10'><strong>用户管理</strong></h3>
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
        title={`确认${modalAction === 'freeze' ? '冻结' : '解冻'}用户`}
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <p>{`你确定要${modalAction === 'freeze' ? '冻结' : '解冻'}该用户吗？`}</p>
      </Modal>
    </div>
  );
};

export default UserManagement;
