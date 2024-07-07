
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
          headerBg:`rgb(13,112,255)`,
          headerColor:'white',
          headerBorderRadius:8, 
          borderColor:'rgba(13,112,255,0.3)',
          rowHoverBg:'rgba(51,136,239,0.3)',
          Token 名称	描述	类型	默认值
bodySortBg	表格排序列背景色	string	#fafafa
borderColor	表格边框/分割线颜色	string	#f0f0f0
cellFontSize	单元格文字大小（默认大尺寸）	number	14
cellFontSizeMD	单元格文字大小（中等尺寸）	number	14
cellFontSizeSM	单元格文字大小（小尺寸）	number	14
cellPaddingBlock	单元格纵向内间距	number	16
cellPaddingBlockMD	单元格纵向内间距（中等尺寸）	number	12
cellPaddingBlockSM	单元格纵向内间距（小尺寸）	number	8
cellPaddingInline	单元格横向内间距（默认大尺寸）	number	16
cellPaddingInlineMD	单元格横向内间距（中等尺寸）	number	8
cellPaddingInlineSM	单元格横向内间距（小尺寸）	number	8
expandIconBg	展开按钮背景色	string	#ffffff
filterDropdownBg	过滤下拉菜单颜色	string	#ffffff
filterDropdownMenuBg	过滤下拉菜单选项背景	string	#ffffff
fixedHeaderSortActiveBg	固定表头排序激活态背景色	string	#f0f0f0
footerBg	表格底部背景色	string	#fafafa
footerColor	表格底部文字颜色	string	rgba(0, 0, 0, 0.88)
headerBg	表头背景	string	#fafafa
headerBorderRadius	表头圆角	number	8
headerColor	表头文字颜色	string	rgba(0, 0, 0, 0.88)
headerFilterHoverBg	表头过滤按钮悬浮背景色	string	rgba(0, 0, 0, 0.06)
headerSortActiveBg:'#f1939c'
          
        }
      },
    }} >
      <RouterProvider router={router}/>
     
 
    </ConfigProvider>
  )
}

export default App