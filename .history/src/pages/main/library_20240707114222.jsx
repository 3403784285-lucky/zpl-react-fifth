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
      key: '1',
      name: 'John Brown',
      chinese: 98,
      math: 60,
      english: 70,
  },
  
{
  key: '7',
  name: 'Jim Red',
  chinese: 88,
  math: 99,
  english: 89,
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
    
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <div className="h-full p-10" >
         <Menu className='m-10' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
         <Table columns={columns} dataSource={data} onChange={onChange} pagination={false}/>
         <Pagination className='m-t-20 m-l-270' total={50} showSizeChanger showQuickJumper hideOnSinglePage={true}/>
    
    
    </div>
}
export default Library