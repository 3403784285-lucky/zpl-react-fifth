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
        formData.append('text','— Mom')
        const storage = useStorage();
        const passage=storage.getItem?.("passage")
        formData.append('passage',passage)
        const res=await aiFun.textContinuation(formData)
        console.log(res)
        setCurrent(e.key);
    };
    return <div className="frame p-30">
        <div className="first-frame flex  " style={{ justifyContent: 'space-between', height: '20px' }}>
            <div className="tip-correction" ><strong> 文本补全</strong></div>
            <div className="refresh-correction text-color-second"><strong><QuestionCircleOutlined />&nbsp;换一批</strong></div>
        </div>
        <Menu className='m-10' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
        <Flex vertical gap="middle" className='flex-r-center-center'>
            <Radio.Group defaultValue="a" buttonStyle="solid">
                <Radio.Button value="a">通用</Radio.Button>
                <Radio.Button value="b">科幻</Radio.Button>
                <Radio.Button value="c">军事</Radio.Button>
                <Radio.Button value="d">职场</Radio.Button>
            </Radio.Group>
        
        </Flex>


    </div>

}
export default Completion;