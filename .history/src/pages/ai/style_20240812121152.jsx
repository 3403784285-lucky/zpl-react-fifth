
import React, { useEffect, useState } from 'react';
import { List, Modal, Button, Card, Select, Form, Row, Col, Input, message } from 'antd';
import { createFromIconfontCN, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import styleFun from '../../api/user/style';
import { useStorage } from 'web-localstorage-plus';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_o1tzykmllrg.js'
    ],
});
let settings = [
    {
        "id": 1,
        "stylesId": 1,
        "name": "一级标题",
        "fontFamily": "Inter",
        "fontSize": 16,
        "lineHeight": 1
    },
    {
        "id": 2,
        "stylesId": 1,
        "name": "二级标题",
        "fontFamily": "Inter",
        "fontSize": 16,
        "lineHeight": 1
    },
    {
        "id": 3,
        "stylesId": 1,
        "name": "三级标题",
        "fontFamily": "Inter",
        "fontSize": 16,
        "lineHeight": 1
    },
    {
        "id": 4,
        "stylesId": 1,
        "name": "正文",
        "fontFamily": "Inter",
        "fontSize": 16,
        "lineHeight": 1
    }
]
function Style() {

    const [visible, setVisible] = useState(false);
    const [visibleCopy, setVisibleCopy] = useState(false);
    const [styleName, setStyleName] = useState('');
    const [selectedName, setSelectedName] = useState('');
    const [selectedItem, setSelectedItem] = useState({})
    const [selectedStyle, setSelectedStyle] = useState([]);
    const [dataDeal, setDataDeal] = useState([]);
    const handleChange = (index, key, value) => {
        const updatedSettings = fontSettings.map((item, i) => {
            if (i === index) {
                return { ...item, [key]: value };
            }
            return item;
        });
        setSelectedStyle(updatedSettings);
    };
    const storage = useStorage()
    useEffect(() => {
        const fetchData = async () => {
            const res = await styleFun.getStyleByUserId(storage.getItem("openid"))
            if (res.code == 200) {
                setDataDeal(res.data)
            }

        }
        fetchData()
    }, [])

    const showModal = (item, index) => {
        setSelectedStyle(item.fontSettingsVOS)
        setSelectedItem(item)
        setVisible(true);
    };
    const showModalCopy = () => {
        setVisibleCopy(true);
        setSelectedStyle(settings)
    };
    const handleOk = async () => {


        const res = await styleFun.editStyle({ styleId: selectedItem.styleId, userId: storage.getItem("openid"), fontSettings: selectedStyle })
        if (res.code == 200) {
            message.success("样式修改成功")
        }
        setVisible(false);


    };
    const handleOkCopy = async () => {
        const res = await styleFun.addStyle({ userId: storage.getItem("openid"), styleName: styleName, fontSettings: selectedStyle })
        if (res.code == 200) {
            message.success("样式创建成功")
        }
        setVisibleCopy(false);
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const handleCancelCopy = () => {
        setVisibleCopy(false);
    };

    const renderFontSettings = () => (
        <div className='m-b-30 m-t-20'>

            {selectedStyle.map((item, index) => (
                <Row className='m-10' key={index} gutter={[16, 16]}>
                    <Col span={6}>{item.name}</Col>
                    <Col span={6}>
                        <Select
                            defaultValue={item.fontFamily}
                            onChange={(value) => handleChange(index, 'fontFamily', value)}
                        >
                            <Option value="Inter">Inter</Option>
                            <Option value="Comic Sans MS">Comic Sans MS</Option>
                            <Option value="Comic Sans">Comic Sans</Option>
                            <Option value="serif">serif</Option>
                            <Option value="monospace">monospace</Option>
                            <Option value="cursive">cursive</Option>
                            {/* Add more font options if needed */}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            defaultValue={item.fontSize.toString()}
                            onChange={(value) => handleChange(index, 'fontSize', parseInt(value, 10))}
                        >
                            <Option value="12">12</Option>
                            <Option value="14">14</Option>
                            <Option value="16">16</Option>
                            <Option value="18">18</Option>
                            <Option value="20">20</Option>
                            <Option value="24">24</Option>
                            <Option value="28">28</Option>
                            <Option value="32">32</Option>
                            <Option value="36">36</Option>
                            <Option value="40">40</Option>
                            {/* Add more size options if needed */}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            defaultValue={item.lineHeight.toString()}
                            onChange={(value) => handleChange(index, 'lineHeight', parseFloat(value))}
                        >
                            <Option value="1">1</Option>
                            <Option value="1.5">1.5</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            {/* Add more line height options if needed */}
                        </Select>
                    </Col>
                </Row>
            ))}

        </div>
    );


    return <div className="flex-c-center-center m-20">
        <Button onClick={showModalCopy}>创建新样式</Button>
        <Modal
            title="创建新样式"
            open={visibleCopy}
            icon={<IconFont type='icon-jihebiaoshi21'></IconFont>}
            closable={true}
            okText="确定"
            cancelText="取消"
            onCancel={handleCancelCopy}
            onOk={handleOkCopy}
        >
            <Form className='m-20'>
                <Form.Item
                    label="样式名称"
                    rules={[{ required: true, message: '请输入样式名称' }]}
                >
                    <Input
                        value={styleName}
                        onChange={(e) => setStyleName(e.target.value)}
                        count={{
                            show: true,
                            max: 5,
                        }}
                        maxLength={5}
                        placeholder="最多输入五个字"
                    />
                </Form.Item>
            </Form>
            {renderFontSettings()}
        </Modal>
        <div className='m-t-20'>
            <List
                grid={{ gutter: 16, column: 1 }}
                dataSource={dataDeal}
                renderItem={(item) => (<>
                  <Dropdown
                        menu={{
                            items,
                            onClick: handleSelect
                        }}

                        trigger={['contextMenu']}
                    >
                        <List.Item >
                            <Card className='flex-r-center-center' style={{ height: 100 }} hoverable onClick={() => showModal(item)}>
                                <div className='flex-c-center-center text-ellipsis' style={{ width: '200px', height: '100%' }}>{item.styleName}</div>
                            </Card>
                        </List.Item>
                    </DropDown>
                </>
                  
                )}
            />
            <Modal
                title="文字样式"
                open={visible}
                onOk={handleOk}
                okText="保存"
                cancelText="应用"
                closable={true}
                onCancel={handleCancel}

            >
                {renderFontSettings()}
            </Modal>
        </div>



    </div>
}

export default Style;

