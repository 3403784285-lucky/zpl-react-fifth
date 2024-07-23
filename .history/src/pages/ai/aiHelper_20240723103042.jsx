import React, { useState } from 'react';
import { Input, Button, Upload, List, Typography, Tooltip, message } from 'antd';
import { UploadOutlined, SendOutlined, CopyOutlined } from '@ant-design/icons';
import aiFun from '../../api/user/ai';
import fileFun from '../../api/user/file';
const AiHelper = () => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [fileList, setFileList] = useState([]);
    const [link, setLink] = useState('');
    const [content, setContent] = useState('');

    const handleSend = async () => {
        if (inputValue || fileList.length) {
            const newMessage = {
                content: inputValue,
                files: fileList,
                sender: 'user',
            };
            const pendingMessage = {
                content: '回答生成中...',
                files: [],
                sender: 'assistant',
                status: 'pending',
            };
            setMessages([...messages, newMessage, pendingMessage]);
            setInputValue('');
            setFileList([]);

            // Simulate a response after 2 seconds
            let formData = new FormData()
            formData.append("problem", inputValue)
            formData.append("document", link)
            const res = await aiFun.aiDocumentAssistant(formData)
            console.log(res+"哈哈哈")
            if (res.code == 200) {
                setMessages(prevMessages =>
                    prevMessages.map((msg, index) =>
                        index === prevMessages.length - 1 ? {
                            ...msg,
                            content: res.data,
                            status: 'answered'
                        } : msg
                    )
                );
            }


        }
    };
    const copyToClipboard = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    message.success('内容已复制到剪切板');
                })
                .catch(err => {
                    message.error('复制失败');
                });
        } else {
            // 备用方案：使用传统的 document.execCommand 方法
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                message.success('内容已复制到剪切板');
            } catch (err) {
                message.error('复制失败');
            }
            document.body.removeChild(textArea);
        }
    };

    const handleCopyText = (text) => {

        copyToClipboard(text);
    };



    const handleFileChange = async (e) => {
        setFileList(e.fileList)
        const file = e.fileList[0].originFileObj;
        if (file) {

            const formData = new FormData();
            formData.append('file', file);
            const response = await fileFun.upload(formData)
            if (response.code == 200) {
                console.log('文件上传成功:', response.data);
                setLink(response.data);

            };
        }


    };

    return (
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <Upload
                className='flex-c-center-center'
                fileList={fileList}
                onChange={handleFileChange}
                beforeUpload={() => false}
                multiple
                style={{ marginBottom: 10 }}
            >
                <Button icon={<UploadOutlined />}>选择文件</Button>
            </Upload>
            <List
                style={{ flexGrow: 1, overflowY: 'auto', marginBottom: 20 }}
                dataSource={messages}
                renderItem={(item) => (
                    <List.Item style={{ justifyContent: item.sender === 'user' ? 'flex-end' : 'flex-start' }}>
                        <div className={`message-box ${item.sender === 'user' ? 'user-message' : 'assistant-message'}`}>
                            <Typography.Text className={item.status === 'pending' ? 'pending-text' : ''}>
                                {item.status === 'answered' ? (
                                    <TypingAnimation content={item.content} />
                                ) : (
                                    item.content
                                )}
                            </Typography.Text>
                            {item.status === 'answered' && item.sender === 'assistant' && (
                                <Tooltip title="Copy">
                                    <CopyOutlined
                                        onClick={() => handleCopyText(item.content)}
                                        style={{ position: 'absolute', bottom: 5, right: 5, cursor: 'pointer', color: 'white' }}
                                    />
                                </Tooltip>
                            )}
                            {item.files.length > 0 && (
                                <div>
                                    {item.files.map((file, index) => (
                                        <div key={index}>{file.name}</div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </List.Item>
                )}
            />
            <Input.Group compact style={{ display: 'flex', maxWidth: 600, margin: 'auto' }}>
                <Input
                    style={{ flex: 1 }}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="输入消息"
                />
                <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>
                    发送
                </Button>
            </Input.Group>
        </div>
    );
};

const TypingAnimation = ({ content }) => {
    const [displayContent, setDisplayContent] = useState('');

    // Simulate typing animation
    useState(() => {
        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= content.length) {
                setDisplayContent(content.substring(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Adjust typing speed here

        return () => clearInterval(interval);
    }, [content]);

    return <>{displayContent}</>;
};

export default AiHelper;
