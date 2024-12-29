import React, { useState, useEffect } from 'react';
import { Button, Dropdown, List, Checkbox, Input, message } from 'antd';
import { PlusOutlined, DeleteOutlined, FolderAddOutlined, FileAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
import TodoModal from './AddModal';
import Draggable from 'react-draggable';
import toolFun from '../../api/user/toolList';

const initialTodoData = [];
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
    const [editingItemId, setEditingItemId] = useState(null);
    const [editingText, setEditingText] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateBounds = () => {
            const { innerWidth, innerHeight } = window;
            setBounds({
                left: 0,
                top: 0,
                right: innerWidth - 50,
                bottom: innerHeight - 50,
            });
        };

        const fetchData = async () => {
            const res = await toolFun.getList();
            if (res.code === 200) {
                setTodoData(res.data);
            }
        };
        fetchData();

        updateBounds();

        // 读取保存的位置
        const savedPosition = JSON.parse(localStorage.getItem('buttonPosition'));
        if (savedPosition) {
            setPosition(savedPosition);
        }

        window.addEventListener('resize', updateBounds);

        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    const handleDrag = (e, data) => {
        setPosition({ x: data.x, y: data.y });
        setVisible(false);
        setShowTodoList(false);
    };

    const handleStop = () => {
        // 保存当前位置到 localStorage
        localStorage.setItem('buttonPosition', JSON.stringify(position));
    };

    const showModal = () => {
        setIsVisible(true);
    };

    const handleButtonClick = () => {
        setVisible(!visible);
    };

    return (
        <Draggable
            onDrag={handleDrag}
            onStop={handleStop}
            bounds={bounds}
            position={position} // 设置按钮位置
        >
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
                            header={<div className='flex-r-start-center' style={{ justifyContent: 'space-between' }}>
                                待办清单

                                <div>
                                    <FolderAddOutlined onClick={showModal} style={{ cursor: 'pointer', marginRight: 10 }} />
                                    <DeleteOutlined
                                        style={{ cursor: 'pointer' }}
                                        onClick={toggleDeleteIcons}
                                    />
                                </div>
                            </div>}
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
                                    onDoubleClick={() => handleDoubleClick(item)}
                                >
                                    {editingItemId === item.listId ? (
                                        <Input
                                            value={editingText}
                                            onChange={handleInputChange}
                                            onBlur={handleInputBlur}
                                            onPressEnter={handleInputKeyPress}
                                            autoFocus
                                        />
                                    ) : (<div className='text-ellipsis'>{item.listName}</div>

                                    )}
                                </List.Item>
                            )}
                        />
                    </div>
                )}
                <TodoModal visible={isVisible} setVisible={setIsVisible} todoData={todoData} setTodoData={setTodoData} />
            </div>
        </Draggable>
    );
};

export default FloatingButton;
