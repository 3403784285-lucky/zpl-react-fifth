import React, { useState, useEffect } from 'react';
import { Button, Dropdown, List, Checkbox } from 'antd';
import { PlusOutlined, DeleteOutlined,FileAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';

import Draggable from 'react-draggable';
const initialTodoData = [
    { listId: 1, userId: 1, listName: "完成文档编写111", isCompleted: 0 },
    { listId: 2, userId: 1, listName: "代码审查", isCompleted: 0 },
    { listId: 3, userId: 1, listName: "测试任务", isCompleted: 0 }
];
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
    ],
});
const FloatingButton = () => {
    const [visible, setVisible] = useState(false);
    const [bounds, setBounds] = useState({ left: 0, top: 0, right: 0, bottom: 0 });
    const [showTodoList, setShowTodoList] = useState(false);
    const [todoData, setTodoData] = useState(initialTodoData);
    const [showDeleteIcons, setShowDeleteIcons] = useState(false);
    const [editingItemId, setEditingItemId] = useState(null); // 当前正在编辑的待办项ID
    const [editingText, setEditingText] = useState(''); // 当前编辑中的文本
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

    const handleDeleteIconClick = (listId) => {
        setTodoData(prevData => prevData.filter(item => item.listId !== listId));
    };
    const toggleDeleteIcons = () => {
        setShowDeleteIcons(!showDeleteIcons);
    };

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
                item.listId === listId
                    ? { ...item, isCompleted: item.isCompleted === 1 ? 0 : 1 }
                    : item
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
        setShowTodoList(false);
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
                        className='shadow'
                        shape="circle"
                        icon={<IconFont type="icon-dangao" className='font-size-lg' />}
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
                    <div style={{ position: 'fixed', bottom: 120, right: 50, width: 320, zIndex: 1000, backgroundColor: 'white', padding: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        <List
                            header={<div className='flex-r-start-center' style={{justifyContent:'space-between'}}>待办清单 <DeleteOutlined
                                style={{ float: 'right', cursor: 'pointer' }}
                                onClick={toggleDeleteIcons}
                            /></div>}
                            bordered
                            dataSource={todoData}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        showDeleteIcons && (
                                            <DeleteOutlined
                                              onClick={() => handleDeleteIconClick(item.listId)}
                                              style={{ color: 'red', cursor: 'pointer' }}
                                            />
                                          ),
                                        <Checkbox
                                            checked={item.isCompleted === 1}
                                            onChange={() => handleTodoClick(item.listId)}
                                        >
                                            {item.isCompleted === 1 ? "已完成" : "未完成"}
                                        </Checkbox>
                                    ]}
                                    style={{
                                        textDecoration: item.isCompleted === 1 ? 'line-through' : 'none',
                                        color: item.isCompleted === 1 ? 'gray' : 'black'
                                    }}
                                >
                                    <div className='text-ellipsis'>{item.listName}</div>
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
