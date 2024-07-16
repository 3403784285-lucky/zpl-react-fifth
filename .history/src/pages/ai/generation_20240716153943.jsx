
import { Radio, Input ,Card} from 'antd';
import { KubernetesOutlined, KeyOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react';
import { List, Avatar, Button } from 'antd';
import { FileWordOutlined } from '@ant-design/icons';

function Generation() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    setData([{
        "title": "基于大小模型...发系统-产品说明书",
        "updateTime": "今天 02:14",
        "link": "/path-to-document"
      },
      {
        "title": "智能简历解析系统-概要设计",
        "updateTime": "今天 02:12",
        "link": "/path-to-document"
      }])
  }, []);

  return (
    <List
      itemLayout="horizontal"
      dataSource={data}
      renderItem={item => (
        <List.Item actions={[<Button type="link">Rename</Button>]}>
          <List.Item.Meta
            avatar={<Avatar icon={<FileWordOutlined />} />}
            title={<a href={item.link}>{item.title}</a>}
            description={`更新 ${item.updateTime}`}
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