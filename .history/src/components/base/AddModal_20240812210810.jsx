import React, { useState } from 'react';
import { Modal, Input, List } from 'antd';
import { FileOutlined } from '@ant-design/icons';

const TodoModal = ({visible,setVisible}) => {
  const [todoName, setTodoName] = useState('');
  const [fileList, setFileList] = useState([
    { id: 1, name: 'Document 1' },
    { id: 2, name: 'Document 2' },
    { id: 3, name: 'Document 3' },
  ]);



  const handleOk = () => {
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
      <Modal
        title="创建待办项"
        open={visible}
        onOk={handleOk}
        onCancel={()=>setVisible(false)}
      >
        <Input
        className='m-t-10'
          placeholder="Enter todo item name"
          value={todoName}
          onChange={handleTodoNameChange}
        />
        <List
          itemLayout="horizontal"
          className='m-t-10'
          dataSource={fileList}
          renderItem={file => (
            <List.Item onClick={() => handleFileClick(file)}>
              <List.Item.Meta
                avatar={<IconFont type="icon-wordIcon"/>}
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
