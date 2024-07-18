import React, { useState } from 'react';
import { PlusOutlined, AppstoreOutlined, BorderOuterOutlined, AudioOutlined, LoadingOutlined } from '@ant-design/icons';
import { Menu, Upload, Card, message, Button } from 'antd';
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
    const [recognitionResult, setRecognitionResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleMenuClick = (e) => {
        setCurrent(e.key);
        setFileList([]);
        setRecognitionResult('');
        setPreviewImage('');
    };

    const handleChange = async (info) => {
        let newFileList = [...info.fileList];

        // Limit the number of uploaded files
        newFileList = newFileList.slice(-1);

        // Read from response and show file link
        newFileList = newFileList.map(file => {
            if (file.response) {
                // Component will show file.url as link
                file.url = file.response.url;
            }
            return file;
        });

        setFileList(newFileList);

        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }

        if (info.file.status === 'done') {
            const file = info.file.originFileObj;
            const formData = new FormData();
            formData.append('file', file);

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
                            return;
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
            } catch (error) {
                console.error('请求失败:', error);
                message.error('请求失败，请重试');
                setLoading(false);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败.`);
            setLoading(false);
        }
    };

    const uploadProps = {
        accept: current === 'asr' ? '.wav' : 'image/*',
        fileList,
        beforeUpload: () => false,
        onChange: handleChange,
        maxCount: 1,
    };

    const uploadButton = (
        <Button icon={<PlusOutlined />}>选择文件</Button>
    );

    return (
        <div className='p-30 w-full'>
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
                    <Card className="m-t-20 shadow" hoverable style={{ width: 300 }}>
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
                    <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                        {loading ? '' : (recognitionResult.text || '')}
                    </div>
                    {recognitionResult.ocrImage && (
                        <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                            <img alt="OCR Result" style={{ width: '100%' }} src={recognitionResult.ocrImage} />
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Extraction;
