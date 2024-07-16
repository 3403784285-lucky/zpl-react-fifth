
import { Radio, Input, Card } from 'antd';
import { KubernetesOutlined, KeyOutlined,FileTextOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import { List, Avatar, Button } from 'antd';
import { FileWordOutlined } from '@ant-design/icons';
import { set } from 'lodash';
import { DownOutlined, UnorderedListOutlined, createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../api/user/file';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_40bmlkg84c5.js'
  ],
});
function Generation({documentId}) {
    const [data, setData] = useState([]);
const storage=useStorage()
  useEffect(() => {
    // Fetch data from the backend
    stora
    const res=await fileFun.getDocumentLog()

  setData([  {
    "id": 1798995680221003778,
    "documentId": 43,
    "userId": 3,
    "operation": "编辑",
    "description": "用户 廖梓行 更新了文档《 啊实打实》",
    "operationTime": "2024-06-07 16:29:29"
},
{
    "id": 1798995819849383938,
    "documentId": 43,
    "userId": 3,
    "operation": "编辑",
    "description": "用户 廖梓行 更新了文档《 经济论文--如何让中国站起来》",
    "operationTime": "2024-06-07 16:30:02"
},])
  }, []);

  // Function to choose the icon based on document type
  const chooseIcon = (description) => {
   
      return <IconFont type="icon-wordIcon" className='font-size-lg'></IconFont>;
  
  };

  return (
    <List
      itemLayout="horizontal"
      className='p-10'
      dataSource={data}
      renderItem={item => (
        <List.Item>
          <List.Item.Meta
            avatar={chooseIcon(item.description)}
            title={<span>{item.operation}</span>}
            description={
              <div>
                <p>{item.description}</p>
                <p style={{ color: '#888' }}>{item.operationTime}</p>
              </div>
            }
          />
        </List.Item>
      )}
    />
  );
};




// return <div className='p-30'>
//     <div className="first-frame flex  " style={{ justifyContent: 'space-between', height: '20px' }}>
//         <div className="tip-correction" ><strong> 文本补全</strong></div>
//         <div className="refresh-correction "><strong><Radio className='text-color-second'>包括上下文</Radio></strong></div>
//     </div>
//     <Input placeholder="输入需求开始创作" className='p-10 m-r-10 m-t-20' style={{ width: '100%' }} suffix={<KubernetesOutlined className='hover-example' style={{ fontSize: '20px' }} />} />
//     <div className="bottom-frame m-t-20"><KeyOutlined style={{ color: 'blue' }} /> &nbsp;试试这样问</div>
//     <div className="tip-correction m-t-30" ><strong>结果</strong></div>

//     <div className='flex-c-center-center'>
//         <Card className='m-t-20 shadow'
//             hoverable

//             style={{
//                 width: 400,


//             }}
//         // cover={<img alt="example" src="/img/nodata.png" />}
//         >

//             {<div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
//                 : 当然，这非常重要，做项目，还可以，但是有时候还是浪费了不少时间。另外心情非常紧张，应该在前一段时间把核心技术讨论掉，否则后面时间就没了，就过去了。
//             </div>}


//         </Card>

//     </div>

// </div>



export default Generation;