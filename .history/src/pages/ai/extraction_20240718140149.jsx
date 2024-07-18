import React, { useState } from 'react';
import { PlusOutlined, AppstoreOutlined, BorderOuterOutlined, AudioOutlined, LoadingOutlined } from '@ant-design/icons';
import { Menu, Card, message } from 'antd';
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

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (!file) {
            message.error('未选择文件');
            return;
        }

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

            // 如果是图片识别，生成预览图
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
    };

    return (
        <div className='p-30 w-full'>
            <Menu className="m-b-20" onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal" items={items} />

            <div className="first-frame m-b-30" style={{ height: '20px' }}>
                <div className="tip-correction"><strong>信息提取</strong></div>
            </div>

            <div className='flex-c-center-center'>
                <input type="file" accept={current === 'asr' ? '.wav' : 'image/*'} onChange={handleFileChange} />
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
