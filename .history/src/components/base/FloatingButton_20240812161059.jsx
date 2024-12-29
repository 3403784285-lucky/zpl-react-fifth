import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'antd';
import { PlusOutlined, FileAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  
  useEffect(() => {
    const updateBounds = () => {
      const { innerWidth, innerHeight } = window;
      setBounds({
        left: 0,
        top: 0,
        right: innerWidth - 50, // 50 是按钮的宽度
        bottom: innerHeight - 50, // 50 是按钮的高度
      });
    };

    // 初始化时设置 bounds
    updateBounds();

    // 监听窗口大小变化
    window.addEventListener('resize', updateBounds);

    // 清理事件监听器
    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const handleMenuClick = ({ key }) => {
    if (key === 'todo') {
      // 显示待办清单的逻辑
    } else if (key === 'create') {
      // 创建文档的逻辑
    } else if (key === 'import') {
      // 导入文档的逻辑
    }
  };

  const items = [
    {
      key: 'create',
      label: '创建文档',
      icon: <FileAddOutlined />,
      onClick: handleMenuClick,
    },
    {
      key: 'import',
      label: '导入文档',
      icon: <PlusOutlined />,
      onClick: handleMenuClick,
    },
    {
      key: 'todo',
      label: '待办清单',
      icon: <CheckSquareOutlined />,
      onClick: handleMenuClick,
    },
  ];

  const handleDrag = () => {
    // 在拖动开始时隐藏菜单
    setVisible(false);
  };

  const handleButtonClick = () => {
    // 在点击按钮时显示或隐藏菜单
    setVisible(!visible);
  };

  return (
    <Draggable onDrag={handleDrag} bounds={bounds}>
      <div>
        <Dropdown
          menu={{ items }} // 使用 items 属性传递菜单项
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
