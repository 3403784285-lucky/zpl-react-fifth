import React, { useEffect, useState } from 'react';
import { Avatar, Upload, Button, Tooltip, Tag, Input, message, Modal, Result } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { createFromIconfontCN } from '@ant-design/icons';
import { useStorage } from 'web-localstorage-plus';
import fileFun from '../api/user/file';
import userFun from '../api/user/user';
import { setItemsState } from '../store';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
    ],
});
const PersonalCenter = () => {
    const storage=useStorage()
    const [nickname, setNickname] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [isEditingNickname, setIsEditingNickname] = useState(false);
    const [avatar, setAvatar] = useState(storage.getItem("user").avatar);

    const [signInVisible, setSignInVisible] = useState(false);
    const [isSignedIn, setIsSignedIn] = useState(false);
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const [money,setMoney] = useState(storage.getItem("user").money)
    const handleNicknameChange = (e) => {
        setNickname(e.target.value);

    };
    useEffect(() => {
        const fetchData = async () => {
            const res2=await userFun.getUser(storage.getItem("openid"))
            let user=res2.data
            storage.setItem("user",user)
            setAvatar(user.avatar)
            setMoney(user.money)
            setNickname(user.nickname)
            const res = await userFun.checkSign();
            if (res.code == 200) {
                if (res.msg == "未签到") {
                    setIsSignedIn(false)
                    setSignInVisible(false)
                } else {
                    setIsSignedIn(true)
                }
            }

        }
        fetchData()

    })
    const handleNicknameBlur = async () => {
        setIsEditingNickname(false);
        const res = await userFun.update(nickname, avatar, storage.getItem("openid"))
        if (res.code == 200) {
            message.success("信息修改成功")
            const res1 = await userFun.getUser(storage.getItem("openid"))
            storage.setItem("user", res1.data)
        }

    };
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });

    const handleAvatarChange = async (e) => {
        console.log(e)
        const file = e.fileList[0].originFileObj;
        if (file) {

            const formData = new FormData();
            formData.append('file', file);
            const response = await fileFun.upload(formData)
            if (response.code == 200) {
                console.log('文件上传成功:', response.data);
                const uploadedUrl = response.data;
                const res = await userFun.update(nickname, uploadedUrl, storage.getItem("openid"))
                if (res.code == 200) {
                    setAvatar(uploadedUrl);
                    dispatch(setItemsState(uploadedUrl))
                    message.success("信息修改成功,请稍等...")
                    const res1 = await userFun.getUser(storage.getItem("openid"))
                    storage.setItem("user", res1.data)

                }
            };
        }
    };
    const toCenter=()=>{
        storage.setItem("isBuying",false);
        navigate('/my-wallet')
    }
    const handleSignIn = async () => {
        if (!isSignedIn) {
            const res = await userFun.sign()
            if (res.code == 200) {
                setIsSignedIn(true);
                setSignInVisible(true);
                storage.setItem("money",money+10,"user")
                setMoney(money+10)
            }
        }
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
                                onClick={(e)=> e.stopPropagation()}
                                onBlur={handleNicknameBlur}
                                autoFocus
                            />
                        ) : (
                            <Tooltip title="点击编辑昵称">
                                <span onClick={() => setIsEditingNickname(true)}>
                                    {nickname}
                                </span>
                            </Tooltip>
                        )}{storage.getItem("user").level==1?<Tag className='m-l-6' color="cyan">尊贵会员</Tag>:''}

                    </div>

                    <div className='font-size-sm text-color-grey m-l-36 '>{storage.getItem("user").level==1?storage.getItem("user").memberExpireTime:''}</div>
                </div>


                <div className="two flex" style={{ justifyContent: 'space-between' }}>
                    <div className="number-one  m-x-20" onClick={toCenter}>
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