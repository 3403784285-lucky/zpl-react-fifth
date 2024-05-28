import {QuestionCircleOutlined} from '@ant-design/icons'

function Completion(){

    return <div className="frame">
    <div className="first-frame flex p-30 " style={{justifyContent:'space-between',height:'100px'}}>
        <div className="tip-correction" ><strong> 文本补全</strong></div>
        <div className="refresh-correction text-color-second"><strong><QuestionCircleOutlined/>&nbsp;换一批</strong></div>
    </div>
    
    

    </div>

}
export default Completion;