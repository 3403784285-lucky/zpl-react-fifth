import { QuestionCircleOutlined } from '@ant-design/icons'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useStorage } from "web-localstorage-plus";
import { Menu,Flex, Radio,Card } from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js'
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
const {Meta}=Card
function Completion() {
    const [current, setCurrent] = useState('mail');
    const onClick = async(e) => {
        console.log('click ', e);
        const formData=new FormData();
        const storage = useStorage();
        const passage=storage.getItem?.("passage")
        formData.append('text',passage)
        const res=await aiFun.fixFormat(formData)
        console.log(res)
        setCurrent(e.key);
    };
    return <div className="frame p-30">
        <div className="first-frame flex  " style={{ justifyContent: 'space-between', height: '20px' }}>
            <div className="tip-correction" ><strong> 文本补全</strong></div>
            <div className="refresh-correction text-color-second"><strong><QuestionCircleOutlined />&nbsp;换一批</strong></div>
        </div>
        <Menu className='m-10' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Card className='m-r-10 m-t-20 shadow'
                hoverable
           
                style={{
                    width: 290,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>
       


    </div>

}
export default Completion;