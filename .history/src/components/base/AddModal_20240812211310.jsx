import React, { useState } from 'react';
import { Modal, Input, List } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import './TodoModal.css'; // 引入样式文件

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
    ],
});

const TodoModal = ({ visible, setVisible }) => {
  const [todoName, setTodoName] = useState('');
  const [fileList, setFileList] = useState([
    { id: 1, name: 'Document 1' },
    { id: 2, name: 'Document 2' },
    { id: 3, name: 'Document 3' },
  ]);
  const [selectedFileId, setSelectedFileId] = useState(null); // 用于存储被点击的列表项ID

  const handleOk = () => {
    setVisible(false);
  };

  const handleTodoNameChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleFileClick = (file) => {
    console.log(`File clicked: ${file.name}`);
    setSelectedFileId(file.id); // 设置被点击的文件ID
  };

  return (
    <>
      <Modal
        title="创建待办项"
        open={visible}
        onOk={handleOk}
        onCancel={() => setVisible(false)}
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
            <List.Item
              onClick={() => handleFileClick(file)}
              className={selectedFileId === file.id ? 'is-selected' : ''} // 动态添加类名
            >
              <List.Item.Meta
                avatar={<IconFont type="icon-wordIcon" className="font-size-lg" />}
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
