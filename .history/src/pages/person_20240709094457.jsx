import React, { useState } from 'react';
import { Avatar, Upload, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const PersonalCenter = () => {

return <div  className="frame " style={{ height: '80.5vh', overflowY: "auto" }}>
        <div className='position-relative' style={{height:'250px',backgroundImage:"url('/img/person.png')",backgroundSize:'cover'}}>
        <div className="float-card position-absolute flex-r-start-center" style={{left:30,bottom:-80,width:'70vw'}}>
            <img src="/img/test1.jpg" className='img-lg b-rd-80 shadow'  alt="头像" />
            <div className='font-size-vlg m-l-20'>穿花云烛展</div>
        </div>
        </div>

    </div>

}
export default PersonalCenter;