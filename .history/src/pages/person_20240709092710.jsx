import React, { useState } from 'react';
import { Avatar, Upload, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const PersonalCenter = () => {

return <div  className="frame " style={{ height: '80.5vh', overflowY: "auto" }}>
        <div className='position-relative' style={{height:'250px',backgroundImage:"url('/img/person.png')",backgroundSize:'cover'}}>
        <div className="info-back position-absolute shadow" style={{left:30,bottom:-85}}>
            <img src="/img/test1.jpg" className='img-lg b-rd-80'  alt="头像" />
        </div>
        </div>

    </div>

}
export default PersonalCenter;