
import { Radio } from 'antd';   
function Generation(){

    return <>
    
      <div className="first-frame flex  " style={{ justifyContent: 'space-between', height: '20px' }}>
    <div className="tip-correction" ><strong> 文本补全</strong></div>
    <div className="refresh-correction "><strong><Radio className='text-color-second'>包括上下文</Radio></strong></div>
    </div>
    
    </>
  




}
export default Generation;