


import { Menu } from 'antd';
const items = [
    {
      label: 'Navigation One',
      key: 'mail',
      icon: <AppstoreTwoTone />,
    },
    {
      label: 'Navigation Two',
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