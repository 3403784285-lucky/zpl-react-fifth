import React from 'react';
import { Upload, Button, List, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const data = [
  {
    answer: "抽象",
    answer_id: 451842191018906751,
  },
  {
    answer: "检查点轮换保存和恢复程序的运行状态",
    answer_id: 451842191018906753,
  },
  // 其他的数据项...
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
      <List
        bordered
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <Typography.Text>{item.answer}</Typography.Text>
            <Typography.Text type="secondary">{item.answer_id}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
