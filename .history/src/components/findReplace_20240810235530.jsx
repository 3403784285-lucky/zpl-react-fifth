import React, { useState } from 'react';
import { Modal, Input, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
const FindReplace = ({ visible, onClose, onFind, onNext, onPrevious, onReplace, onReplaceAll }) => {
    const [findText, setFindText] = useState('');
    const [replaceText, setReplaceText] = useState('');

    if (!visible) return null;

    return (
        <div style={{
            position: 'absolute',
            top: '10%',
            right: '10%',
            transform: 'translateX(-50%)',
            backgroundColor: '#fff',
            boxShadow: '0 0 10px rgba(0,0,0,0.1)',
            padding: '16px',
            borderRadius: '8px',
            zIndex: 1000,
        }}>
            {/* 关闭图标 */}
            <CloseOutlined style={{
                position: 'absolute',
                top: '10px',
                right: '8px',
                fontSize: '16px',
                color: '#999',
            }} />



            <div>
                <h4 className='m-b-10'>查找</h4>
                <Input
                    placeholder="请输入查找内容"
                    value={findText}
                    onChange={e => setFindText(e.target.value)}
                    onKeyUp={() => onFind(findText)}
                />
            </div>
            <div style={{ marginTop: 10 }}>
                <h4 className='m-b-10'>替换为</h4>
                <Input
                    placeholder="请输入替换内容"
                    value={replaceText}
                    onChange={e => setReplaceText(e.target.value)}
                />
            </div>
            <div style={{
                marginTop: 20,
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '10px',
            }}>
                <Button onClick={onPrevious}>上一个</Button>
                <Button onClick={onNext}>下一个</Button>
                <Button onClick={() => onReplace(findText, replaceText)}>替换</Button>
                <Button type="primary" onClick={() => onReplaceAll(findText, replaceText)}>替换全部</Button>
            </div>
        </div>
    );
};


export default FindReplace;