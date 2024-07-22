import React, { useEffect, useState } from 'react';
import { AppstoreFilled, BookOutlined, BellOutlined, SketchOutlined, UsergroupAddOutlined, EnvironmentFilled, SlackOutlined, ExceptionOutlined, TranslationOutlined, BuildOutlined, FolderAddOutlined, ApiFilled, ContainerOutlined, QuestionCircleFilled, CodeSandboxOutlined, CoffeeOutlined, FireOutlined, ArrowLeftOutlined, AndroidOutlined } from '@ant-design/icons';
import {  Layout, Menu, theme, Input, Popover } from 'antd';
import { useNavigate, Outlet } from 'react-router-dom';
import userFun from '../../api/user/user';
import { setSearchText } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import {
  FloatButton,
  Button,

} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useStorage } from 'web-localstorage-plus';
import DocumentSearchPage from '../documentSearchPage';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
  ],
});

const { Search } = Input
const { Header, Content, Sider } = Layout;
function getItem(key, icon, label) {
  return {
    key,
    icon,
    label,
  }
}
const itemOnes = [{

  key: '',
  icon: <BellOutlined />,
  label: '首页',

},
getItem('homepage-recommendation', <AppstoreFilled />, '广场'),
getItem('member-center', < FireOutlined />, '会员中心'),
getItem('my-folders', <FolderAddOutlined />, '模板中心'),
getItem('search-document', <SketchOutlined />, '文献中心'),





]
const getFolders = async () => {
  const res = await userFun.getFolders();
  console.log(JSON.stringify(res) + "结束")

}

const itemTwos = [

  getItem('my-favorites', <EnvironmentFilled />, '文件夹'),
  // getItem('my-folders', <ExceptionOutlined />, '我的文件夹'),
  getItem('library', <UsergroupAddOutlined />, '我的共享'),
  getItem('my-file', <BookOutlined />, '我的文件'),
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
  const navigate = useNavigate()
  const onSearch = () => {
    navigate("/search-file")

  };

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const storage = useStorage()
  const [floatLeft, setFloatLeft] = useState(175);
  const [current, setCurrent] = useState('');
  let img = useSelector(state => state.items.value)
  const onClickMenu = (e) => {
    storage.setItem("isFolder", false)
    navigate(e.key, { replace: true })
    setCurrent(e.key);
  }
  const toSmall = (text) => {
    dispatch(setSearchText(text)); // 调用action设置搜索内容
  }
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // getFolders();
  return (
    <Layout >
      <Header className='p-10' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white' }} >
        <div className="pre-frame flex-r-start-end">
          <IconFont type='icon-jihebiaoshi21' className='font-size-vlg m-r-8'></IconFont>
          <img src="/img/logo.png" style={{ width: '85px', height: '28px' }} />
          <Search className='m-l-80' placeholder="请输入关键字"
            onChange={(e) => toSmall(e.target.value)} style={{ width: '300px' }} onClick={onSearch} enterButton />
        </div>
        <div className="after-part flex">
          <Button className=' bg-color-second text-color-white b-rd-10' onClick={() => navigate("/member-center")}>会员中心</Button>
          <IconFont type="icon-icon-yichang " className='font-size-lg m-x-20' />
          <Popover style={{width:200}}} placement="bottom"  color='white' title={<div>
            <div className='p-6 hover-effect b-rd-6' >个人中心</div>
            <div className='p-6 hover-effect b-rd-6'>我的订单</div>
          </div>}>
            <img src={img ?? storage.getItem("user").avatar} onClick={() => { navigate('/person') }} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />

          </Popover>

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


          <Content

            style={{

              marginTop: 30,
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