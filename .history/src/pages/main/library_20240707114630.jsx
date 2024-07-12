import { Input, Button, Radio,Menu,Pagination } from 'antd';
import { Table, Typography } from 'antd';
const items = [
    {
        label: '我收到的',
        key: 'mail',
    
    }, {
        label: '我发出的',
        key: 'hah',
     
    },
]
const columns = [
  {
      title: '文件名称',
      dataIndex: 'name',
  },
 
  {
      title: '创建者',
      dataIndex: 'nickname',
      sorter: {
          compare: (a, b) => a.nickname - b.nickname,
          multiple: 2,
      },
  },
  {
      title: '修改时间',
      dataIndex: 'updateTime',
      sorter: {
          compare: (a, b) => a.updateTime - b.updateTime,
          multiple: 1,
      },
  },
];


const data = [
  {
      "document": {
          "id": 45,
          "userId": 3,
          "name": "23213",
          "content": "# 示例论文标题\n\n",
          "summary": "1231",
          "type": 21312,
          "label": "1312",
          "subject": "132",
          "category": "1321",
          "status": 1312,
          "isDeleted": 0,
          "likeCount": 0,
          "visibility": 1,
          "createTime": "2024-06-07 17:17:24",
          "updateTime": "2024-06-07 17:17:24"
      },
      "category": "今天",
      "user": {
          "id": 3,
          "username": "lz",
          "password": "**********",
          "email": "466",
          "level": 0,
          "money": 0,
          "nickname": "廖梓行",
          "avatar": "http://8.130.128.14:9000/myfile/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.png",
          "createTime": "2024-06-01 00:21:23",
          "updateTime": "2024-06-01 00:21:23"
      }
  },

];
const onChange = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};
  const fixedColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: true,
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
  ];
  const fixedData = [];
for (let i = 0; i < 20; i += 1) {
  fixedData.push({
    key: i,
    name: ['Light', 'Bamboo', 'Little'][i % 3],
    description: 'Everything that has a beginning, has an end.',
  });
}
function Library()
{
  const [dataDeal, setDataDeal] = useState([]);
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    useEffect(() => {

      const deal = [

          {
              "name": `${data[0].document.name}`,
              "nickname": data[0].user.username,
              "updateTime": data[0].document.updateTime
          },
          // {
          //     "name": data[0].document.name,
          //     "nickname": data[0].user.username,
          //     "updateTime": data[0].document.updateTime
          // },
          // {
          //     "name": data[0].document.name,
          //     "nickname": data[0].user.username,
          //     "updateTime": data[0].document.updateTime
          // }
      ]
      setDataDeal(deal)
  }, [])
    return <div className="h-full p-10" >
         <Menu className='m-10' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
         <Table columns={columns} rowSelection={rowSelection} dataSource={dataDeal} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
         <div className="text-color-grey flex-center-center m-8" >没有更多咯</div>
         <Pagination className='m-t-20 position-absolute' style={{ bottom: 40, left: 500 }} total={50} showSizeChanger showQuickJumper hideOnSinglePage={true} />

    
    
    </div>
}
export default Library