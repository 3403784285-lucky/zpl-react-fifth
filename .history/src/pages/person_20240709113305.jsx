import React, { useState } from 'react';
import { Avatar, Upload, Button, Modal, Tooltip, Input, Tag } from 'antd';
import { EditOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_5z1xxgf2qwa.js'
    ],
});
const PersonalCenter = () => {

    const [nickname, setNickname] = useState('穿花云烛展');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [avatar, setAvatar] = useState('/img/test1.jpg');

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleNicknameBlur = () => {
        setIsEditingNickname(false);
        message.success('昵称已保存');
    };

    const handleAvatarChange = (info) => {
        const file = info.file.originFileObj;
        const reader = new FileReader();
        reader.onload = (e) => {
            setAvatar(e.target.result);
            message.success('头像已更新');
        };
        reader.readAsDataURL(file);
    };


    return <div className="frame " style={{ height: '80.5vh', overflowY: "auto" }}>
        <div className='position-relative' style={{ height: '250px', backgroundImage: "url('/img/person.png')", backgroundSize: 'cover' }}>
            <div className="float-card position-absolute flex-r-start-center p-50" style={{ left: 33, bottom: -160, width: '78vw' }}>
                <div className=' p-x-20'>
                    <Tooltip title="点击更换头像">
                        <Upload
                            showUploadList={false}
                            beforeUpload={() => false}
                            onChange={handleAvatarChange}
                        >
                            <Avatar
                                src={avatar}
                                size={160}
                                icon={<UserOutlined />}
                                className='shadow'
                            />
                        </Upload>
                    </Tooltip>
                    {/* <img src="/img/test1.jpg" className='img-lg b-rd-80 shadow' alt="头像" /> */}
                    <div className='font-size-mlg m-t-10 m-l-10 flex-r-start-center'>
                        {isEditingNickname ? (
                            <Input
                                value={nickname}
                                onChange={handleNicknameChange}
                                onBlur={handleNicknameBlur}
                                autoFocus
                            />
                        ) : (
                            <Tooltip title="点击编辑昵称">
                                <span onClick={() => setIsEditingNickname(true)}>
                                    {nickname}
                                </span>
                            </Tooltip>
                        )}<Tag className='m-l-6' color="cyan">尊贵会员</Tag>

                    </div>

                    <div className='font-size-sm text-color-grey m-l-36 '>2024-08-22到期</div>
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
                <Button className='m-l-340' size="large" ghost><IconFont type="icon-qiandao" className='font-size-lg'></IconFont>每日签到</Button>

            </div>
        </div>

    </div>

}
export default PersonalCenter;