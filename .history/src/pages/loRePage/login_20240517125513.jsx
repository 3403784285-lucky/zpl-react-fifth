
import BaseWrapper from '../../components/base/BaseWrapper'
import styles from './login.module.scss'
import { Button, Checkbox, Form, Input } from 'antd';


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
        <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

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
