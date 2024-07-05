
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/font_1788044_0dwu4guekcwr.js',
    // icon-javascript, icon-java, icon-shoppingcart (overridden)
    '//at.alicdn.com/t/font_1788592_a5xf2bdic3u.js', // icon-shoppingcart, icon-python
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
            <div className="list-one b-rd-10 m-10" style={ {width:'20%',height:'70px',border:'#1661ab 1px solid',}}>   <Space><IconFont type="icon-xinzengwenjianjia" /></Space></div>
            <div className="list-two b-rd-10 m-10" style={ {width:'20%',height:'70px',border:'#1661ab 1px solid',}}></div>
        </div>

    </div>
    <div className="bottom-frame">
        <div className="title font-size-base">文档</div>
    </div>
</div>
    
    </>
}
export default FileLay;



