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
    <div style={{ padding: 20, maxWidth: 600, margin: 'auto' }}>
      <List
        dataSource={messages}
        renderItem={(item) => (
          <List.Item style={{ justifyContent: item.sender === 'user' ? 'flex-end' : 'flex-start' }}>
            <div style={{
              maxWidth: '60%',
              backgroundColor: item.sender === 'user' ? '#1890ff' : '#purple',
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
      {fileList.length > 0 && (
        <div style={{ marginBottom: 10 }}>
          {fileList.map((file, index) => (
            <div key={index} style={{ backgroundColor: '#f0f2f5', padding: 5, borderRadius: 5, marginTop: 5 }}>
              {file.name}
            </div>
          ))}
        </div>
      )}
      <Input.Group compact style={{ display: 'flex' }}>
        <Upload
          fileList={fileList}
          onChange={handleFileChange}
          beforeUpload={() => false}
          multiple
        >
          <Button icon={<UploadOutlined />} />
        </Upload>
        <Input
          style={{ flex: 1 }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message"
        />
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
          Send
        </Button>
      </Input.Group>
    </div>
  );
};

export default AiHelper;
