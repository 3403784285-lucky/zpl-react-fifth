import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';

const FindReplace = ({ visible, onClose, onFind, onReplace, onReplaceAll }) => {
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');

  return (
    <Modal
      title={<span>查找 <span style={{ marginLeft: 20, fontWeight: 'bold' }}>替换</span></span>}
      open={visible}
      onCancel={onClose}
      footer={null}
    >
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
        <Button onClick={() => onReplace(findText, replaceText)}>替换</Button>
        <Button type="primary" onClick={() => onReplaceAll(findText, replaceText)}>替换全部</Button>
      </div>
    </Modal>
  );
};

export default FindReplace;