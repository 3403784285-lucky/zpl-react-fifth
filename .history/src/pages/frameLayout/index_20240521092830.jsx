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
  getItem('2',<BellOutlined/>,'最近文件'),
  getItem('3',<EnvironmentFilled/>,'我的收藏'),
  getItem('4',<ExceptionOutlined/>,'我的文件夹'),
  getItem('5',<FolderAddOutlined/>,'素材库'),
  getItem('6',<QuestionCircleFilled/>,'回收站')

 

]
const itemTwos = [
  getItem('1',<AppstoreFilled/>,'会员中心'),
  getItem('2',<AppstoreFilled/>,'会员工具'),
  getItem('3',<AppstoreFilled/>,'会员福利')

]
const items=[
  {
    type: 'group',
    label: '概览',
    children: itemOnes,
  }, 
  {
    type: 'group',
    label: '会员',
    children:itemTwos,
  },
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
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={'1'}
          >
           
           
           
          
         
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