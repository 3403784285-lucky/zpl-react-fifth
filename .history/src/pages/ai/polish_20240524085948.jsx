import { TextArea } from 'antd';  
function Polishing(){


    return<div className="p-30">
    <h4>文本润色</h4>
    <div className="text-frame">
    <TextArea
      showCount
      maxLength={100}
      onChange={onChange}
      placeholder="disable resize"
      style={{
        height: 120,
        resize: 'none',
      }}
    />

    </div>
    
    
    
    </div>
}
export default Polishing;