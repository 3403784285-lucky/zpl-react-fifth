

import React, { useState } from 'react';
import { Form, Input, Radio, Switch, Button, Card, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import request from "umi-request";
import elementFun from '../../../api/user/element';

const UploadMaterialForm = () => {
    const [form] = Form.useForm();
    const [materialType, setMaterialType] = useState('text');
    const [materialContent, setmaterialContent] = useState('text');
    const [isPublic, setIsPublic] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [Image, setImage] = useState(null);

    const handleMaterialTypeChange = (e) => {
        const type = e.target.value;
        setMaterialType(type);
        setImageUrl('');
        setPreviewImage(null);
        form.setFieldsValue({ imageUrl: '', materialContent: '' });
    };

    const handlePublicChange = (checked) => {
        setIsPublic(checked);
    };

    const onFinish = async(values) => {
        console.log('Received values:', values);
        if (materialType === 'text') {
            values.materialContent = values.materialContent;
        } else if (materialType === 'image') {
            values.materialContent = Image;
        }
        const requestData = {
            name: values.materialName,
            content: values.materialContent,
            type: materialType,
            userId: 1,
            isPublic: values.isPublic ? 0 : 1,
        };
        console.log('Values to be submitted:', requestData);

        // 发送上传素材请求
        try {
             await elementFun.upload(requestData)
        } catch {


        } finally {
            console.error('上传素材时出错:', error);
            message.error('上传失败');
        }




    };

    const handleUrlChange = (e) => {
        const url = e.target.value.trim();
        setImageUrl(url);
        form.setFieldsValue({ imageUrl: url });
        form.setFieldsValue({ materialContent: url });
        setImage(url);
    };

    const handlePreview = (url) => {
        setPreviewImage(url);
        setPreviewVisible(true);
    };

    const handleCancelPreview = () => {
        setPreviewVisible(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            getBase64(file).then((base64Data) => {
                setImageUrl(base64Data);

                const formData = new FormData();
                formData.append('file', file);

                axios.post('http://localhost:8085/files/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                    .then((response) => {
                        console.log('文件上传成功:', response.data.data);

                        const uploadedUrl = response.data.data;

                        form.setFieldsValue({ imageUrl: uploadedUrl });
                        setImage(uploadedUrl);

                        // 确认字段已更新
                        setTimeout(() => {
                            console.log('内容', form.getFieldValue('materialContent'));
                        }, 100);
                    })
                    .catch((error) => {
                        console.error('上传文件时出错:', error);
                    });

            });
        }
    };


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    return (
        <Card title="上传素材" style={{ width: '100%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    isPublic: isPublic,
                    materialType: materialType,
                }}
                encType="multipart/form-data"
            >
                <Form.Item
                    label="素材名称"
                    name="materialName"
                    rules={[{ required: true, message: '请输入素材名称！' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="素材种类"
                    name="materialType"
                    rules={[{ required: true, message: '请选择素材种类！' }]}
                >
                    <Radio.Group onChange={handleMaterialTypeChange}>
                        <Radio.Button value="text">文本</Radio.Button>
                        <Radio.Button value="image">图片</Radio.Button>
                    </Radio.Group>
                </Form.Item>

                {materialType === 'text' ? (
                    <Form.Item
                        label="素材内容 (文本)"
                        name="materialContent"
                        rules={[{ required: true, message: '请输入素材内容！' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                ) : (
                    <>
                        {!imageUrl && (
                            <Form.Item label="图片URL" name="imageUrl">
                                <Input onChange={handleUrlChange} value={imageUrl} />
                            </Form.Item>
                        )}
                        {imageUrl && (
                            <div style={{ marginTop: '16px' }}>
                                <img
                                    src={imageUrl}
                                    alt="预览图片"
                                    style={{ maxWidth: '300px', maxHeight: '300px', cursor: 'pointer' }}
                                    onClick={() => handlePreview(imageUrl)}
                                />
                            </div>
                        )}
                        {previewVisible && (
                            <Modal visible={previewVisible} footer={null} onCancel={handleCancelPreview}>
                                <img alt="预览" style={{ width: '100%' }} src={previewImage} />
                            </Modal>
                        )}
                        {materialType === 'image' && !imageUrl && (
                            <Form.Item label="上传图片">
                                <input type="file" accept="image/!*" onChange={handleFileChange} />
                            </Form.Item>
                        )}
                    </>
                )}

                <Form.Item label="是否对外公开" name="isPublic" valuePropName="checked">
                    <Switch onChange={handlePublicChange} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        上传
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UploadMaterialForm;