import React, { useState } from 'react';
import { Form, Input, Radio, Switch, Button, message, Card, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const UploadMaterialForm = () => {
    const [form] = Form.useForm();
    const [materialType, setMaterialType] = useState('text');
    const [isPublic, setIsPublic] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);

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

    const onFinish = (values) => {
        console.log('Received values:', values);
        // 处理提交逻辑
        // 在这里调用handleUpload(values)上传逻辑
    };

    const handleUrlChange = (e) => {
        const url = e.target.value.trim();
        setImageUrl(url);
        form.setFieldsValue({ imageUrl: url });
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
            getBase64(file).then((imageUrl) => {
                setImageUrl(imageUrl);
                form.setFieldsValue({ imageUrl: imageUrl });
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
        <Card  style={{ width: '90%' }}>
            <Form
                form={form}
                onFinish={onFinish}
                layout="vertical"
                initialValues={{
                    isPublic: isPublic,
                    materialType: materialType,
                }}
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

         
                    <Button type="primary" className='w-full' htmlType="submit">
                        上传
                    </Button>
                
            </Form>
        </Card>
    );
};

export default UploadMaterialForm;