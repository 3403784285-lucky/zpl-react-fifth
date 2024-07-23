import React, { useEffect, useState } from 'react';
import { Layout, Menu, List, Button, message } from 'antd';
import fileFun from '../../../api/user/file.js';
import { encrypt } from '../../../utils/code.js';

const { Sider, Content } = Layout;

const RichTextEditor = ({ documentId ,setMark}) => {
    const [historyItems, setHistoryItems] = useState([]);
    const [selectedContent, setSelectedContent] = useState('');
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null); // 新增选中项状态

    useEffect(() => {
        const fetchHistoryItems = async (documentId) => {
            try {
                const response = await fileFun.getDocumentVersion(documentId);
                console.log(response);
                if (response.data) {
                    setHistoryItems(response.data);
                    if (response.data.length > 0) {
                        setSelectedContent(response.data[0].content);
                        setSelectedVersion(response.data[0]);
                        setSelectedItem(response.data[0]); // 默认选中第一项
                    }
                } else {
                    throw new Error('Failed to fetch history items');
                }
            } catch (error) {
                console.error('Error fetching history items:', error);
            }
        };

        fetchHistoryItems(documentId);

    }, [documentId]);

    const handleItemClick = (item) => {
        setSelectedContent(item.content);
        setSelectedVersion(item);
        setSelectedItem(item); // 更新选中项状态
    };

    const handleRestoreClick = async () => {
        try {
            if (!selectedVersion) {
                throw new Error('No version selected');
            }

            const response = await fileFun.rollbackDocumentVersion(selectedVersion.documentId, selectedVersion.id);

            if (response.data) {
                message.success('版本回退成功');
                console.log('Restored Version:', selectedVersion);

            } else {
                message.error('版本回退失败');
            }
        } catch (error) {
            console.error('版本回退请求失败:', error);
            message.error('版本回退请求失败');
        }
    };

    return (
        <Layout style={{ height: '100%', display: 'flex' }}>
            <Sider width={300} style={{ background: '#fff', overflowY: 'auto' }}>
                <Menu mode="inline" style={{ height: '100%', borderRight: 0 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={historyItems}
                        renderItem={item => (
                            <List.Item
                                onClick={() => handleItemClick(item)}
                                style={{ background: selectedItem === item ? '#e6f7ff' : '#fff' }} // 根据选中状态设置背景色
                            >
                                <List.Item.Meta className='p-10'
                                    title={<span>{item.updateTime}</span>}
                                    description={<span>{item.username} - {item.version}</span>}
                                />
                            </List.Item>
                        )}
                    />
                </Menu>
            </Sider>
            <Content style={{ padding: '24px', width: '100%', height:'300px', overflowY: 'auto' }}>
                <Button
                    type="primary"
                    style={{ position: 'absolute', top: '20px', right: '50px' }}
                    onClick={handleRestoreClick}
                >
                    恢复此版本
                </Button>
                <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', backgroundColor: '#fff', width: '100%', height: 'calc(100vh - 48px)', overflowY: 'auto' }}>
                    <div dangerouslySetInnerHTML={{ __html: selectedContent }} />
                </div>
            </Content>
        </Layout>
    );
};

export default RichTextEditor;
