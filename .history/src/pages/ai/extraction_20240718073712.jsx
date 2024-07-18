import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Image, Upload, Card, message, Spin } from 'antd';
import aiFun from '../../api/user/ai';
import { AppstoreOutlined, BorderOuterOutlined, AudioOutlined } from '@ant-design/icons';
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

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => {
            console.error('文件读取失败:', error);
            reject(error);
        };
    });

const Extraction = () => {
    const [current, setCurrent] = useState('ocr');
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [result, setResult] = useState('');

    const onClick = ({ key }) => {
        setCurrent(key);
    };

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            try {
                file.preview = await getBase64(file.originFileObj);
            } catch (error) {
                message.error('预览图片失败');
                return;
            }
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
    };

    const handleChange = async ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setResult('');

        if (newFileList.length > 0) {
            const file = newFileList[0].originFileObj;
            if (!file) {
                console.error('未能获取上传的文件');
                return;
            }

            // 显示上传中的加载状态
            setProcessing(true);

            const formData = new FormData();
            formData.append('file', file);

            try {
                let response;
                switch (current) {
                    case 'ocr':
                        response = await aiFun.ocr(formData);
                        setResult(response.data); // 根据实际返回数据结构调整
                        break;
                    case 'asr':
                        response = await aiFun.asr(formData);
                        setResult(response.data); // 根据实际返回数据结构调整
                        break;
                    case 'table':
                        response = await aiFun.ocrTable(formData);
                        setResult(response.data); // 根据实际返回数据结构调整
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error('请求失败:', error);
                message.error('请求失败，请稍后重试');
            } finally {
                setProcessing(false);
            }
        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>上传文件</div>
        </div>
    );

    return (
        <div className='p-30 w-full'>
            <Menu className="m-b-20" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <div className="first-frame m-b-30" style={{ height: '20px' }}>
                <div className="tip-correction"><strong>信息提取</strong></div>
            </div>
            <div className='flex-c-center-center'>
                <Upload
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    maxCount={1}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                {previewImage && (
                    <Image
                        wrapperStyle={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                            afterClose: () => setPreviewImage(''),
                        }}
                        src={previewImage}
                    />
                )}
            </div>

            <div className="tip-correction m-t-20">
                <strong>提取结果</strong>
            </div>
            <div className='flex-c-center-center'>
                <Card className='m-t-20 shadow' hoverable style={{ width: 300 }}>
                    {processing ? (
                        <div className="flex items-center justify-center" style={{ minHeight: '200px' }}>
                            <Spin size="large" />
                        </div>
                    ) : (
                        <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                            {result || '暂无结果'}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};

export default Extraction;
