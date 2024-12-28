import React, { useState } from 'react';
import { Button, Menu, Dropdown } from 'antd';
import { PlusOutlined, FileAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);

  const handleMenuClick = ({ key }) => {
    if (key === 'todo') {
      // 显示待办清单的逻辑
    } else if (key === 'create') {
      // 创建文档的逻辑
    } else if (key === 'import') {
      // 导入文档的逻辑
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="create" icon={<FileAddOutlined />}>
        创建文档
      </Menu.Item>
      <Menu.Item key="import" icon={<PlusOutlined />}>
        导入文档
      </Menu.Item>
      <Menu.Item key="todo" icon={<CheckSquareOutlined />}>
        待办清单
      </Menu.Item>
    </Menu>
  );

  const handleDrag = () => {
    // 在拖动开始时隐藏菜单
    setVisible(false);
  };

  const handleButtonClick = () => {
    // 在点击按钮时显示或隐藏菜单
    setVisible(!visible);
  };

  return (
    <Draggable onDrag={handleDrag}>
      <div>
        <Dropdown
          menu={menu}  // 将 overlay 替换为 menu
          trigger={['click']}
          onOpenChange={(flag) => setVisible(flag)}
          open={visible}
        >
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            onClick={handleButtonClick}
            style={{
              position: 'fixed',
              bottom: 50,
              right: 50,
              zIndex: 1000,
            }}
          />
        </Dropdown>
      </div>
    </Draggable>
  );
};

export default FloatingButton;
