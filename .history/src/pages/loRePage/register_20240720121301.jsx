
import BaseWrapper from '../../components/base/BaseWrapper'
import styles from './login.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import userFun from '../../api/user/user';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
  ],
});


function Register() {
  const navigate = useNavigate()

  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    const res = await userFun.register(values)
    
      message.success("注册成功");
      navigate("/login")
    

  };
  return (
    <>
      <BaseWrapper className={`flex-start-center ${styles.registerBack}`}>
        <div
          className={`flex-c-center-center m-l-140 ${styles.card}`}
        >
          <div>
            <div className='flex-r-start-center'>  <IconFont type='icon-jihebiaoshi21' className='font-size-vlg m-r-8'></IconFont>
              <img src="/img/logo.png" style={{ width: '90px', height: '28px' }} /></div>

            <h2 className='m-b-30 m-t-10'>注册</h2>
            <Form
              name="normal_login"
              style={{ width: '300px' }}
              className="login-form "
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="username"
                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input prefix={<UserOutlined className="site-form-item-icon" />} size='large' placeholder="请输入账号" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: 'Please input your Password!' }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  size='large'
                  placeholder="请输入密码"
                />
              </Form.Item>
              <Form.Item
                name="username"
                className=' m-b-10'

                rules={[{ required: true, message: 'Please input your Username!' }]}
              >
                <Input size='large' className='m-r-40' placeholder="请输入邀请码(可选)" style={{ width: 160 }} />
                <Button type="primary" htmlType="submit" className="login-form-button" size='large' style={{ width: 100 }}>
                  邀请码
                </Button>
              </Form.Item>
              <Form.Item className='flex-l-start-start'>
                <a className="login-form-forgot font-size-sm" href="">
                  修改密码
                </a>
              </Form.Item>

              <Form.Item>
                <Button type="primary"  htmlType="submit" className="login-form-button" size='large' style={{ width: 300 }}>
                  注册
                </Button>
              </Form.Item>
              <Form.Item className='m-b-10 flex-c-center-center'>


                已有帐号？点击<a href="/#/login">
                  <strong>登录</strong></a>
              </Form.Item>
            </Form>
          </div>


        </div>

      </BaseWrapper>

    </>

  );
}

export default Register;
