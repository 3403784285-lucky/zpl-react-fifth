

import {AppstoreTwoTone,SmileTwoTone} from '@ant-design/icons'
import { Menu } from 'antd';
const items = [
    {
      label: '模板中心',
      key: 'mail',
      icon: <AppstoreTwoTone />
    },
    {
      label: '我的模板',
      key: 'app',
      icon: <SmileTwoTone />,
     
    },
  
    
  ];
function Folders()
{
    const [current, setCurrent] = useState('mail');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
    return <>
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
    
    
    
    </>
}
export default Folders