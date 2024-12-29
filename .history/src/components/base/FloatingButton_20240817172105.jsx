import React, { useState, useEffect } from 'react';
import { Button, Dropdown, List, Modal,Select,Checkbox, Input, message } from 'antd';
import { PlusOutlined, DeleteOutlined, FolderAddOutlined, FileAddOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import TodoModal from './AddModal';
import Draggable from 'react-draggable';
import toolFun from '../../api/user/toolList';
import { useStorage } from 'web-localstorage-plus';
import { useNavigate } from 'react-router-dom';
import { encrypt } from '../../utils/code';
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
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const storage = useStorage()
    const navigate = useNavigate()
    const [position, setPosition] = useState(storage.getItem("buttonPosition")?JSON.parse(storage.getItem("buttonPosition")):{x:0,y:0});
console.log(position)
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
            if (res.code == 200) {
                setTodoData(res.data)
            }

        }
        fetchData()
        // 读取保存的位置
        
        updateBounds();

        window.addEventListener('resize', updateBounds);

        return () => window.removeEventListener('resize', updateBounds);
    }, []);
   

    const handleDeleteIconClick = async (listId) => {
        const res = await toolFun.delete(listId)
        if (res.code == 200) {
            message.success("删除成功")
            setTodoData(prevData => prevData.filter(item => item.listId !== listId));
        }
    };
    const toggleDeleteIcons = () => {
        setShowDeleteIcons(!showDeleteIcons);
    };
    const handleDoubleClick = (item) => {
        setEditingItemId(item.listId);
        setEditingText(item.listName);
    };

    const handleInputChange = (e) => {
        setEditingText(e.target.value);
    };

    const handleInputBlur = () => {
        saveEdit();

    };

    const handleInputKeyPress = (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        if (!showTodoList) {
            const save = async () => {
                const extractedData = todoData.map(item => ({
                    listId: item.listId,
                    isCompleted: item.isCompleted
                }));
                if (extractedData.length > 0) {
                    const res = await toolFun.updateStatus({ todoListStatusDTOList: extractedData })
                    if (res.code == 200) {
                        message.success("清单保存成功")
                    }
                }


            }
            save()


        }

    }, [showTodoList])


    const saveEdit = async () => {
        const res = await toolFun.update({ listId: editingItemId, listName: editingText })
        if (res.code == 200) {
            message.success("待办项更新成功")
            setTodoData(prevData =>
                prevData.map(item =>
                    item.listId === editingItemId ? { ...item, listName: editingText } : item
                )
            );
        }


        setEditingItemId(null);
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
const handleCreateClick=()=>{
    setIsModalOpen(true)
}

    const items = [
        {
            key: 'create',
            label: '创建文档',
            icon: <FileAddOutlined />,
            onClick: handleCreateClick,
        },
       
        {
            key: 'todo',
            label: '待办清单',
            icon: <CheckSquareOutlined />,
            onClick: handleMenuClick,
        },
    ];
    

    const handleDrag = (e) => {
        setVisible(false);
        setShowTodoList(false);
        
    };
    const showModal = () => {
        setIsVisible(true);
    };
    const toDocument = (record) => {
        navigate(`/big-editor?` + encrypt(record.documentId))
    }

    const handleButtonClick = () => {
        setVisible(!visible);
    };
    const handleDragStop = (e) => {
        setPosition({ x: e.x, y: e.y });
        console.log(e)
        storage.setItem('buttonPosition', JSON.stringify({ x: e.x, y: e.y }));
    };
    return (
        <Draggable onDrag={handleDrag} bounds={bounds}  onStop={handleDragStop}>
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
                <Modal title="新建" visible={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} width={300}>
                        <div className="flex">
                            <div className="model m-r-10 p-x-10 p-y-6 b-rd-6" style={{ backgroundColor:  '#c7d2d3'  }} >
                                <IconFont className='font-size-vlg ' type="icon-wendang" />
                                <p>文档</p>
                            </div>
                            <div className="model m-r-20 p-x-10 p-y-6 b-rd-6" style={{ backgroundColor: 'white' }} >
                                <IconFont className='font-size-vlg' type="icon-shangchuan" />
                                <input  accept=".md,.docx"  type="file"  style={{ display: 'none' }} />
                                <p>导入</p>
                            </div>
                        </div>
                        <h4 className='m-t-10 m-b-6'>文档类型</h4>
                        <Select
                            maxTagCount={1}
                            placeholder="暂时只能导入word和md文档哦"
                            mode="tags"
                            style={{ width: '100%' }}
                            maxCount={1}
                        />
                        <h4 className='m-t-10 m-b-6'>学科类型</h4>
                        <Select
                            maxTagCount={1}
                            mode="tags"
                            maxCount={1}
                            defaultValue={'理科'}
                            style={{ width: '100%' }}
                        />
                        <Button className='w-full m-y-10 b-rd-16' type='primary' >确认</Button>
                        <Button className='w-full m-y-5 b-rd-16 bg-color-grey text-color-white' >取消</Button>
                    </Modal>

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
                                    ) : (<div className='text-ellipsis' onClick={()=>toDocument(item)}>{item.listName}</div>

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
