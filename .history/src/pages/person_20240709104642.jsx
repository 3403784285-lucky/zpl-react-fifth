import React, { useState } from 'react';
import { Avatar, Upload, Button, Modal, Form, Input, Tag } from 'antd';
import { EditOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const PersonalCenter = () => {

    return <div className="frame " style={{ height: '80.5vh', overflowY: "auto" }}>
        <div className='position-relative' style={{ height: '250px', backgroundImage: "url('/img/person.png')", backgroundSize: 'cover' }}>
            <div className="float-card position-absolute flex-r-start-center p-50" style={{ left: 33, bottom: -150, width: '78vw' }}>
                <div className='flex-c-center-center p-x-20'>
                   
                    <img src="/img/test1.jpg" className='img-lg b-rd-80 shadow' alt="头像" />
                    <div className='font-size-mlg m-t-10 flex-r-start-center'>
                        穿花云烛展<Tag className='m-l-8' color="cyan">尊贵会员</Tag>
                       
                        {/* <Tag className='m-l-8' color="cyan">尊贵会员</Tag>
                        <div className='font-size-sm text-color-grey'>2024-08-22到期</div> */}

                    </div>
                    
                    
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