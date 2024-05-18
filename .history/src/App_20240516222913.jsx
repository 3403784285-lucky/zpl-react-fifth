
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
    <ConfigProvider locale={zhCN}>
      <RouterProvider router={router}/>
     
 
    </ConfigProvider>
  )
}

export default App