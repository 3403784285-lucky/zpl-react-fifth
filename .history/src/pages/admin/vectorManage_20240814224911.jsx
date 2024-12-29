import React, { useState } from 'react';
import { Upload, Button, Table, Modal, Popconfirm, message } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import request from 'umi-request';


const columns = [

  {
    title: 'ID',
    dataIndex: 'answer_id',
    key: 'answer_id',
  }, {
    title: '答',
    dataIndex: 'answer',
    key: 'answer',
  },
];

const App = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const paginationConfig = {
    pageSize: 5, // 每页显示的数据条数
    showQuickJumper: true, // 显示跳转到指定页的输入框
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
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={data}
        pagination={paginationConfig}
        bordered
      />
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