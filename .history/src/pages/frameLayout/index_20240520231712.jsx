import React from 'react';
import {AppstoreFilled,BellOutlined,EnvironmentFilled,ExceptionOutlined,FolderAddOutlined,QuestionCircleFilled}  from '@ant-design/icons';

import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;
function getItem(key, icon,label) {
  return {
    key,
    icon,
    label,
  }
}
const itemOnes = [
  getItem('1',<AppstoreFilled/>,'首页推荐'),
  getItem('2',<AppstoreFilled/>,'最近文件'),
  getItem('3',<AppstoreFilled/>,'我的收藏'),
  getItem('4',<AppstoreFilled/>,'我的文件夹'),
  getItem('5',<AppstoreFilled/>,'素材库'),
  getItem('1',<AppstoreFilled/>,'回收站')

 

]
const itemTwos = [
  getItem(<AppstoreFilled/>&nbsp;首页推荐),
  getItem(<BellOutlined/>&nbsp;最近文件),
  getItem('内容管理', '3', <EditOutlined />),
  getItem('内容管理', '3', <EditOutlined />),
  getItem('内容管理', '3', <EditOutlined />),
  getItem('内容管理', '3', <EditOutlined />),
  getItem('内容管理', '3', <EditOutlined />),
  getItem('内容管理', '3', <EditOutlined />),
  getItem('内容管理', '3', <EditOutlined />),

]


const Index = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout >
      <Header  style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between',backgroundColor:'white' }} >
        <div className="demo-logo" />
        
        
      </Header>
      <Layout>
        <Sider theme='light' width={200} style={{ background: colorBgContainer }}>
          <Menu
            mode="inline"
            
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.ItemGroup title="概览">
            <Menu.Item><AppstoreFilled/>&nbsp;首页推荐</Menu.Item>
            <Menu.Item><BellOutlined/>&nbsp;最近文件</Menu.Item>
            <Menu.Item><EnvironmentFilled/>&nbsp;我的收藏</Menu.Item>
            <Menu.Item><FolderAddOutlined/>&nbsp;我的文件夹</Menu.Item>
            <Menu.Item><ExceptionOutlined/>&nbsp;素材库</Menu.Item>
            <Menu.Item><QuestionCircleFilled/>&nbsp;回收站</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="会员">
            <Menu.Item><AppstoreFilled/>&nbsp;会员中心</Menu.Item>
            <Menu.Item><BellOutlined/>&nbsp;会员工具</Menu.Item>
            <Menu.Item><EnvironmentFilled/>&nbsp;会员福利</Menu.Item>
           
            </Menu.ItemGroup>
          
          
         
          </Menu>
          
        </Sider>
        <Layout style={{ padding: '0 24px 24px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default  Index;