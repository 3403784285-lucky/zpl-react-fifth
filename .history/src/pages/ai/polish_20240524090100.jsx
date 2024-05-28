import { Input} from 'antd';  
const {TextArea}=Input
function Polishing(){


    return<div className="p-30">
    <h4>文本润色</h4>
    <div className="text-frame">
    <TextArea
      showCount
      maxLength={100}
    
     
      style={{
        height: 120,
        resize: 'none',
      }}
    />

    </div>
    
    
    
    </div>
}
export default Polishing;