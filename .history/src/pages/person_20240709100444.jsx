import React, { useState } from 'react';
import { Avatar, Upload, Button, Modal, Form, Input ,Tag} from 'antd';
import { EditOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const PersonalCenter = () => {

    return <div className="frame " style={{ height: '80.5vh', overflowY: "auto" }}>
        <div className='position-relative' style={{ height: '250px', backgroundImage: "url('/img/person.png')", backgroundSize: 'cover' }}>
            <div className="float-card position-absolute flex-r-start-center p-20" style={{ left: 33, bottom: -125, width: '78vw' }}>
                <div className='flex-c-center-center'>
                    <img src="/img/test1.jpg" className='img-lg b-rd-80 shadow' alt="头像" />
                    <div className='font-size-mlg m-t-10 m-l-10 flex-r-center-center'>穿花云烛展<Tag className='m-l-10' color="cyan">尊贵会员</Tag></div>
                </div>

                <div className="two flex" style={{ justifyContent: 'space-between' }}>
                    <div className="number-one  m-x-20">
                        <div className="number flex-r-center-center">0</div>
                        <div className="desc">云烛币</div>

                    </div>

                    <div className="number-two p-x-20">
                        <div className="number flex-r-center-center">0</div>
                        <div className="desc">下载特权</div>
                    </div>
                    <div className="number-three p-x-20">
                        <div className="number flex-r-center-center">0</div>
                        <div className="desc">优惠卷</div>
                    </div>

                </div>
            </div>
        </div>

    </div>

}
export default PersonalCenter;