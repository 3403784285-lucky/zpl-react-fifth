
import Atd from './pages/antd';
import Copy from './pages/copy';

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
      <br />
      <Copy/>

      <Atd/>
      <br/>
 
    </ConfigProvider>
  )
}

export default App