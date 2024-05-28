import { QuestionCircleOutlined } from '@ant-design/icons'
import { AppstoreOutlined,  SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        label: '网络素材',
        key: 'mail',
        icon: <SettingOutline />,
    }, {
        label: '智能生成',
        key: 'hah',
        icon: <AppstoreOutlined/>,
    },


];
function Completion() {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <div className="frame">
        <div className="first-frame flex p-30 " style={{ justifyContent: 'space-between', height: '20px' }}>
            <div className="tip-correction" ><strong> 文本补全</strong></div>
            <div className="refresh-correction text-color-second"><strong><QuestionCircleOutlined />&nbsp;换一批</strong></div>
        </div>
        <Menu className='m-20' onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />



    </div>

}
export default Completion;