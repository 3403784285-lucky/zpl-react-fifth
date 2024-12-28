import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const FindReplace =  ({ visible, onClose, onFind, onNext, onPrevious, onReplace, onReplaceAll }) => {
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');
  
    if (!visible) return null;
  
    return (
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        transform: 'translateX(-50%)',
        backgroundColor: '#fff',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)',
        padding: '16px',
        borderRadius: '8px',
        zIndex: 1000,
      }}>
        <div>
          <label>查找</label>
          <Input 
            placeholder="请输入查找内容" 
            value={findText} 
            onChange={e => setFindText(e.target.value)}
            onKeyUp={() => onFind(findText)}
          />
        </div>
        <div style={{ marginTop: 10 }}>
          <label>替换为</label>
          <Input 
            placeholder="请输入替换内容" 
            value={replaceText} 
            onChange={e => setReplaceText(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 20, display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={onPrevious}>上一个</Button>
          <Button onClick={onNext}>下一个</Button>
          <Button onClick={() => onReplace(findText, replaceText)}>替换</Button>
          <Button type="primary" onClick={() => onReplaceAll(findText, replaceText)}>替换全部</Button>
        </div>
        <Button 
          style={{ marginTop: 10, float: 'right' }}
          type="link"
          onClick={onClose}
        >
          关闭
        </Button>
      </div>
    );
  };
  

export default FindReplace;