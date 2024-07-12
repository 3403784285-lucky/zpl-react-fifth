import { Input, Button, Radio,Menu } from 'antd';


function Dictionary() {

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <div className="p-30">
        <h4 className='m-b-20'>边写边搜</h4>
        <div className="input-frame flex">
            <Input placeholder="请输入关键字可用逗号隔开" size='large' style={{ width: '320px' }} />
            <Button className='bg-color-second text-color-white flex-1 b-rd-6' size='large'>推荐</Button>
        </div>
      


    </div>
}
export default Dictionary;