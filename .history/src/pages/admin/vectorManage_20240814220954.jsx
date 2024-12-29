import React from 'react';
import { Upload, Button, List, Typography } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const data = [
  '抽象',
  '检查点轮换保存和恢复程序的运行状态',
  '礼橙是机场的主要变形工具',
  // 其他的内容
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
            <Typography.Text>{item}</Typography.Text>
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
