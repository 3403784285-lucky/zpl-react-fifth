import { QuestionCircleOutlined } from '@ant-design/icons'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useStorage } from "web-localstorage-plus";
import { Menu, Flex, Radio, Card , message} from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
    ],
});
import aiFun from '../../api/user/ai';
const items = [
    {
        label: '素材中心',
        key: 'mail',
        icon: <SettingOutlined />,
    }, {
        label: '智能生成',
        key: 'hah',
        icon: <AppstoreOutlined />,
    },


];
const { Meta } = Card
function Completion() {
    const [current, setCurrent] = useState('mail');
    const onClick = async (e) => {
        console.log('click ', e);
        const formData = new FormData();
        const storage = useStorage();
        const passage = storage.getItem?.("passage")
        formData.append('text', passage)
        const res = await aiFun.fixFormat(formData)
        console.log(res)
        setCurrent(e.key);
    };
    return <div className="frame p-30" >
        <div className="first-frame flex  " style={{ justifyContent: 'space-between', height: '20px' }}>
            <div className="tip-correction" ><strong> 文本补全</strong></div>
            <div className="refresh-correction text-color-second"><strong><QuestionCircleOutlined />&nbsp;换一批</strong></div>
        </div>
        <Menu className='m-10' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <div className='flex-c-center-center'style={{height:'60.5vh',overflowY:'auto'}}>

            <Card className='m-r-10 m-t-20 shadow'
                hoverable

                style={{
                    width: 370,


                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                {/* <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />
            */}
            </Card>
            <Card className='m-r-10 m-t-20 shadow'
                hoverable

                style={{
                    width: 370,


                }}
            // cover={<img alt="example" src="/img/nodata.png" />}
            >
               
                    {<div className='flex' style={{ wordBreak: 'break-all',wordWrap: 'break-word'}}>
                        : 当然，这非常重要，做项目，还可以，但是有时候还是浪费了不少时间。另外心情非常紧张，应该在前一段时间把核心技术讨论掉，否则后面时间就没了，就过去了。
                    </div>}
                

            </Card>

        </div>




    </div>

}
export default Completion;