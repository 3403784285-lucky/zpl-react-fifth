
import BaseWrapper from '../../components/base/BaseWrapper'
import styles from './login.module.scss'
import { Button, Checkbox, Form, Input } from 'antd';


const onFinish= (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};
function Login() {

  return (
   <>
   <BaseWrapper className={`flex-start-center ${styles.back}`}>
   <div
      className={`flex-c-center-center m-l-140 ${styles.loginCard}` }
    >
       <Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
       登录
      </Button>
    </Form.Item>
  </Form>


    </div>
   
   </BaseWrapper>

   </>

  );
}

export default Login;
