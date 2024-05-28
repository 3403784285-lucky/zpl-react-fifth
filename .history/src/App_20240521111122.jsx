
import Atd from './pages/antd';
import { RouterProvider } from 'react-router-dom';
import router from './router'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');

function App() {

  return (
    <ConfigProvider locale={zhCN} theme={{
      token: {
        // Seed Token，影响范围大
        colorPrimary: '#00b96b',
        borderRadius: 2,

        // 派生变量，影响范围小
        colorBgContainer: 'white',
      },
    }}>
      <RouterProvider router={router}/>
     
 
    </ConfigProvider>
  )
}

export default App