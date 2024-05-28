import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom'; // 导入 useNavigate 和 Outlet
import { AppstoreFilled, BellOutlined, EnvironmentFilled, SlackOutlined, ExceptionOutlined, TranslationOutlined, BuildOutlined, FolderAddOutlined, ApiFilled, ContainerOutlined, QuestionCircleFilled, CodeSandboxOutlined, CoffeeOutlined, FireOutlined, ArrowLeftOutlined, AndroidOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { FloatButton, Button } from 'antd';

const { Header, Content, Sider } = Layout;

// 其他代码...

const Index = () => {
  // 其他逻辑...

  return (
    <Layout >
      {/* 其他部分 */}
      <Layout>
        <Sider theme='light' className='container' width={200} style={{ overflow: 'auto', height: '91.5vh', position: 'relative' }} collapsed={collapsed}  >
          {/* 其他部分 */}
          <Menu
            mode="inline"
            items={items}
            style={{ height: '100%', borderRight: 0 }}
            selectedKeys={['1']}
            onClick={onClickMenu}
          />
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
            {/* 使用 Outlet 渲染嵌套路由的子组件 */}
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default Index;
