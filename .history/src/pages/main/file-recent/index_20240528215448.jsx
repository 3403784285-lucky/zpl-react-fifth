
import {  Menu} from 'antd';
const IconFont = Icon.createFromIconfontCN({
    scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
  });

function FileLay()
{
    return <>
     <IconFont type="icon-tuichu" />
    <IconFont type="icon-facebook" />
    <IconFont type="icon-twitter" />
    <div className="start-frame  p-30">
    <div className="upper-frame">
        <div className="title font-size-base">开始</div>
        <div className="lay-out flex">
            <div className="list-one b-rd-10 m-10" style={ {width:'20%',height:'70px',border:'#1661ab 1px solid',}}></div>
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



