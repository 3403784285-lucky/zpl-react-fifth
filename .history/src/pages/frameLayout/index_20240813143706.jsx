import React, { useEffect, useState } from 'react';
import { AppstoreFilled, BookOutlined, HomeOutlined,RadiusSettingOutlined , SnippetsOutlined,ArrowDownOutlined, CreditCardOutlined, BellOutlined, SketchOutlined, UsergroupAddOutlined, EnvironmentFilled, SlackOutlined, ExceptionOutlined, TranslationOutlined, BuildOutlined, FolderAddOutlined, ApiFilled, ContainerOutlined, QuestionCircleFilled, CodeSandboxOutlined, CoffeeOutlined, FireOutlined, ArrowLeftOutlined, AndroidOutlined } from '@ant-design/icons';
import { Layout, Menu, theme, Input, Popover, message } from 'antd';
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
import FloatingButton from '../../components/base/FloatingButton';
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
const itemOnesCopy = [
  getItem('statistics', <EnvironmentFilled />, '数据统计'),
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
const itemTwosCopy = [
  getItem('user-manage', <UsergroupAddOutlined />, '用户管理'),
  getItem('api-manage', <BookOutlined />, '接口管理'),
  getItem('order-manage', <SnippetsOutlined />, '订单管理'),
  getItem('price-manage', <QuestionCircleFilled />, '价格表'),
  getItem('module-manage', <RadiusSettingOutlined />, '模板管理'),

]
const Index = () => {
  const navigate = useNavigate()
  const onSearch = () => {
    navigate("/search-file")

  };
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const storage = useStorage()
  const [status, setStatus] = useState('')
  const [floatLeft, setFloatLeft] = useState(175);
  const [current, setCurrent] = useState('');
  let img = useSelector(state => state.items.value)
  const onClickMenu = (e) => {
    storage.setItem("isFolder", false)
    navigate(e.key, { replace: true })
    setCurrent(e.key);
  }
  console.log(status)
  const items = [
    {
      type: 'group',
      label: '概览',
      children: status == "user" ? itemOnes : itemOnesCopy,
    },
    {
      type: 'group',
      label: '我的',
      children: status == "user" ? itemTwos : itemTwosCopy,
    },
  ]
  useEffect(() => {
    let state = storage.getItem("user")?.userRole
    if (state) setStatus(state)
  }, [storage.getItem("user")?.userRole])
  const toSmall = (text) => {
    dispatch(setSearchText(text)); // 调用action设置搜索内容
  }
  const logout = async () => {
    const res = await userFun.logout()
    if (res.code == 200) {
      message.success("退出成功")
      storage.clear()
      navigate('/login')
    }
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
          {status == "user" && <Search className='m-l-80' placeholder="请输入关键字"
            onChange={(e) => toSmall(e.target.value)} style={{ width: '300px' }} onClick={onSearch} enterButton />}
        </div>
        <div className="after-part m-r-20 flex">
          {status && <Button className=' bg-color-second text-color-white b-rd-10' onClick={() => navigate("/member-center")}>会员中心</Button>}
          <IconFont type="icon-icon-yichang " className='font-size-lg m-x-20' />
          <Popover placement="bottom"
            content={<div>
              {status == "user" && <><div className='b-rd-6 flex hover-effect p-6' onClick={() => navigate('/person')}> <HomeOutlined className='m-x-6' /><div >个人中心</div></div>
              <div className='b-rd-6 flex hover-effect p-6' onClick={() => navigate('/my-order')}><CreditCardOutlined className='m-x-6' /><div>我的订单</div></div>
            </>  }
              <div className='b-rd-6 flex hover-effect p-6' onClick={logout}><ArrowDownOutlined className='m-x-6' /><div>退出登录</div></div>
            </div>
            }
          >
            <img src={img ?? storage.getItem("user")?.avatar ?? ''} disabled={status == "user"} style={{ width: '35px', height: '35px', borderRadius: '50%' }} />
          </Popover>
        </div>
      </Header>
      <Layout>
        <Sider theme='light' className='container' width={200} style={{ overflow: 'auto', height: '91vh', position: 'relative' }} collapsed={collapsed}  >
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
            <Outlet ></Outlet>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;