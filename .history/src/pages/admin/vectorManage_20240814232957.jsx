import React, { useEffect, useState } from 'react';
import { Upload, Button, Table, Modal, Popconfirm, message, Pagination } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import request from 'umi-request';

const columns = [
  {
    title: 'ID',
    dataIndex: 'answer_id',
    key: 'answer_id',
  },
  {
    title: '答',
    dataIndex: 'answer',
    key: 'answer',
    render: text => (
      <div
       className='text-ellipsis'
        title={text} // 鼠标悬停时显示完整内容
      >
        {text}
      </div>
    ),
  },
];

const App = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // 当前页码
  const [pageSize] = useState(7); // 每页显示的数据条数
  const [total, setTotal] = useState(0); // 数据总数

  const fetchData = () => {
    request('http://192.168.50.150:5000/getMilvus', {
      method: 'GET',
      params: { page: currentPage },  // 通过params将page参数传递给服务器
    })
      .then(response => {
        // 判断返回数据的 code 属性是否为 200
        if (response.code === 200) {
          setTotal(response.data.length);
          const paginatedData = response.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
          setData(paginatedData);  // 设置表格数据
        } else {
          console.log('请求失败，code:', response.code);
        }
      })
      .catch(error => {
        console.error('Request failed:', error);
        throw error;
      });
  };

  useEffect(() => {
    fetchData(); // 加载初始数据
  }, [currentPage]);

  const onSelectChange = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const handleDelete = () => {
    setData(data.filter(item => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]);
    setIsModalVisible(false);
    message.success('删除成功');
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // 更新当前页码
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Upload>
          <Button icon={<UploadOutlined />}>上传文件</Button>
        </Upload>
        <Popconfirm
          title={`确定要删除这${selectedRowKeys.length}项吗？`}
          onConfirm={() => setIsModalVisible(true)}
          okText="确认"
          cancelText="取消"
          disabled={selectedRowKeys.length === 0}
        >
          <Button icon={<DeleteOutlined />} type="danger" disabled={selectedRowKeys.length === 0}>
            删除
          </Button>
        </Popconfirm>
      </div>

      {/* 表格部分 */}
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={false} // 关闭默认分页
        bordered
      />

      {/* 分页器部分 */}
      <div className='container'>
        <Pagination
          current={currentPage} // 当前页码
          pageSize={pageSize} // 每页显示的数据条数
          total={total} // 数据总数
          showQuickJumper // 显示跳转到指定页的输入框
          onChange={handlePageChange} // 页码变化时的回调
        />
      </div>

      <Modal
        title="确认删除"
        visible={isModalVisible}
        onOk={handleDelete}
        onCancel={() => setIsModalVisible(false)}
      >
        <p>您将要删除{selectedRowKeys.length}项内容，确认删除吗？</p>
      </Modal>
    </div>
  );
};

export default App;
