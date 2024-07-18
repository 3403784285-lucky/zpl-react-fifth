import React, { useState } from 'react';
import { Avatar, Upload, Button, Tooltip, Tag, Input, message, Modal, Result } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
    ],
});
const PersonalCenter = () => {
    const [nickname, setNickname] = useState('穿花云烛展');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [avatar, setAvatar] = useState('/img/test1.jpg');
    const [signInVisible, setSignInVisible] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);

    const handleNicknameChange = (e) => {
        setNickname(e.target.value);
    };

    const handleNicknameBlur = () => {
        setIsEditingNickname(false);
        message.success('昵称已保存');
    };

    const handleAvatarChange = (info) => {
        const file = info.file.originFileObj;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setAvatar(e.target.result);
                message.success('头像已更新');
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSignIn = () => {
        setIsSignedIn(true);
        setSignInVisible(true);
    };

    const handleModalOk = () => {
        setSignInVisible(false);
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
                        <div className="number flex-r-center-center">{money}</div>
                        <div className="desc">积分</div>

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
                <Button
                    className='m-l-340'
                    size="large"
                    ghost={!isSignedIn}
                    style={{ backgroundColor: isSignedIn ? 'green' : undefined, color: isSignedIn ? 'white' : undefined }}
                    onClick={handleSignIn}
                >
                    <IconFont type={isSignedIn ? "icon-yiqiandao" : "icon-qiandao"} className='font-size-lg' />
                    {isSignedIn ? '已签到' : '每日签到'}
                </Button>
            </div>
        </div>
        <Modal
            visible={signInVisible}
            onOk={handleModalOk}
            onCancel={handleModalOk}
            footer={null}
        >
            <Result
                status="success"
                title="签到成功"
                subTitle="您已成功签到，获得奖励积分+10！"
            />
        </Modal>
    </div>

}
export default PersonalCenter;