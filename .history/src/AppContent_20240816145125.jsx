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
const navigate = useNavigate();

useEffect(()=>{
    setCurrentRoute(location.pathname)
},[location])


useEffect(() => {
  const userRole = storage.getItem('userRole'); // 假设userRole存储在storage中

  if (userRole === 'admin') {
    navigate('/statistics'); // 管理员重定向到统计页面
  } else {
    navigate('/homepage-recommendation'); // 普通用户重定向到首页推荐页面
  }
}, [navigate]);


    return (<>
    <Outlet />
        <div  style={{ position: 'fixed', left: 0, top: 0, zIndex: 1000 }}>
            {
                (currentRoute === '/login') || <FloatingButton />
            }
        </div>
    </>

    );
}

export default App;
