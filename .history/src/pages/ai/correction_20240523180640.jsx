
import { Badge, Space, Switch } from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons'
function Correction(){
  return <>
  <div className="div">
    <div className="first-frame flex p-30 " style={{justifyContent:'space-between',height:'50px'}}>
        <div className="tip-correction" ><strong> 智能纠错</strong></div>
        <div className="refresh-correction text-color-second"><strong><QuestionCircleOutlined/> &nbsp;纠错刷新</strong></div>
    </div>

    

    <img style={{width:'100%'}} src="/img/nodata.png" alt="没有数据" />
    <div className="tip-text text-color-grey flex-r-center-center">暂时没有发现任何可以修改的问题，再接再厉哦</div>


  </div>
  
  
  
  </>


}


export default Correction;