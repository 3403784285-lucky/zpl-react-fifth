import React from 'react';


import { Breadcrumb, Layout, Menu, theme } from 'antd';

const { Header, Content, Sider } = Layout;


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
            <Menu.Item><Icon type="unordered-list" />首页推荐</Menu.Item>
            <Menu.Item>菜单项</Menu.Item>
            <Menu.Item>菜单项</Menu.Item>
            <Menu.Item>菜单项</Menu.Item>
            <Menu.Item>菜单项</Menu.Item>
            </Menu.ItemGroup>
          
          <Menu.Item>菜单项</Menu.Item>
          <Menu.Item>菜单项</Menu.Item>
          <Menu.Item>菜单项</Menu.Item>
          <Menu.Item>菜单项</Menu.Item>
          <Menu.Item>菜单项</Menu.Item>
          <Menu.Item>菜单项</Menu.Item>
          <Menu.Item>菜单项</Menu.Item>
          <Menu.Item>菜单项</Menu.Item>
          <Menu.Item>菜单项</Menu.Item>

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