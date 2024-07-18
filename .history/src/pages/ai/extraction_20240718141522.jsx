import React, { useState, useEffect } from 'react';
import { PlusOutlined, AppstoreOutlined, BorderOuterOutlined, AudioOutlined, LoadingOutlined, FileAddOutlined } from '@ant-design/icons';
import { Menu, Upload, Card, message, Button, Modal ,message} from 'antd';
import aiFun from '../../api/user/ai';

const items = [
    {
        label: 'OCR图片识别',
        key: 'ocr',
        icon: <BorderOuterOutlined />,
    },
    {
        label: 'ASR语音识别',
        key: 'asr',
        icon: <AudioOutlined />,
    },
    {
        label: '表格识别',
        key: 'table',
        icon: <AppstoreOutlined />,
    },
];

const Extraction = () => {
    const [current, setCurrent] = useState('ocr');
    const [previewImage, setPreviewImage] = useState('');
    const [recognitionResult, setRecognitionResult] = useState({ message: '', text: '', ocrImage: '' });
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [animatedText, setAnimatedText] = useState('');

    const handleMenuClick = (e) => {
        setCurrent(e.key);
        setFileList([]);
        setRecognitionResult({ message: '', text: '', ocrImage: '' });
        setPreviewImage('');
        setAnimatedText('');
    };

    const handleChange = ({ file }) => {
        if (file.status === 'removed') {
            setFileList([]);
            setPreviewImage('');
            setRecognitionResult({ message: '', text: '', ocrImage: '' });
        }
    };

    const beforeUpload = async (file) => {
        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            let response;
            switch (current) {
                case 'ocr':
                    response = await aiFun.ocr(formData);
                    break;
                case 'asr':
                    if (file.type !== 'audio/wav') {
                        message.error('语音识别只支持.wav格式的文件');
                        setLoading(false);
                        return false;
                    }
                    response = await aiFun.asr(formData);
                    break;
                case 'table':
                    response = await aiFun.ocrTable(formData);
                    break;
                default:
                    break;
            }

            setRecognitionResult(response.data);
            setLoading(false);

            if (current === 'ocr' || current === 'table') {
                const reader = new FileReader();
                reader.onload = () => setPreviewImage(reader.result);
                reader.readAsDataURL(file);
            }

            setFileList([file]);
            animateText(response.data.text); // 启动逐字动画
        } catch (error) {
            console.error('请求失败:', error);
            message.error('请求失败，请重试');
            setLoading(false);
        }

        return false; // Prevent default upload behavior
    };

    const animateText = (text) => {
        let index = 0;
        const intervalId = setInterval(() => {
            setAnimatedText(prev => prev + text[index]);
            index++;
            if (index === text.length) {
                clearInterval(intervalId);
            }
        }, 100); // Adjust speed of animation here (milliseconds)
    };

    const handleIconClick = () => {
        console.log('已点击');
    };

    const uploadProps = {
        accept: current === 'asr' ? '.wav' : 'image/*',
        fileList,
        beforeUpload,
        onChange: handleChange,
        maxCount: 1,
    };

    const uploadButton = (
        <Button icon={<PlusOutlined />}>选择文件</Button>
    );

    return (
        <div className='p-30 w-full h-full' style={{ overflowY: 'auto' }}>
            <Menu className="m-b-20" onClick={handleMenuClick} selectedKeys={[current]} mode="horizontal" items={items} />

            <div className="first-frame m-b-30" style={{ height: '20px' }}>
                <div className="tip-correction"><strong>信息提取</strong></div>
            </div>

            <div className='flex-c-center-center'>
                <Upload {...uploadProps}>
                    {uploadButton}
                </Upload>
                {loading && <LoadingOutlined style={{ fontSize: 24, color: '#1890ff', marginLeft: 16 }} spin />}
                {previewImage && (
                    <Card className="m-t-20 shadow" hoverable style={{ width: 300 }} onClick={() => setIsModalVisible(true)}>
                        <img alt="preview" style={{ width: '100%' }} src={previewImage} />
                    </Card>
                )}
            </div>

            <div className="tip-correction m-t-20">
                <strong>提取结果</strong>
            </div>

            <div className='flex-c-center-center'>
                <Card className='m-t-20 shadow' hoverable style={{ width: 300 }}>
                    <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                        {loading ? '正在生成中...' : (recognitionResult.message || '暂无结果')}
                    </div>
                    <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word', alignItems: 'center' }}>
                        {loading ? '' : animatedText}
                        {!loading && recognitionResult.text && <FileAddOutlined onClick={handleIconClick} style={{ marginLeft: 8, cursor: 'pointer' }} />}
                    </div>
                    {recognitionResult.ocrImage && (
                        <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                            <img alt="OCR Result" style={{ width: '100%' }} src={recognitionResult.ocrImage} onClick={() => setIsModalVisible(true)} />
                        </div>
                    )}
                </Card>
            </div>

            <Modal visible={isModalVisible} footer={null} onCancel={() => setIsModalVisible(false)}>
                <img alt="preview" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
};

export default Extraction;
