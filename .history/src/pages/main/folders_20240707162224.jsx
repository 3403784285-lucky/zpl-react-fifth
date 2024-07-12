

import {AppstoreTwoTone,SmileTwoTone} from '@ant-design/icons'
import { Menu } from 'antd';
import { Outlet } from 'react-router-dom';
const items = [
    {
      label: '模板中心',
      key: 'template-center',
      icon: <AppstoreTwoTone />
    },
    {
      label: '我的模板',
      key: 'my-template',
      icon: <SmileTwoTone />,
     
    },
  
    
  ];
function Folders()
{
    const [current, setCurrent] = useState('mail');
    const navigate = useNavigate();

    const onClickMenu = (e) => {
        navigate(e.key, { replace: true });
        setCurrent(e.key);
      };
 
    return <div className='h-full w-full'>
    <Menu onClick={onClickMenu} selectedKeys={[current]} mode="horizontal" items={items} />;
    <div className='w-full'></div>
    <Outlet></Outlet>
    
    
    
    </div>
}
export default Folders