import { Input} from 'antd';  
const {TextArea}=Input
function Polishing(){


    return<div className="p-30">
    <h4>文本润色</h4>
    <div className="text-frame b-rd-10 m-t-15 p-10" style={{border:'grey 1px solid '}}>
    <TextArea
      maxLength={100}
      style={{
        height: 100,
        resize: 'none',
        border:0
      }}
    />

    </div>
    
    
    
    </div>
}
export default Polishing;