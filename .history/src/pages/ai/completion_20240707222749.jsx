import { QuestionCircleOutlined } from '@ant-design/icons'
import { AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import { useStorage } from "web-localstorage-plus";
import { Menu,Flex, Radio } from 'antd';
import aiFun from '../../api/user/ai';
const items = [
    {
        label: '网络素材',
        key: 'mail',
        icon: <SettingOutlined />,
    }, {
        label: '智能生成',
        key: 'hah',
        icon: <AppstoreOutlined />,
    },


];
function Completion() {
    const [current, setCurrent] = useState('mail');
    const onClick = async(e) => {
        console.log('click ', e);
        const formData=new FormData();
        formData.append('text','库存清单



库存详情

序号、品名、单位及库存情况







序号



品名



单位



入库总计



出库总计



现有库存





1



物品A



个



1100



50



1050





2



物品B



条



100



60



40





3



物品C



台



1200



200



1000')
        const storage = useStorage();
        // const passage=storage.getItem?.("passage")
        // formData.append('passage',passage)
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
       


    </div>

}
export default Completion;