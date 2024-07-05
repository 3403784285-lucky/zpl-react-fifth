import { Input, Button, Radio,Menu } from 'antd';

const items = [
    {
        label: '单语词典',
        key: 'mail',
    
    }, {
        label: '双语词典',
        key: 'hah',
     
    },
]

function Library()
{
    
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <div className="h-full p-30" >
         <Menu className='m-10' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
     
    
    
    
    </div>
}
export default Library