import React, { useState } from 'react';
import { Modal, Input, List } from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
    ],
});
const TodoModal = ({visible,setVisible}) => {
  const [todoName, setTodoName] = useState('');
  const [fileList, setFileList] = useState([
    { id: 1, name: 'Document 1' },
    { id: 2, name: 'Document 2' },
    { id: 3, name: 'Document 3' },
  ]);
  const [selectedFileId, setSelectedFileId] = useState(null);


  const handleOk = () => {
    setVisible(false);
  };



  const handleTodoNameChange = (e) => {
    setTodoName(e.target.value);
  };

  const handleFileClick = (file) => {
    console.log(`File clicked: ${file.name}`);
    setSelectedFileId(file.id); // 设置被点击的文件ID
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
        <h4 className='text-color-grey m-l-10'>名称</h4>
        <Input
        className='m-t-10'
          placeholder="可以选择文件，表示想要通过该代办想跳转到对应文件（可选）"
          value={todoName}
          onChange={handleTodoNameChange}
        />
        <List
          itemLayout="horizontal"
          className='m-t-10'
          dataSource={fileList}
          renderItem={file => (
            <List.Item onClick={() => handleFileClick(file)}   className={selectedFileId === file.id ? 'is-selected p-10' : 'p-10'} >
              <List.Item.Meta
                avatar={<IconFont type="icon-wordIcon" className="font-size-lg"/>}
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
