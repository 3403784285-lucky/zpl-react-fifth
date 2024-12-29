import React, { useState } from 'react';
import { Button, Menu, Dropdown, List, Checkbox } from 'antd';
import { PlusOutlined, FileAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';

const initialTodoData = [
  { listId: 1, userId: 1, listName: "完成文档编写", isCompleted: 0 },
  { listId: 2, userId: 1, listName: "代码审查", isCompleted: 0 },
  { listId: 3, userId: 1, listName: "测试任务", isCompleted: 0 }
];

const FloatingButton = () => {
  const [visible, setVisible] = useState(false);
  const [showTodoList, setShowTodoList] = useState(false);
  const [todoData, setTodoData] = useState(initialTodoData);

  const handleMenuClick = ({ key }) => {
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

  return (
    <Draggable bounds="window">
      <div style={{ position: 'fixed', zIndex: 1000 }}>
        <Dropdown
          menu={menu}
          trigger={['click']}
          onOpenChange={(flag) => setVisible(flag)}
          open={visible}
        >
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            size="large"
            style={{
              position: 'fixed',
              bottom: 50,
              right: 50,
              zIndex: 1000,
            }}
          />
        </Dropdown>

        {/* 待办清单列表 */}
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
