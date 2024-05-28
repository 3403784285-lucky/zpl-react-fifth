import { Input, Button, Radio } from 'antd';
function Dictionary() {
    return <div className="p-30">
        <h4 className='m-b-20'>超级网点</h4>
        <div className="input-frame flex">
            <Input placeholder="请输入关键字可用逗号隔开" size='large' style={{ width: '320px' }} />
            <Button className='bg-color-second text-color-white flex-1 b-rd-6' size='large'>推荐</Button>
        </div>
        <Radio.Group className='m-t-10 flex-r-center-center' defaultValue="a" buttonStyle="solid">
            <Radio.Button value="a">词推荐</Radio.Button>
            <Radio.Button value="b">句推荐</Radio.Button>
            <Radio.Button value="c">篇章推荐</Radio.Button>
            
        </Radio.Group>


    </div>
}
export default Dictionary;