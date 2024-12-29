
import React, { useState } from 'react';
import { List, Modal, Button, Card, Select, Row, Col } from 'antd';

function Style() {
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };
    const renderFontSettings = () => (
        <div>
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
        <Button>创建新样式</Button>
        <div className='m-t-20'>
            <List
                grid={{ gutter: 16, column: 2 }}
                dataSource={['样式一11111111155555555555', '样式二', '样式三', '样式四']}
                renderItem={(item) => (
                    <List.Item>
                        <Card className='flex-r-center-center' style={{height:100}} hoverable onClick={showModal}>
                            <div className=' p-20 text-ellipsis' style={{width:'120px',height:'100%'}}>{item}</div>
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title="文字样式"
                visible={visible}
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

