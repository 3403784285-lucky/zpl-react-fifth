
import React, { useEffect, useState } from 'react';
import { List, Modal, Button, Card, Select, Form, Row, Col, Input } from 'antd';
import { createFromIconfontCN, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import styleFun from '../../api/user/style';
import { useStorage } from 'web-localstorage-plus';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_o1tzykmllrg.js'
    ],
});
let StyleEditDTO={
    "styleId": 0,
    "styleName": "",
    "ownerId": 0,
    "elements": [
        {
            "styleId": 0,
            "elementId": 0,
            "elementType": "string",
            "fontSettings": {
                "settingId": 0,
                "elementId": 0,
                "fontFamily": "string",
                "fontSize": 0,
                "lineHeight": 0
            }
        }
    ]
}
function Style() {
    const [visible, setVisible] = useState(false);
    const [visibleCopy, setVisibleCopy] = useState(false);
    const [styleName, setStyleName] = useState('');
    const [fontSize, setFontSize] = useState('Inter');
    const [FontFamily, setFontFamily] = useState(16);
    const [lineHeight, setLineHeight] = useState(1.5);
    const [selectedStyle, setSelectedStyle] = useState({});
    const [dataDeal, setDataDeal] = useState([]);
    const storage=useStorage()
    useEffect(()=>{
        const fetchData=async()=>
        {
            const res=await styleFun.getStyleByUserId(storage.getItem("openid"))
            if(res.code==200){
                setDataDeal(res.data)
            }

        }
        fetchData()
    },[])

    const showModal = (item) => {
        setSelectedStyle(item)
        setVisible(true);
    };
    const showModalCopy = () => {
        setVisibleCopy(true);
    };
    const handleOk = async() => {
        StyleEditDTO.styleId=selectedStyle.styleId;
        StyleEditDTO.elements=item.elements;
        
        const res=await styleFun.editStyle()
        
    };
    const handleCancel = () => {
        setVisible(false);
    };
    const handleCancelCopy = () => {
        setVisibleCopy(false);
    };

    const renderFontSettings = () => (
        <div className='m-b-30 m-t-20'>

            {['一级标题', '二级标题', '三级标题', '正文'].map((item, index) => (
                <Row className='m-10' key={index} gutter={[16, 16]}>
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
                renderItem={(item) => (
                    <List.Item >
                        <Card className='flex-r-center-center' style={{ height: 100 }} hoverable onClick={()=>showModal(item)}>
                            <div className='flex-c-center-center text-ellipsis' style={{ width: '200px', height: '100%' }}>{item.styleName}</div>
                        </Card>
                    </List.Item>
                )}
            />
            <Modal
                title="文字样式"
                open={visible}
                onOk={handleOk}
                okText="保存"
                closable={true}
                onCancel={handleCancel}
               
            >
                {renderFontSettings()}
            </Modal>
        </div>



    </div>
}

export default Style;

