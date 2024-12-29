import React, { useEffect, useState } from 'react';
import { Table, Button, Avatar, Pagination } from 'antd';
import 'antd/dist/reset.css';
import backFun from '../../api/user/back';
const UserManagement = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  useEffect(()=>{

    const fetchData=async()=>{
        const res=await backFun.getUserList()
        if(res.code==200){
            setData(res.data)
        }

    }
    fetchData()


  },[])

  const handleFreeze = (id) => {
    console.log(`Freeze user with ID: ${id}`);
    // 在这里添加冻结用户的逻辑
  };

  const handleUnfreeze = (id) => {
    console.log(`Unfreeze user with ID: ${id}`);
    // 在这里添加解冻用户的逻辑
  };

  const columns = [
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar) => <Avatar src={avatar} />,
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
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
            <Button type="primary" onClick={() => handleFreeze(record.id)}>
              冻结
            </Button>
          ) : (
            <Button onClick={() => handleUnfreeze(record.id)}>解冻</Button>
          )}
        </>
      ),
    },
  ];

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
    // 在这里添加获取新页数据的逻辑
  };

  return (
    <div className='p-t-70'>
      <Table
        columns={columns}
        dataSource={data.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
        pagination={false}
        rowKey="id"
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={data.length}
        onChange={handlePageChange}
        showSizeChanger
      />
    </div>
  );
};

export default UserManagement;
