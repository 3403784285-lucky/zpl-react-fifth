// import { Input, Dropdown, Space, Button, Card,Select } from 'antd';
// import { DownOutlined } from '@ant-design/icons'
// const { TextArea } = Input
// const itemsDrop = [
//     {
//         label: '更正式',
//         value: '0',
//     },
//     {
//         label: '党政风',
//         value: '1',
//     },
//     {
//         label: '更活泼',
//         value: '2',
//     },
//     {
//         label: '中译英',
//         value: '3',
//     },
//     {
//         label: '英译中',
//         value: '4',
//     },
//     {
//         label: '普通改写',
//         value: '5',
//     },
// ];
// function Polishing() {

//     const handleChange = (value) => {
//         console.log(`selected ${value}`);
//       };
//     return <div className="p-30">
//         <h4 className='m-b-20'>文本润色</h4>
//         <div className="text-frame b-rd-10  p-10" style={{ border: 'lightgrey 1 solid ' }}>
//             <TextArea
//                 maxLength={100}
//                 style={{
//                     height: 120,
//                     resize: 'none',
//                     border: 0
//                 }}
//             />
//             <div className="button-frame p-t-10 flex" style={{ justifyContent: "space-between" }}>
//                 <Select
//                     defaultValue="5"
//                     style={{
//                         width: 100,
//                     }}
//                     onChange={handleChange}
//                     options={itemsDrop}
//                 />

//                 <Button className='bg-color-second b-rd-10 text-color-white'>开始改写</Button>
//             </div>
//         </div>
//         <div className="tip-correction m-t-30" ><strong>结果</strong></div>

//         <div className='flex-c-center-center'>
//             <Card className='m-t-20 shadow'
//                 hoverable

//                 style={{
//                     width: 400,


//                 }}
//             // cover={<img alt="example" src="/img/nodata.png" />}
//             >

//                 {<div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
//                     : 当然，这非常重要，做项目，还可以，但是有时候还是浪费了不少时间。另外心情非常紧张，应该在前一段时间把核心技术讨论掉，否则后面时间就没了，就过去了。
//                 </div>}


//             </Card>

//         </div>



//     </div>
// }
// export default Polishing;


import React, { useState, useEffect } from 'react';
import { Form, Select, Input, Row, Col, Button, Modal, Tooltip, message } from 'antd';
import { CodepenOutlined } from '@ant-design/icons';
import styleFun from '../../api/user/style';
import { useStorage } from 'web-localstorage-plus';
import { createFromIconfontCN } from '@ant-design/icons';

const { Option } = Select;

// SSE 接口地址
const AI_SSE_URL = 'http://localhost:8090/ai/sse';

// 全局中断标识
let isActive = false;
let inter = false;
let selectedStyle = [];

// 用于解析 SSE 返回的 token
function parseSSEChunk(textChunk) {
  // 先按换行符切割
  const lines = textChunk.split(/\r?\n/);
  let newTokens = '';

  for (let line of lines) {
    if (line.startsWith('data:')) {
      // 去掉 "data:" 这部分，得到 JSON
      const dataStr = line.replace(/^data:\s*/, '').trim();
      // 一些 SSE 实现可能在最后发送 [DONE] 表示结束
      if (dataStr === '[DONE]') {
        continue;
      }
      try {
        const dataObj = JSON.parse(dataStr);
        // dataObj.token 即本次返回的增量内容
        if (dataObj.token) {
          newTokens += dataObj.token;
        }
      } catch (err) {
        console.error('SSE JSON 解析出错：', err);
      }
    }
  }

  return newTokens;
}

const IconFont = createFromIconfontCN({
  scriptUrl: ['//at.alicdn.com/t/c/font_4248113_l0iirwun48i.js'],
});

