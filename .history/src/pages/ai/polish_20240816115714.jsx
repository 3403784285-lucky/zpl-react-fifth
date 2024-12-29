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




import React from 'react';
import { Form, Select, Input, Row, Col, Button, Tooltip, message } from 'antd';
import { CodepenOutlined, } from '@ant-design/icons'
import aiFun from '../../api/user/ai';
let isActive=false
let inter=false
function Polishing({ editor, handleApplyStyles, handleResetStyles, fontFamilyH1Value, setFontFamilyH1Value, fontFamilyH2Value, setFontFamilyH2Value, fontFamilyH3Value, setFontFamilyH3Value, fontFamilyH4Value, setFontFamilyH4Value, fontSizeH1Value, setFontSizeH1Value, fontSizeH2Value, setFontSizeH2Value, fontSizeH3Value, setFontSizeH3Value, fontSizeH4Value, setFontSizeH4Value, lineHeightH1Value, setLineHeightH1Value, lineHeightH2Value, setLineHeightH2Value, lineHeightH3Value, setLineHeightH3Value, lineHeightH4Value, setLineHeightH4Value }) {

  
  const FormatClick = async () => {
    isActive=!isActive
   
    message.info("响应中...")
    const formData = new FormData()
    formData.append('text', editor.getHTML());

    try {
      const response = await fetch('http://192.168.50.150:5000/fixFormat', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'your-authorization-token',
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok) {
        isActive=false

        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      const processStream = async () => {
        const { done, value } = await reader.read();
        if (done || !isActive) {
          if (isActive)
            message.success("智能排版成功")
          else {
            if(!inter)
            {
              message.success("排版中断成功")
              inter=true

            }else{
              inter=false
            }

          }
          isActive=false
          return; // 流结束
        }

        result1 += decoder.decode(value, { stream: true });
        editor.commands.setContent(result1)

        // 控制数据流动速度
        setTimeout(processStream, 500); // 控制更新频率
      };

      processStream(); // 开始处理流

    } catch (error) {
      isActive=false
      console.error('Error fetching stream:', error);
    }

  }

  return (<>  <Tooltip title="智能格式排版:点击即可智能排版全文，再次点击即可终端此次排版" placement="left"><CodepenOutlined onClick={FormatClick} style={{ right: 20, top: 30 }} className="position-absolute font-size-lg" /></Tooltip>
    <Form layout="vertical position-relative" style={{ width: 300, margin: '0 auto', paddingTop: 20 }}>
      <h4 className='m-b-20 font-size-lg '>文字样式</h4>


      {/* Row for Heading 1 */}
      <Row gutter={16}>
        <Col span={9}>
          <Form.Item label="一级标题">
            <Select defaultValue={fontFamilyH1Value} onChange={value => setFontFamilyH1Value(value)}>
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
            <Select defaultValue={fontSizeH1Value} onChange={value => setFontSizeH1Value(value)}>
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
            <Select defaultValue={lineHeightH1Value} onChange={value => setLineHeightH1Value(value)}>
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
            <Select defaultValue={fontFamilyH2Value} onChange={value => setFontFamilyH2Value(value)}>
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
            <Select defaultValue={fontSizeH2Value} onChange={value => setFontSizeH2Value(value)}>
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
            <Select defaultValue={lineHeightH2Value} onChange={value => setLineHeightH2Value(value)}>
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
            <Select defaultValue={fontFamilyH3Value} onChange={value => setFontFamilyH3Value(value)}>
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
            <Select defaultValue={fontSizeH3Value} onChange={value => setFontSizeH3Value(value)}>
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
            <Select defaultValue={lineHeightH3Value} onChange={value => setLineHeightH3Value(value)}>
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
            <Select defaultValue={fontFamilyH4Value} onChange={value => setFontFamilyH4Value(value)}>
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
            <Select defaultValue={fontSizeH4Value} onChange={value => setFontSizeH4Value(value)}>
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
            <Select defaultValue={lineHeightH4Value} onChange={value => setLineHeightH4Value(value)}>
              <Option value="1">1</Option>
              <Option value="1.5">1.5</Option>
              <Option value="2">2</Option>
              <Option value="3">3</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Apply and Reset Buttons */}
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item label={<h4>使用</h4>}>
            <Button className='w-full bg-color-black text-color-white' onClick={handleApplyStyles}>应用</Button>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item label=" ">
            <Button className='w-full' onClick={handleResetStyles}>重置</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  </>


  );

}
export default Polishing;