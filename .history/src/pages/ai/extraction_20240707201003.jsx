
import { Radio,Input} from 'antd';   
import {KubernetesOutlined,KeyOutlined} from '@ant-design/icons'
function Extraction(){

    return <div className='p-30'>
    <div className="first-frame flex  " style={{ justifyContent: 'space-between', height: '20px' }}>
    <div className="tip-correction" ><strong> 文本补全</strong></div>
    <div className="refresh-correction "><strong><Radio className='text-color-second'>包括上下文</Radio></strong></div>
    </div>
    <Input placeholder="输入需求开始创作" className='p-10 m-r-10 m-t-20' style={{width:'100%'}} suffix={<KubernetesOutlined className='hover-example' style={{fontSize:'20px'}}/>}  />
    <div className="bottom-frame m-t-20"><KeyOutlined style={{color:'blue'}}/> &nbsp;试试这样问</div>
    </div>

}
export default Extraction;