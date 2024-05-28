import React, { useState } from 'react';
import { AppstoreFilled, BellOutlined, EnvironmentFilled, SlackOutlined,ExceptionOutlined,TranslationOutlined,BuildOutlined, FolderAddOutlined,ApiFilled,ContainerOutlined, QuestionCircleFilled, CodeSandboxOutlined, CoffeeOutlined, FireOutlined, ArrowLeftOutlined,AndroidOutlined } from '@ant-design/icons';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Outlet } from 'react-router-dom';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import {
  FloatButton,
  Button,
  DatePicker,
  Input,
} from 'antd';


const { Header, Content, Sider } = Layout;
function getItem(key, icon, label) {
  return {
    key,
    icon,
    label,
  }
}
const itemOnes = [
  getItem('homepage-recommendation', <AppstoreFilled />, '首页推荐'),
  getItem('recent-files', <BellOutlined />, '最近文件'),
  getItem('my-favorites', <EnvironmentFilled />, '我的收藏'),
  getItem('my-folders', <ExceptionOutlined />, '我的文件夹'),
  getItem('library', <FolderAddOutlined />, '素材库'),
  getItem('6', <QuestionCircleFilled />, '回收站')



]
const itemThrees = [
  {
    key: 'intelligent-correction',
    icon: <AndroidOutlined />,
    title: '智能纠错'
  }, 
  {
    key: 'text-completion',
    icon: <ApiFilled />,
   
    title: '文本补全'
  },
   {
    key: 'chapter-generation',
    icon: <ContainerOutlined />,

    title: '篇章生成'
  }, 
  {
    key: 'text-polishing',
    icon: <BuildOutlined />,
    
    title: '文本润色'
  },
  {
    key: 'super-dictionary',
    icon: <TranslationOutlined />,
    
    title: '超级网典'
  },
  {
    key: '16',
    icon: <SlackOutlined/>,
    
    title: '快捷键'
  },
  


]

const itemTwos = [
  getItem('7', < FireOutlined />, '会员中心'),
  getItem('8', <CodeSandboxOutlined />, '会员工具'),
  getItem('9', <CoffeeOutlined />, '会员福利')

]
const items = [
  {
    type: 'group',
    label: '概览',
    children: itemOnes,
  },
  {
    type: 'group',
    label: '会员',
    children: itemTwos,
  },
]



const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [floatLeft, setFloatLeft] = useState(175);
  const navigate = useNavigate()
  const onClickMenu = (e) => {
    navigate(e.key, { replace: true })
  }

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
 
  return (
    <Layout >
      <Header className='p-10' style={{ display: 'flex',alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }} >

        <img src="/img/logo.png" style={{ width: '150px', height: '30px' }} />
        <div className="after-part flex">
        <Button className='m-r-30 bg-color-second text-color-white b-rd-10'>成为会员</Button>
        <img src="https://ts3.cn.mm.bing.net/th?id=OIP-C.p7Zf-FLKq5eU0uessiffgwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
        
        </div>
        


      </Header>
      <Layout>
        <Sider theme='light' className='container' width={200} style={{ overflow: 'auto', height: '91.5vh', position: 'relative' }} collapsed={collapsed}  >
          <FloatButton icon={<ArrowLeftOutlined />} className='hover-button' style={{ left: floatLeft, bottom: 356 }} onClick={() => { if (!collapsed) { setFloatLeft(60) } else { setFloatLeft(175) } setCollapsed(!collapsed); }} />

          <Menu
            mode="inline"
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={['1']}
            onClick={onClickMenu}
          >

          </Menu>

        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>

          <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: '会员中心' }]} />

          <Content
            style={{
             
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              overflow: 'initial',
              borderRadius: borderRadiusLG,
            }}
          >
            <Layout>
              <Sider theme='light' width={650} className="shadow-first" style={{ overflow: 'auto', height: '81.3vh', }} >

                {/*      
          <Form
           
            labelCol={{
              span: 10,
            }}
            wrapperCol={{
              span: 22,
            }}
            
            layout="vertical"
            style={{
              maxWidth: 600,
            }}
          >
        
           
            <Form.Item label="文档名称">
              <Input />
            </Form.Item>
            <Form.Item label="基础模版类型">
              <Select>
                <Select.Option value="demo">Demo</Select.Option>
              </Select>
            </Form.Item>
           
          
            <Form.Item label="文档简介">
              <TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button size='large' className='m-l-40 bg-color-second text-color-white' style={{width:'240px'}}>发布</Button>
            
            </Form.Item>
      
        
          </Form> */}
                <CKEditor

                  editor={ClassicEditor}

                  data="<p>Hello from CKEditor&nbsp;5!</p>"
                  onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                  }}
                  onChange={(event) => {
                    console.log(event);
                  }}
                  onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                  }}
                  onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                  }}

                />

              </Sider>
              <Content className='flex shadow-first '>
                
                <Menu
                  mode="inline"
                  items={itemThrees}
                  style={{ height: '100%', borderRight: 'rgb(0,103,255) 0.5px solid', width: '70px' }}
                  selectedKeys={['1']}
                  inlineCollapsed={true}
                  className='m-l-10 flex-c-center-center'
                  onClick={onClickMenu}
                >
                </Menu>
                <div className="bg-color-white flex-1 b-rd-6">
                <Outlet></Outlet>
                </div>
              </Content>
            </Layout>

          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;