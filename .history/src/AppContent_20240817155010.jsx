import React, { useEffect, useState } from 'react';
import { Outlet, RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { TinyColor } from '@ctrl/tinycolor';
import FloatingButton from './components/base/FloatingButton';
import { useStorage } from 'web-localstorage-plus';

function App() {
    const [currentRoute, setCurrentRoute] = useState('')
    const location = useLocation()
    useEffect(()=>{
       setCurrentRoute(location.pathname.split('/')[1])
    },[location])
   
    return (<>
        <Outlet />
        <div style={{ position: 'fixed', left: 0, top: 0, zIndex: 1000 }}>
            {
                (currentRoute === '/login') || <FloatingButton />
            }
        </div>
    </>
    );
}

export default App;
