import { Input, Button, Radio,Menu } from 'antd';
import { Table, Typography } from 'antd';
const { Text } = Typography;
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
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Borrow',
      dataIndex: 'borrow',
    },
    {
      title: 'Repayment',
      dataIndex: 'repayment',
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      borrow: 10,
      repayment: 33,
    },
    {
      key: '2',
      name: 'Jim Green',
      borrow: 100,
      repayment: 0,
    },
    {
      key: '3',
      name: 'Joe Black',
      borrow: 10,
      repayment: 10,
    },
    {
      key: '4',
      name: 'Jim Red',
      borrow: 75,
      repayment: 45,
    },
  ];
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
         <Table
      columns={fixedColumns}
      dataSource={fixedData}
      pagination={false}
      scroll={{
   
        y: 300,
      }}
      bordered
      summary={() => (
        <Table.Summary fixed>
          <Table.Summary.Row>
            <Table.Summary.Cell index={0}>Summary</Table.Summary.Cell>
            <Table.Summary.Cell index={1}>This is a summary content</Table.Summary.Cell>
          </Table.Summary.Row>
        </Table.Summary>
      )}
    />
    
    
    
    </div>
}
export default Library