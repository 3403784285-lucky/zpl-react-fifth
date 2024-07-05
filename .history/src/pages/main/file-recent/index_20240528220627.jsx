
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_igmpwkmbkr9.js'
  ],
});
function FileLay()
{
    return <>

    <IconFont type="icon-twitter" />
    <div className="start-frame  p-30">
    <div className="upper-frame">
        <div className="title font-size-base">开始</div>
        <div className="lay-out flex">
            <div className="list-one b-rd-10 m-10 p-10" style={ {width:'20%',height:'70px',border:'#1661ab 1px solid',}}><IconFont className='font-size-base' type="icon-xinzengwenjianjia" /></div>
            <div className="list-two b-rd-10 m-10 p-10" style={ {width:'20%',height:'70px',border:'#1661ab 1px solid',}}><IconFont type="icon-mobanzhongxin-01" /></div>
        </div>

    </div>
    <div className="bottom-frame">
        <div className="title font-size-base">文档</div>
    </div>
</div>
    
    </>
}
export default FileLay;



