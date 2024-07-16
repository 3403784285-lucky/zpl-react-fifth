import { Input, Button, Radio, Menu,Card } from 'antd';


function Dictionary() {

    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <div className="p-30" style={{width:'240px'}}>
        <h4 className='m-b-20'>边写边搜</h4>
        <div className="input-frame flex">
            <Input placeholder="请输入关键字可用逗号隔开"  style={{ width: '100%' }} />
            <Button className='bg-color-second text-color-white flex-1 b-rd-6' >推荐</Button>
        </div>

        <div className='flex-c-center-center'>
            <Card className='m-t-20 shadow'
                hoverable

                style={{
                    width: 210,


                }}
            // cover={<img alt="example" src="/img/nodata.png" />}
            >

                {<div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                    : 当然，这非常重要，做项目，还可以，但是有时候还是浪费了不少时间。另外心情非常紧张，应该在前一段时间把核心技术讨论掉，否则后面时间就没了，就过去了。
                </div>}


            </Card>

        </div>

    </div>
}
export default Dictionary;