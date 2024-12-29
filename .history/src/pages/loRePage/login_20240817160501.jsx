
import BaseWrapper from '../../components/base/BaseWrapper'
import styles from './login.module.scss'
import React, { useMemo } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message, notification } from 'antd';
import userFun from '../../api/user/user';
import { useStorage } from "web-localstorage-plus";
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
  ],
});

import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux'
// import { setToken} from "../../store";
function Login() {
  let navigate = useNavigate()
  const storage = useStorage();
  // const token = useSelector(state => state.token.value)
  // const dispatch = useDispatch()
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    let res = await userFun.login(values);
    console.log(res)
    storage.setItem("token", res.data.token);
    storage.setItem("openid", res.data.openid);
    notification.success({ message: '登录成功' });
    const res1 = await userFun.getUser(storage.getItem("openid"))
    if(res.code==200){
      storage.setItem("user", res1.data)
      let p={x:50,y:50}
      storage.setItem("buttonPosition",JSON.stringify(p))
      if(res1.data.userRole=='admin'){
        navigate('/statistics')

      }else{
        navigate('/')
      }

    }
  };
  return (
    <>
      <BaseWrapper className={`flex-start-center ${styles.back}`}>
        <div
          className={`flex-c-center-center m-l-140 ${styles.card}`}
        >
          <div>
            <div className='flex-r-start-center'>  <IconFont type='icon-jihebiaoshi21' className='font-size-vlg m-r-8'></IconFont>
              <img src="/img/logo.png" style={{ width: '90px', height: '28px' }} /></div>

            <h2 className='m-b-30 m-t-10'>登录</h2>
            <Form
              name="normal_login"
              style={{ width: '300px' }}
              className="login-form "
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: '账号不能为空!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} size='large' placeholder="请输入账号" />
              </Form.Item>
              <Form.Item
                name="password"
                className='m-t-30 m-b-10'
                rules={[{ required: true, message: '密码不能为空' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  size='large'
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item className='flex-l-start-start'>
                <a className="login-form-forgot font-size-sm" href="">
                  忘记密码
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button" size='large' style={{ width: 300 }}>
                  登录
                </Button>
              </Form.Item>
              <Form.Item className='flex-c-center-center'>
                没有帐号？点击<a href="/#/register"> <strong>注册</strong></a>
              </Form.Item>
            </Form>
          </div>


        </div>

      </BaseWrapper>

    </>

  );
}

export default Login;
