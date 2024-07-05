
import BaseWrapper from '../../components/base/BaseWrapper'
import styles from './login.module.scss'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import userFun from '../../api/user/user';
import {
  RadiusBottomleftOutlined,
  RadiusBottomrightOutlined,
  RadiusUpleftOutlined,
  RadiusUprightOutlined,
} from '@ant-design/icons';

const Context = React.createContext({
  name: 'Default',
});
const onFinish =async (values) => {
  console.log('Received values of form: ', values);
  const res=await userFun.login(values);
  console.log(res)
  return openNotification('topRight');
};
function Login() {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (placement) => {
    api.info({
      message: `Notification ${placement}`,
      description: <Context.Consumer>{({ name }) => `Hello, ${name}!`}</Context.Consumer>,
      placement,
    });
  };
  const contextValue = useMemo(
    () => ({
      name: 'Ant Design',
    }),
    [],
  );
  return (
   <>
   <BaseWrapper className={`flex-start-center ${styles.back}`}>
   <div
      className={`flex-c-center-center m-l-140 ${styles.card}` }
    >
      <div> 
      <img style={{width:'150px',height:'30px'}} src="/img/logo.png" alt="logo" />
      <h2 className='m-b-30 m-t-10'>登录</h2>
        <Form
      name="normal_login"
      style={{width: '300px'}}
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
        <Button type="primary" htmlType="submit" className="login-form-button" size='large' style={{width:300}}>
          登录
        </Button>
      </Form.Item>
      <Form.Item className='flex-c-center-center'>
        没有帐号？点击<a href=""> <strong>注册</strong></a>
      </Form.Item>
    </Form>
    </div>
     

    </div>
   
   </BaseWrapper>

   </>

  );
}

export default Login;
