import React, { useEffect, useState } from 'react';
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

  useEffect(() => {
    const fetchData = async () => {
      const formData = new FormData();

      // 在这里添加你的表单数据，例如：
      formData.append('field1', 'value1');
      formData.append('field2', 'value2');
      try {
        const response = await request.get('http://192.168.50.150:5000/getMilvus', {
          data: formData,
        });

        // 判断返回数据的 code 属性是否为 200
        if (response.data.code === 200) {
          setData(response.data.data)
        } else {
          console.log('请求失败，code:', response.code);
        }

        return response;
      } catch (error) {
        console.error('Request failed:', error);
        throw error;
      }
    }
    fetchData()
  })
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
