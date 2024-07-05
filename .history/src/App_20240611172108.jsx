
import Atd from './pages/antd';
import { RouterProvider } from 'react-router-dom';
import router from './router'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { TinyColor } from '@ctrl/tinycolor';

dayjs.locale('zh-cn');
const colors1 = ['#6253E1', '#04BEFE'];

const getHoverColors = (colors) =>
  colors.map((color) => new TinyColor(color).lighten(5).toString());
const getActiveColors = (colors) =>
  colors.map((color) => new TinyColor(color).darken(5).toString());

function App() {

  return (
    <ConfigProvider locale={zhCN} theme={{
      token: {
        // Seed Token，影响范围大
        colorPrimary: 'rgb(0,105,255)',
        borderRadius: 2,


        // 派生变量，影响范围小
        colorBgContainer: 'white',
      },
      components: {
        Button: {
          colorPrimary: `linear-gradient(135deg, ${colors1.join(', ')})`,
          colorPrimaryHover: `linear-gradient(135deg, ${getHoverColors(colors1).join(', ')})`,
          colorPrimaryActive: `linear-gradient(135deg, ${getActiveColors(colors1).join(', ')})`,
          lineWidth: 0,
        },
        Table:{
          borderColor:'white',
          headerBg:`rgba(22,97,171,0.8)`,
          headerColor:'white',
          headerBorderRadius:8, 
          rowExpandedBg:'#baccd9',
          rowHoverBg:'#baccd9'
        }
      },
    }} >
      <RouterProvider router={router}/>
     
 
    </ConfigProvider>
  )
}

export default App