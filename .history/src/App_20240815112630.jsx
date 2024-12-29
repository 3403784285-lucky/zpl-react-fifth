
import { RouterProvider } from 'react-router-dom';
import router from './router'
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
let count = 0;
function App() {
  const [currentRoute, setCurrentRoute] = useState('');
  const [hash, setHash] = useState('');
  useEffect(() => {
    // 定义处理路径变化的事件
    const handlePopState = () => {
      const newHash = window.location.hash;
      setHash(newHash)
      console.log("666")

    };
    // 监听 popstate 事件
    window.addEventListener('hashchange',handlePopState);
    // 清理监听器
    return () => {
      window.removeEventListener('hashchange', handlePopState);
      
    };
  }, []);
  useEffect(() => {
    const path = hash.substring(1); // 去掉 "#" 得到 "/login"
    const pathParts = path.split('/'); // 分割路径部分 ["login", "subpath"]
    setCurrentRoute(pathParts[1] || ''); // 获取 "login"
    console.log(currentRoute)
  }, [hash]);
  return (
    <ConfigProvider locale={zhCN} theme={{
      token: {
        // Seed Token，影响范围大
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
          headerSortActiveBg: '#61649f'
        },
      },
    }} >
      <RouterProvider router={router} />
      <div style={{ position: 'fixed', left: 100, top: 100, zIndex: 1000 }}>
        {
          (currentRoute == 'login' || currentRoute == '') || <FloatingButton />
        }
      </div>

    </ConfigProvider>
  )
}

export default App