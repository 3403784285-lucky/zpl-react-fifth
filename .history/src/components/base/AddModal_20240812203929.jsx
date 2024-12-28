import React, { useState } from 'react';
import { Modal, Input, List } from 'antd';
import { FileOutlined } from '@ant-design/icons';

const TodoModal = () => {
  const [visible, setVisible] = useState(false);
  const [todoName, setTodoName] = useState('');
  const [fileList, setFileList] = useState([
    { id: 1, name: 'Document 1' },
    { id: 2, name: 'Document 2' },
    { id: 3, name: 'Document 3' },
  ]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleTodoNameChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleFileClick = (file) => {
    console.log(`File clicked: ${file.name}`);
    // Handle file click action here
  };

  return (
    <>
      <button onClick={showModal}>Open Modal</button>
      <Modal
        title="Create Todo Item"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter todo item name"
          value={todoName}
          onChange={handleTodoNameChange}
        />
        <List
          itemLayout="horizontal"
          dataSource={fileList}
          renderItem={file => (
            <List.Item onClick={() => handleFileClick(file)}>
              <List.Item.Meta
                avatar={<FileOutlined />}
                title={file.name}
              />
            </List.Item>
          )}
        />
      </Modal>
    </>
  );
};

export default TodoModal;
