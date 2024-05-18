
import BaseWrapper from '../../components/base/BaseWrapper'
import styles from './login.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';


const onFinish = (values) => {
  console.log('Received values of form: ', values);
};
function Login() {

  return (
   <>
   <BaseWrapper className={`flex-start-center ${styles.back}`}>
   <div
      className={`flex-c-center-center m-l-140 ${styles.loginCard}` }
    >
      <h1>登录</h1>
        <Form
      name="normal_login"
      style={{width: '300px'}}
      className="login-form m-t-50"
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
      <Form.Item>
     

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>

    </div>
   
   </BaseWrapper>

   </>

  );
}

export default Login;
