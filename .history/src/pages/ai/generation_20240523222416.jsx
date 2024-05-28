
import { Radio,Input,Button } from 'antd';   
import {KubernetesOutlined} from '@ant-design/icons'
function Generation(){

    return <div className='p-30'>
    
      <div className="first-frame flex  " style={{ justifyContent: 'space-between', height: '20px' }}>
    <div className="tip-correction" ><strong> 文本补全</strong></div>
    <div className="refresh-correction "><strong><Radio className='text-color-second'>包括上下文</Radio></strong></div>
    </div>
    <Input placeholder="input search text" className='p-10 m-10' suffix={<KubernetesOutlined/>}  />
    
    </div>
  




}
export default Generation;