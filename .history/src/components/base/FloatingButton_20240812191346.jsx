import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'antd';
import { PlusOutlined, FileAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
  const [showTodoList, setShowTodoList] = useState(false);
  const [todoData, setTodoData] = useState(initialTodoData);
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

    updateBounds();

    window.addEventListener('resize', updateBounds);

    return () => window.removeEventListener('resize', updateBounds);
  }, []);

  const handleMenuClick = ({ key }) => {
    // 处理菜单项的点击逻辑
    if (key === 'todo') {
        // 显示待办清单
        setShowTodoList(true);
      } else {
        // 隐藏待办清单
        setShowTodoList(false);
      }
      setVisible(false); // 关闭菜单
  };
  const handleTodoClick = (listId) => {
    setTodoData(prevData =>
      prevData.map(item =>
        item.listId === listId ? { ...item, isCompleted: 1 } : item
      )
    );
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
    setVisible(false);
  };

  const handleButtonClick = () => {
    setVisible(!visible);
  };

  return (
    <Draggable onDrag={handleDrag} bounds={bounds}>
      <div style={{ position: 'fixed', zIndex: 1000 }}>
        <Dropdown
          menu={{ items }}
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
        {showTodoList && (
          <div style={{ position: 'fixed', bottom: 120, right: 50, width: 300, zIndex: 1000, backgroundColor: 'white', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <List
              header={<div>待办清单</div>}
              bordered
              dataSource={todoData}
              renderItem={item => (
                <List.Item
                  actions={[
                    <Checkbox
                      checked={item.isCompleted === 1}
                      onChange={() => handleTodoClick(item.listId)}
                    >
                      {item.isCompleted === 1 ? "已完成" : "未完成"}
                    </Checkbox>
                  ]}
                >
                  {item.listName}
                </List.Item>
              )}
            />
          </div>
        )}
      </div>
    </Draggable>
  );
};

export default FloatingButton;
