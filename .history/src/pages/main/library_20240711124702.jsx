import { Input, Button, Radio, Menu, Pagination, Popover, Modal, Divider, Select } from 'antd';
import { Table, Typography } from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import TableMy from '../../components/utils/tableMy';
import fileFun from '../../api/user/file';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js'
  ],
});
const items = [
  {
    label: '我收到的',
    key: '1',

  }, {
    label: '我发出的',
    key: '0',

  },
]

function Library() {

  const [current, setCurrent] = useState(0);
 
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  


  return <div className="h-full p-10 position-relative" >
    
      <Menu className=' position-absolute' style={{right:25,top:30}} onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
     <TableMy getFun={fileFun.getShare} dataContent={current}/>
     </div>
  
}
export default Library