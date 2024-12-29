import React, { useEffect, useState } from 'react';
import { RouterProvider, useLocation } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { TinyColor } from '@ctrl/tinycolor';
import FloatingButton from './components/base/FloatingButton';

dayjs.locale('zh-cn');
const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());
let hash=window.location.hash
function App() {
  const [currentRoute, setCurrentRoute] = useState('');
  const location=useLocation()


  useEffect(() => {
    const handleHashChange = () => {
      // const pathParts = window.location.hash.split('/');
      // setCurrentRoute(pathParts[1] || '');
    console.log(1)

    };

    // 监听hashchange事件
    window.addEventListener('hashchange', handleHashChange);

    

    // 在组件卸载时移除监听器
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <ConfigProvider locale={zhCN} theme={{
      token: {
        borderRadius: 2,
        colorBgContainer: 'white',
      },
      components: {
        Button: {
          colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
          colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
          colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
          lineWidth: 0,
          defaultGhostColor: '#61649f',
          ghostBg: 'rgba(99,187,208,0.1)',
        },
        Table: {
          borderColor: 'white',
          headerBg: `rgb(13,112,255)`,
          headerColor: 'white',
          headerBorderRadius: 8,
          borderColor: 'rgba(13,112,255,0.3)',
          rowHoverBg: 'rgba(51,136,239,0.3)',
          headerSortActiveBg: '#61649f',
        },
      },
    }}>
      <div style={{ position: 'fixed', left: 100, top: 100, zIndex: 1000 }}>
        {
          (location.hash.split('/')[1] === 'login' || location.hash.split('/')[1] === '') || <FloatingButton />
        }
      </div>
    </ConfigProvider>
  );
}

export default App;
