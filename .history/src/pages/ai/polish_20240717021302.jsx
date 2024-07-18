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
//         <div className="text-frame b-rd-10  p-10" style={{ border: 'lightgrey 1px solid ' }}>
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
import { Form, Select, Input, Row, Col,Button } from 'antd';

function Polishing() {


    return (
      <Form layout="vertical" style={{ width: 300, margin: '0 auto', paddingTop: 20 }}>
      <h4 className='m-b-20 font-size-lg'>文字样式</h4>
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
              <Option value="12px">12</Option>
              <Option value="14px">14</Option>
              <Option value="16px">16</Option>
              <Option value="18px">18</Option>
              <Option value="20px">20</Option>
              <Option value="24px">24</Option>
              <Option value="28px">28</Option>
              <Option value="32px">32</Option>
              <Option value="36px">36</Option>
              <Option value="40px">40</Option>
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
              <Option value="12px">12</Option>
              <Option value="14px">14</Option>
              <Option value="16px">16</Option>
              <Option value="18px">18</Option>
              <Option value="20px">20</Option>
              <Option value="24px">24</Option>
              <Option value="28px">28</Option>
              <Option value="32px">32</Option>
              <Option value="36px">36</Option>
              <Option value="40px">40</Option>
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

      {/* Row for Heading 3 */}
      <Row gutter={16}>
        <Col span={9}>
          <Form.Item label="三级标题">
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
              <Option value="12px">12</Option>
              <Option value="14px">14</Option>
              <Option value="16px">16</Option>
              <Option value="18px">18</Option>
              <Option value="20px">20</Option>
              <Option value="24px">24</Option>
              <Option value="28px">28</Option>
              <Option value="32px">32</Option>
              <Option value="36px">36</Option>
              <Option value="40px">40</Option>
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

      {/* Row for Body Text */}
      <Row gutter={16}>
        <Col span={9}>
          <Form.Item label="正文">
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
              <Option value="12px">12</Option>
              <Option value="14px">14</Option>
              <Option value="16px">16</Option>
              <Option value="18px">18</Option>
              <Option value="20px">20</Option>
              <Option value="24px">24</Option>
              <Option value="28px">28</Option>
              <Option value="32px">32</Option>
              <Option value="36px">36</Option>
              <Option value="40px">40</Option>
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
  
      );

}
export default Polishing;
