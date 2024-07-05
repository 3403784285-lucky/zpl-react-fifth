import { Input, Button, Radio,Menu } from 'antd';
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
      title: '文件类型',
      dataIndex: 'name',
  },
  {
      title: '文件位置',
      dataIndex: 'chinese',
      sorter: {
          compare: (a, b) => a.chinese - b.chinese,
          multiple: 3,
      },
  },
  {
      title: '创建者',
      dataIndex: 'math',
      sorter: {
          compare: (a, b) => a.math - b.math,
          multiple: 2,
      },
  },
  {
      title: '最后修改',
      dataIndex: 'english',
      sorter: {
          compare: (a, b) => a.english - b.english,
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
      key: '2',
      name: 'Jim Green',
      chinese: 98,
      math: 66,
      english: 89,
  },

  {
      key: '4',
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
         <Pagination className='m-t-10 m-l-230' total={50} showSizeChanger showQuickJumper hideOnSinglePage={true}/>
    
    
    </div>
}
export default Library