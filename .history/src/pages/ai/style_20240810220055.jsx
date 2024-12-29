
import React, { useState } from 'react';
import { List, Modal, Button, Card, Select, Form, Row, Col, Input } from 'antd';

function Style() {
    const [visible, setVisible] = useState(false);
    const [visibleCopy, setVisibleCopy] = useState(false);
    const [styleName, setStyleName] = useState('');

    const showModal = () => {
        setVisible(true);
    };
    const showModalCopy = () => {
        setVisibleCopy(true);
    };
    const handleOk = () => {
        if (styleName.length >= 3 && styleName.length <= 5) {
            // 处理新样式的创建逻辑
            message.success(`样式"${styleName}"创建成功!`);
            setVisible(false);
            setStyleName('');
        } else {
            message.error('样式名称长度必须为3到5个字');
        }
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const renderFontSettings = () => (
        <div>
            <Modal
                title="创建新样式"
                open={visibleCopy}
                closable={true}
                okText="确定"
                cancelText="取消"
            >
                <Form>
                    <Form.Item
                        label="样式名称"
                        rules={[{ required: true, message: '请输入样式名称' }]}
                    >
                        <Input
                            value={styleName}
                            onChange={(e) => setStyleName(e.target.value)}
                            maxLength={5}
                            placeholder="请输入3到5个字"
                        />
                    </Form.Item>
                    {['字体类型', '字号', '行高'].map((label, index) => (
                        <Row key={index} gutter={[16, 16]}>
                            <Col span={6}>{label}</Col>
                            <Col span={18}>
                                <Select defaultValue={label === '字体类型' ? 'Inter' : '16'}>
                                    {label === '字体类型' && <Option value="Inter">Inter</Option>}
                                    {label === '字号' && (
                                        <>
                                            <Option value="16">16</Option>
                                            <Option value="18">18</Option>
                                            <Option value="20">20</Option>
                                        </>
                                    )}
                                    {label === '行高' && (
                                        <>
                                            <Option value="1.5">1.5</Option>
                                            <Option value="1.75">1.75</Option>
                                            <Option value="2">2</Option>
                                        </>
                                    )}
                                </Select>
                            </Col>
                        </Row>
                    ))}
                </Form>
            </Modal>
            {['一级标题', '二级标题', '三级标题', '正文'].map((item, index) => (
                <Row key={index} gutter={[16, 16]}>
                    <Col span={6}>{item}</Col>
                    <Col span={6}>
                        <Select defaultValue="Inter">
                            <Option value="Inter">Inter</Option>
                            {/* Add more font options if needed */}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select defaultValue="16">
                            <Option value="16">16</Option>
                            {/* Add more size options if needed */}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select defaultValue="1.5">
                            <Option value="1.5">1.5</Option>
                            {/* Add more line height options if needed */}
                        </Select>
                    </Col>
                </Row>
            ))}
            <div style={{ marginTop: 24 }}>
                <Button type="primary" onClick={handleOk} style={{ marginRight: 8 }}>
                    应用
                </Button>
                <Button onClick={handleCancel}>重置</Button>
            </div>
        </div>
    );


    return <div className="flex-c-center-center m-20">
        <Button onClick={showModalCopy}>创建新样式</Button>
        <div className='m-t-20'>
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={['样式一是什', '样式二', '样式三', '样式四']}
                renderItem={(item) => (
                    <List.Item>
                        <Card className='flex-r-center-center' style={{ height: 100 }} hoverable onClick={showModal}>
                            <div className='flex-c-center-center text-ellipsis' style={{ width: '100px', height: '100%' }}>{item}</div>
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title="文字样式"
                open={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                {renderFontSettings()}
            </Modal>
        </div>



    </div>
}

export default Style;

