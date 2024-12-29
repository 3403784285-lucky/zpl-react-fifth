import React, { useEffect, useState } from 'react';
import { Outlet, RouterProvider } from 'react-router-dom';
import router from './router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { TinyColor } from '@ctrl/tinycolor';
import FloatingButton from './components/base/FloatingButton';


function App() {
const [currentRoute,setCurrentRoute]=useState('')
const location=useLocation()
useEffect(()=>{
    setCurrentRoute(location.pathname)
},[location])

    return (<>
    <Outlet />
        <div style={{ position: 'fixed', left: 100, top: 100, zIndex: 1000 }}>
            {
                (currentRoute === '/login') || <FloatingButton />
            }
        </div>
    </>

    );
}

export default App;
