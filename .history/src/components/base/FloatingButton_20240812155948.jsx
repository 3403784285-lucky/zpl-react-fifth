import React, { useState } from 'react';
import { Button, Menu, Dropdown, List } from 'antd';
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

    const menu =[
        {
            key:"create",
            icon:<FileAddOutlined />,
            value:'创建文档'

        },
        {
            key:"import",
            icon:<PlusOutlined />,
            value:'导入文档'

        },
   
        {
            key:"todo",
            icon:<CheckSquareOutlined />,
            value:'代办清单'

        },

        






    ] 

    return (
        <Draggable>
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
        </Draggable>
    );
};

export default FloatingButton;
