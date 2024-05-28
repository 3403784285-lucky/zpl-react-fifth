import { Input,Button } from 'antd';
function Dictionary(){
  return <div className="p-30">
  <h4 className='m-b-20'>超级网点</h4>
  <div className="input-frame flex">
    <Input placeholder="Basic usage"  size='large' style={{width:'320px'}}/>
    <Button className='bg-color-second text-color-white flex-1 b-rd-6' size='large'>推荐</Button>
  </div>
  

</div>
}
export default Dictionary;