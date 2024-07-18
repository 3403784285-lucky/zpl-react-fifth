import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Image, Upload, Card, message } from 'antd';
import aiFun from '../../api/user/ai';
const items = [
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },
    {
        label: 'Navigation Two',
        key: 'app',
        icon: <AppstoreOutlined />,
    },
   
];
const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => {
            console.error('Error reading file:', error);
            reject(error);
        };
    });

const Extraction = () => {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState([]);
    const [ocrResult, setOcrResult] = useState('');

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

        if (newFileList.length > 0) {
            const file = newFileList[0].originFileObj;
            console.log(file + "youwenjian")
            if (!file) {
                console.error('未能获取上传的文件');
                return;
            }

            // // 检查文件类型和大小（假设大小限制为 5MB）
            // const isValidType = file.type === 'image/jpeg' || file.type === 'image/png';
            // const isValidSize = file.size / 1024 / 1024 < 5;

            // if (!isValidType) {
            //     console.error('只支持 JPG/PNG 格式的图片');
            //     return;
            // }
            // if (!isValidSize) {
            //     console.error('图片大小不能超过 5MB');
            //     return;
            // }

            const formData = new FormData();
            formData.append('file', file);


            const response = await aiFun.asr(formData);
            console.log(response.data)
            setOcrResult(response.data);  // 根据实际返回数据结构调整


        }
    };

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
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
                            afterOpenChange: (visible) => !visible && setPreviewImage(''),
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
                    <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                        {ocrResult || '暂无结果'}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Extraction;
