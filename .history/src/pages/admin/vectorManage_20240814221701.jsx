import React from 'react';
import { Upload, Button, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const data = [
  {
    key: '1',
    answer: "抽象",
    answer_id: 451842191018906751,
  },
  {
    key: '2',
    answer: "检查点轮换保存和恢复程序的运行状态",
    answer_id: 451842191018906753,
  },
  // 其他的数据项...
];

const columns = [
  {
    title: 'Answer',
    dataIndex: 'answer',
    key: 'answer',
  },
  {
    title: 'Answer ID',
    dataIndex: 'answer_id',
    key: 'answer_id',
  },
];

const App = () => {
  const uploadProps = {
    beforeUpload: file => {
      // 上传文件的处理逻辑
      console.log(file);
      return false; // 阻止自动上传
    },
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
        <Upload {...uploadProps}>
          <Button icon={<UploadOutlined />}>上传文件</Button>
        </Upload>
      </div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        bordered
      />
    </div>
  );
};

export default App;
