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
import { Form, Select, Input, Row, Col } from 'antd';

function Polishing() {


    return (
        <Form layout="vertical" style={{ width: 240, margin: '0 auto', paddingTop: 20 }}>
          <Form.Item label="文字样式" />
          
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="一级标题">
                <Select defaultValue="Times New Roman">
                  <Option value="Times New Roman">Times New Roman</Option>
                  <Option value="Arial">Arial</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
             
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select defaultValue="小三">
                  <Option value="小三">小三</Option>
                  <Option value="四号">四号</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select defaultValue="1.5倍">
                  <Option value="1.5倍">1.5倍</Option>
                  <Option value="2倍">2倍</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16} className='font-size-sm'>
            <Col span={8}>
              <Form.Item label="二级标题">
                <Select defaultValue="Times New Roman">
                  <Option value="Times New Roman">Times New Roman</Option>
                  <Option value="Arial">Arial</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
             
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select defaultValue="小三">
                  <Option value="小三">小三</Option>
                  <Option value="四号">四号</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select defaultValue="1.5倍">
                  <Option value="1.5倍">1.5倍</Option>
                  <Option value="2倍">2倍</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item label="三级标题">
                <Select defaultValue="Times New Roman">
                  <Option value="Times New Roman">Times New Roman</Option>
                  <Option value="Arial">Arial</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
             
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select defaultValue="小三">
                  <Option value="小三">小三</Option>
                  <Option value="四号">四号</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label=" ">
                <Select defaultValue="1.5倍">
                  <Option value="1.5倍">1.5倍</Option>
                  <Option value="2倍">2倍</Option>
                  {/* Add more options as needed */}
                </Select>
              </Form.Item>
            </Col>
          </Row>    
          {/* Repeat similar structure for other headings */}
    
        </Form>
      );

}
export default Polishing;
