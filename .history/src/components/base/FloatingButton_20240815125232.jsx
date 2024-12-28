import React, { useState, useEffect } from 'react';
import { Button, Dropdown, List, Checkbox, Input, message } from 'antd';
import { PlusOutlined, DeleteOutlined, FolderAddOutlined, FileAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
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
    const [editingItemId, setEditingItemId] = useState(null); // 当前正在编辑的待办项ID
    const [editingText, setEditingText] = useState(''); // 当前编辑中的文本
    const [isVisible, setIsVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

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

        const fetchData = async () => {
            const res = await toolFun.getList();
            if (res.code === 200) {
                setTodoData(res.data);
            }
        };

        fetchData();

        // 读取保存的位置
        const savedPosition = localStorage.getItem('buttonPosition');
        if (savedPosition) {
            setPosition(JSON.parse(savedPosition));
        }

        updateBounds();

        window.addEventListener('resize', updateBounds);

        return () => window.removeEventListener('resize', updateBounds);
    }, []);

    const handleDragStop = (e, data) => {
        setPosition({ x: data.x, y: data.y });
        localStorage.setItem('buttonPosition', JSON.stringify({ x: data.x, y: data.y }));
    };

    return (
        <Draggable
            bounds={bounds}
            position={position}
            onStop={handleDragStop}
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
                        onClick={() => setVisible(!visible)}
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
                        {/* 渲染待办清单 */}
                    </div>
                )}
                <TodoModal visible={isVisible} setVisible={setIsVisible} todoData={todoData} setTodoData={setTodoData} />
            </div>
        </Draggable>
    );
};

export default FloatingButton;
