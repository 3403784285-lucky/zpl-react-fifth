import React, { useState } from 'react';
import { Form, Input, Radio, Switch, Button, Card, Modal, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import elementFun from '../../../api/user/element';
import fileFun from '../../../api/user/file';

const UploadMaterialForm = ({ closeModal }) => {
    const [form] = Form.useForm();
    const [materialType, setMaterialType] = useState('text');
    const [materialContent, setmaterialContent] = useState('text');
    const [isPublic, setIsPublic] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const [Image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);


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

    const onFinish = async (values) => {
        console.log('Received values:', values);
        console.log('图片',Image)
        setLoading(true)
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
        await elementFun.upload(requestData);
        setLoading(false)
        message.success("素材上传成功")
        closeModal()

    };

    const handleUrlChange = (e) => {
        const url = e.target.value.trim();
        console.log('变化',url)
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
                fileFun.upload(formData)
                    .then((response) => {
                        console.log('文件上传成功:', response.data);
                        const uploadedUrl = response.data;
                        form.setFieldsValue({ imageUrl: uploadedUrl });
                        setImage(uploadedUrl);
                        console.log('变化ssss',Image)
                    })
                    .catch((error) => {
                        console.error('上传文件出错:', error);
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
        <Card style={{ width: '100%' }}>
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
                    <Button loading={loading} className='w-full' type="primary" htmlType="submit">
                        上传
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default UploadMaterialForm;