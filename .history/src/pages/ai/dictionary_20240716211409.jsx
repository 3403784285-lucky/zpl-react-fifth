import { Input, Button, Radio, Menu,Card } from 'antd';


function Dictionary() {

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <div className="p-30" style={{width:'360px'}}>
        <h4 className='m-b-20'>边写边搜</h4>
        <div className="input-frame flex">
            <Input placeholder="请输入关键字可用逗号隔开"  style={{ width: '100%' }} />
            <Button className='bg-color-second text-color-white flex-1 b-rd-6' >推荐</Button>
        </div>

        <div className='flex-c-center-center'>
            <Card className='m-t-20 p-4 shadow flex-c-center-center'
                hoverable

                style={{
                    width: 200,
                    height: 150,
                    overflowY:'auto' 


                }}
            // cover={<img alt="example" src="/img/nodata.png" />}
            >

                {<div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word',}}>
                   暂无数据    </div>}


            </Card>

        </div>

    </div>
}
export default Dictionary;