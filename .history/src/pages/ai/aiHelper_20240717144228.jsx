import React, { useState } from 'react';
import { Input, Button, Upload, List, Typography, Tooltip } from 'antd';
import { UploadOutlined, SendOutlined, CopyOutlined } from '@ant-design/icons';

const AiHelper = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [fileList, setFileList] = useState([]);

  const handleSend = () => {
    if (inputValue || fileList.length) {
      const newMessage = {
        content: inputValue,
        files: fileList,
        sender: 'user',
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
      setFileList([]);
    }
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  const handleFileChange = ({ fileList }) => setFileList(fileList);

  return (
    <div style={{ padding: 20, display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <List
        style={{ flexGrow: 1, overflowY: 'auto', marginBottom: 20 }}
        dataSource={messages}
        renderItem={(item) => (
          <List.Item style={{ justifyContent: item.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '60%',
              backgroundColor: item.sender === 'user' ? '#1890ff' : '#722ed1',
              color: '#fff',
              padding: 10,
              borderRadius: 10,
              position: 'relative',
            }}>
              <Typography.Text style={{ color: '#fff' }}>{item.content}</Typography.Text>
              {item.sender === 'assistant' && (
                <Tooltip title="Copy">
                  <CopyOutlined
                    onClick={() => handleCopy(item.content)}
                    style={{ position: 'absolute', bottom: 5, right: 5, cursor: 'pointer', color: '#fff' }}
                  />
                </Tooltip>
              )}
              {item.files.length > 0 && (
                <div>
                  {item.files.map((file, index) => (
                    <div key={index}>{file.name}</div>
                  ))}
                </div>
              )}
            </div>
          </List.Item>
        )}
      />
      <Upload
        fileList={fileList}
        onChange={handleFileChange}
        beforeUpload={() => false}
        multiple
        style={{ marginBottom: 10 }}
      >
        <Button icon={<UploadOutlined />}>选择文件</Button>
      </Upload>
      <Input.Group compact style={{ display: 'flex' }}>
        <Input
          style={{ flex: 1 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入消息"
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
          发送
        </Button>
      </Input.Group>
    </div>
  );
};

export default AiHelper;
