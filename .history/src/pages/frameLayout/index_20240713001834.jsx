import React, { useState } from 'react';
import { AppstoreFilled,BookOutlined, BellOutlined,UsergroupAddOutlined, EnvironmentFilled, SlackOutlined, ExceptionOutlined, TranslationOutlined, BuildOutlined, FolderAddOutlined, ApiFilled, ContainerOutlined, QuestionCircleFilled, CodeSandboxOutlined, CoffeeOutlined, FireOutlined, ArrowLeftOutlined, AndroidOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme ,Input} from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import userFun from '../../api/user/user';

import {
  FloatButton,
  Button,

} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_7balxnqm0f5.js'
  ],
});
const onSearch = (value, _e, info) => console.log(info?.source, value);
const {Search}=Input
const { Header, Content, Sider } = Layout;
function getItem(key, icon, label) {
  return {
    key,
    icon,
    label,
  }
}
const itemOnes = [
  getItem('homepage-recommendation', <AppstoreFilled />, '首页'),
  {
  
    key: '',
    icon: <BellOutlined />,
    label: (<a className='text-color-black' href="http://localhost:5173/#/">最近文件</a>),
  
  
    children: [

      {
        key: '1',
        label: '文件1',
      },
      {
        key: '2',
        label: '文件2',
      },
    ],
  },
  getItem('my-favorites', <EnvironmentFilled />, '我的收藏'),
  // getItem('my-folders', <ExceptionOutlined />, '我的文件夹'),
  getItem('library', <UsergroupAddOutlined />, '我的共享'),
  



]
const getFolders= async()=>{
  const res=await userFun.getFolders();
  console.log(JSON.stringify(res)+"结束")

}

const itemTwos = [
  getItem('member-center', < FireOutlined />, '会员中心'),
  getItem('my-folders',<FolderAddOutlined />, '模板中心'),
  getItem('my-file',<BookOutlined />, '我的文件'),
  getItem('recycle-bin', <QuestionCircleFilled />, '回收站')

]
const items = [
  {
    type: 'group',
    label: '概览',
    children: itemOnes,
  },
  {
    type: 'group',
    label: '我的',
    children: itemTwos,
  },
]



const Index = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [floatLeft, setFloatLeft] = useState(175);
  const [current, setCurrent] = useState('homepage-recommendation');
  const navigate = useNavigate()
  const onClickMenu = (e) => {
    navigate(e.key, { replace: true })
    setCurrent(e.key);
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // getFolders();
  return (
    <Layout >
      <Header className='p-10' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }} >
        <div className="pre-frame flex-r-start-center"> 
          <IconFont type='icon-jihebiaoshi21' className='font-size-vlg'></IconFont>
        <img className='img-lg' src="/img/logo.png" style={{ width: '150px', height: '30px' }} />
        <Search className='m-l-40' placeholder="请输入关键字" style={{width:'300px'}} onSearch={onSearch} enterButton />
        </div>
        <div className="after-part flex">
          <Button className=' bg-color-second text-color-white b-rd-10'>成为会员</Button>
          <IconFont type="icon-icon-yichang " className='font-size-lg m-x-20' />
          <img src="https://ts3.cn.mm.bing.net/th?id=OIP-C.p7Zf-FLKq5eU0uessiffgwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2" style={{ width: '35px', height: '35px', borderRadius: '50%' }} />

        </div>
      </Header>
      <Layout>
        <Sider theme='light' className='container' width={200} style={{ overflow: 'auto', height: '91vh', position: 'relative' }} collapsed={collapsed}  >
          <FloatButton icon={<ArrowLeftOutlined />} className='hover-button' style={{ left: floatLeft, bottom: 356 }} onClick={() => { if (!collapsed) { setFloatLeft(60) } else { setFloatLeft(175) } setCollapsed(!collapsed); }} />

          <Menu
            mode="inline"
            selectedKeys={[current]}
        
            items={items}
            style={{ height: '100%', borderRight: 0 }}
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
            {/* <FloatButton icon={ <IconFont  type="icon-dangao" />} style={{right:40,bottom:50}} onClick={() => console.log('onClick')} /> */}
            <Outlet ></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;