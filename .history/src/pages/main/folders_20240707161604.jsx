

import {AppstoreTwoTone,SmileTwoTone} from '@ant-design/icons'
import { Menu } from 'antd';
const items = [
    {
      label: '模板中心',
      key: '',
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
    const navigate = useNavigate();

    const onClickMenu = (e) => {
        navigate(e.key, { replace: true });
        setCurrent(e.key);
      };
 
    return <>
    <Menu onClick={onClickMenu} selectedKeys={[current]} mode="horizontal" items={items} />;
    
    
    
    </>
}
export default Folders