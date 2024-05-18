
import Atd from './pages/antd';
import BaseWrapper from './components/base/BaseWrapper';
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
      <BaseWrapper className="flex-center-center bg-color-primary">
   
   </BaseWrapper>
 
    </ConfigProvider>
  )
}

export default App