function Polishing({
                     editor,
                     handleApplyStyles,
                     handleResetStyles,
                     fontFamilyH1Value,
                     setFontFamilyH1Value,
                     fontFamilyH2Value,
                     setFontFamilyH2Value,
                     fontFamilyH3Value,
                     setFontFamilyH3Value,
                     fontFamilyH4Value,
                     setFontFamilyH4Value,
                     fontSizeH1Value,
                     setFontSizeH1Value,
                     fontSizeH2Value,
                     setFontSizeH2Value,
                     fontSizeH3Value,
                     setFontSizeH3Value,
                     fontSizeH4Value,
                     setFontSizeH4Value,
                     lineHeightH1Value,
                     setLineHeightH1Value,
                     lineHeightH2Value,
                     setLineHeightH2Value,
                     lineHeightH3Value,
                     setLineHeightH3Value,
                     lineHeightH4Value,
                     setLineHeightH4Value
                   }) {
  const [styleName, setStyleName] = useState('');
  const [visibleStyle, setVisibleStyle] = useState(false);
  const storage = useStorage();

  // 初始化时解析编辑器节点
  useEffect(() => {
    if (editor) {
      parseAllNodes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  // 从编辑器中读取并设置各级 heading / 段落的样式
  const parseAllNodes = () => {
    const { state } = editor;
    state.doc.descendants((node) => {
      if (
          node.type.name === 'heading' ||
          node.type.name === 'paragraph' ||
          node.type.name === 'text'
      ) {
        // 查找 textStyle 标记
        const textStyleMark =
            node?.content?.content?.[0]?.marks?.find((mark) => mark.type.name === 'textStyle') ||
            node.marks.find((mark) => mark.type.name === 'textStyle');

        if (textStyleMark) {
          const fontSize = textStyleMark.attrs.fontSize || '16';
          const fontFamily = textStyleMark.attrs.fontFamily || 'Inter';
          const lineHeight = textStyleMark.attrs.lineHeight || '1.5';

          // 根据不同级别的 heading 或 paragraph 赋值
          if (node.type.name === 'heading') {
            const level = node.attrs.level;
            if (level === 1) {
              setFontFamilyH1Value(fontFamily);
              setFontSizeH1Value(fontSize);
              setLineHeightH1Value(lineHeight);
            } else if (level === 2) {
              setFontFamilyH2Value(fontFamily);
              setFontSizeH2Value(fontSize);
              setLineHeightH2Value(lineHeight);
            } else if (level === 3) {
              setFontFamilyH3Value(fontFamily);
              setFontSizeH3Value(fontSize);
              setLineHeightH3Value(lineHeight);
            }
          } else if (node.type.name === 'paragraph' || node.type.name === 'text') {
            setFontFamilyH4Value(fontFamily);
            setFontSizeH4Value(fontSize);
            setLineHeightH4Value(lineHeight);
          }
        }
      }
    });
  };

  // 收集当前 4 个级别的样式，便于插入“我的样式库”
  const addToMy = async () => {
    selectedStyle = [
      {
        id: 0,
        stylesId: 0,
        name: '一级标题',
        fontFamily: fontFamilyH1Value,
        fontSize: fontSizeH1Value,
        lineHeight: lineHeightH1Value
      },
      {
        id: 0,
        stylesId: 0,
        name: '二级标题',
        fontFamily: fontFamilyH2Value,
        fontSize: fontSizeH2Value,
        lineHeight: lineHeightH2Value
      },
      {
        id: 0,
        stylesId: 0,
        name: '三级标题',
        fontFamily: fontFamilyH3Value,
        fontSize: fontSizeH3Value,
        lineHeight: lineHeightH3Value
      },
      {
        id: 0,
        stylesId: 0,
        name: '正文',
        fontFamily: fontFamilyH4Value,
        fontSize: fontSizeH4Value,
        lineHeight: lineHeightH4Value
      }
    ];
    setVisibleStyle(true);
  };

  // 取消添加样式
  const handleCancelStyle = () => {
    setVisibleStyle(false);
  };

  // 确认保存到“我的样式库”
  const handleOkStyle = async () => {
    const res = await styleFun.addStyle({
      userId: storage.getItem('openid'),
      styleName: styleName,
      fontSettings: selectedStyle
    });
    if (res.code === 200) {
      message.success('样式创建成功');
    }
    setVisibleStyle(false);
  };

  // 当在 Modal 中切换不同配置项时同步到 selectedStyle
  const handleChange = (index, key, value) => {
    const updatedSettings = selectedStyle.map((item, i) => {
      if (i === index) {
        return { ...item, [key]: value };
      }
      return item;
    });
    selectedStyle = updatedSettings;
  };

  /**
   * 智能格式化（流式输出）的核心逻辑
   * 1. 使用 fetch 发送 POST 请求，设置 Accept: text/event-stream
   * 2. 持续从 response.body 读取 SSE 数据
   * 3. 使用 parseSSEChunk() 按行解析 token
   * 4. 拼接后实时更新编辑器
   */
  const FormatClick = async () => {
    // 点击一次开始，再点一次中断
    isActive = !isActive;
    if (isActive) {
      message.info('响应中...');
    }

    try {
      const response = await fetch(AI_SSE_URL, {
        method: 'POST',
        body: JSON.stringify({ type: 'smart', userQuery: editor.getHTML() }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/event-stream'
        }
      });

      if (!response.ok) {
        isActive = false;
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      const processStream = async () => {
        const { done, value } = await reader.read();
        // 流结束 or 主动中断
        if (done || !isActive) {
          if (isActive) {
            message.success('智能排版成功');
          } else {
            if (!inter) {
              message.success('排版中断成功');
              inter = true;
            } else {
              inter = false;
            }
          }
          // 可自定义这里的逻辑，比如插入一个分隔符
          editor.commands.insertContent(`'`);
          isActive = false;
          return;
        }

        // 解析 SSE chunk
        const textChunk = decoder.decode(value, { stream: true });
        const newTokens = parseSSEChunk(textChunk);

        // 拼接到 result1 后更新编辑器
        result1 += newTokens;
        editor.commands.setContent(result1);

        // 下一次递归读取
        setTimeout(processStream, 100);
      };

      // 开始读取 SSE 流
      processStream();
    } catch (error) {
      isActive = false;
      console.error('Error fetching stream:', error);
      message.error('流式请求出错');
    }
  };

  return (
      <>
        <Tooltip
            title="智能格式排版: 点击可智能排版全文，再次点击可中断此次排版"
            placement="left"
        >
          <CodepenOutlined
              onClick={FormatClick}
              style={{ right: 20, top: 30 }}
              className="position-absolute font-size-lg"
          />
        </Tooltip>

        <Form
            layout="vertical position-relative"
            style={{ width: 300, margin: '0 auto', paddingTop: 20 }}
        >
          <h4 className="m-b-20 font-size-lg">文字样式</h4>

          {/* Row for Heading 1 */}
          <Row gutter={16}>
            <Col span={9}>
              <Form.Item label="一级标题">
                <Select value={fontFamilyH1Value} onChange={(value) => setFontFamilyH1Value(value)}>
                  <Option value="Inter">Inter</Option>
                  <Option value="Comic Sans MS">Comic Sans MS</Option>
                  <Option value="Comic Sans">Comic Sans</Option>
                  <Option value="serif">serif</Option>
                  <Option value="monospace">monospace</Option>
                  <Option value="cursive">cursive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select value={fontSizeH1Value} onChange={(value) => setFontSizeH1Value(value)}>
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
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label=" ">
                <Select value={lineHeightH1Value} onChange={(value) => setLineHeightH1Value(value)}>
                  <Option value="1">1</Option>
                  <Option value="1.5">1.5</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Row for Heading 2 */}
          <Row gutter={16}>
            <Col span={9}>
              <Form.Item label="二级标题">
                <Select value={fontFamilyH2Value} onChange={(value) => setFontFamilyH2Value(value)}>
                  <Option value="Inter">Inter</Option>
                  <Option value="Comic Sans MS">Comic Sans MS</Option>
                  <Option value="Comic Sans">Comic Sans</Option>
                  <Option value="serif">serif</Option>
                  <Option value="monospace">monospace</Option>
                  <Option value="cursive">cursive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select value={fontSizeH2Value} onChange={(value) => setFontSizeH2Value(value)}>
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
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label=" ">
                <Select value={lineHeightH2Value} onChange={(value) => setLineHeightH2Value(value)}>
                  <Option value="1">1</Option>
                  <Option value="1.5">1.5</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Row for Heading 3 */}
          <Row gutter={16}>
            <Col span={9}>
              <Form.Item label="三级标题">
                <Select value={fontFamilyH3Value} onChange={(value) => setFontFamilyH3Value(value)}>
                  <Option value="Inter">Inter</Option>
                  <Option value="Comic Sans MS">Comic Sans MS</Option>
                  <Option value="Comic Sans">Comic Sans</Option>
                  <Option value="serif">serif</Option>
                  <Option value="monospace">monospace</Option>
                  <Option value="cursive">cursive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select value={fontSizeH3Value} onChange={(value) => setFontSizeH3Value(value)}>
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
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label=" ">
                <Select value={lineHeightH3Value} onChange={(value) => setLineHeightH3Value(value)}>
                  <Option value="1">1</Option>
                  <Option value="1.5">1.5</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Row for Body Text */}
          <Row gutter={16}>
            <Col span={9}>
              <Form.Item label="正文">
                <Select value={fontFamilyH4Value} onChange={(value) => setFontFamilyH4Value(value)}>
                  <Option value="Inter">Inter</Option>
                  <Option value="Comic Sans MS">Comic Sans MS</Option>
                  <Option value="Comic Sans">Comic Sans</Option>
                  <Option value="serif">serif</Option>
                  <Option value="monospace">monospace</Option>
                  <Option value="cursive">cursive</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select value={fontSizeH4Value} onChange={(value) => setFontSizeH4Value(value)}>
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
                </Select>
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item label=" ">
                <Select value={lineHeightH4Value} onChange={(value) => setLineHeightH4Value(value)}>
                  <Option value="1">1</Option>
                  <Option value="1.5">1.5</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* 应用/重置 按钮 */}
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item>
                <Button
                    className="w-full bg-color-black text-color-white"
                    onClick={handleApplyStyles}
                >
                  应用
                </Button>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item>
                <Button className="w-full" type="primary" onClick={handleResetStyles}>
                  重置
                </Button>
              </Form.Item>
            </Col>
          </Row>

          {/* 添加到我的样式库 */}
          <Row gutter={16}>
            <Col span={24}>
              <Button className="w-full" onClick={addToMy}>
                添加到我的样式库
              </Button>
            </Col>
          </Row>
        </Form>

        {/* Modal: 新样式 */}
        <Modal
            title="新样式"
            open={visibleStyle}
            icon={<IconFont type="icon-jihebiaoshi21" />}
            closable
            okText="确定"
            width={900}
            cancelText="取消"
            onCancel={handleCancelStyle}
            onOk={handleOkStyle}
        >
          <Form className="m-20">
            <Form.Item label="样式名称" rules={[{ required: true, message: '请输入样式名称' }]}>
              <Input
                  value={styleName}
                  onChange={(e) => setStyleName(e.target.value)}
                  maxLength={5}
                  placeholder="最多输入五个字"
              />
            </Form.Item>
          </Form>

          <div className="m-b-30 m-t-20">
            {selectedStyle.map((item, index) => (
                <Row className="m-10" key={index} gutter={[16, 16]}>
                  <Col span={6}>{item.name}</Col>
                  <Col span={6}>
                    <Select
                        value={item.fontFamily}
                        onChange={(value) => handleChange(index, 'fontFamily', value)}
                    >
                      <Option value="Inter">Inter</Option>
                      <Option value="Comic Sans MS">Comic Sans MS</Option>
                      <Option value="Comic Sans">Comic Sans</Option>
                      <Option value="serif">serif</Option>
                      <Option value="monospace">monospace</Option>
                      <Option value="cursive">cursive</Option>
                    </Select>
                  </Col>
                  <Col span={6}>
                    <Select
                        value={String(item.fontSize)}
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
                    </Select>
                  </Col>
                  <Col span={6}>
                    <Select
                        value={String(item.lineHeight)}
                        onChange={(value) => handleChange(index, 'lineHeight', parseFloat(value))}
                    >
                      <Option value="1">1</Option>
                      <Option value="1.5">1.5</Option>
                      <Option value="2">2</Option>
                      <Option value="3">3</Option>
                    </Select>
                  </Col>
                </Row>
            ))}
          </div>
        </Modal>
      </>
  );
}

export default Polishing;
