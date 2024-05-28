
import { Radio,Input } from 'antd';   
const { Search } = Input;
function Generation(){

    return <div className='p-30'>
    
      <div className="first-frame flex  " style={{ justifyContent: 'space-between', height: '20px' }}>
    <div className="tip-correction" ><strong> 文本补全</strong></div>
    <div className="refresh-correction "><strong><Radio className='text-color-second'>包括上下文</Radio></strong></div>
    </div>
    <Search placeholder="input search text" className='p-20 m-r-10' size='large'  enterButton />
    
    </div>
  




}
export default Generation;