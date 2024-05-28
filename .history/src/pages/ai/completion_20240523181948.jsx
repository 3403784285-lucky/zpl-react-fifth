import { QuestionCircleOutlined } from '@ant-design/icons'
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
const items = [
    {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    }, {
        label: 'Navigation One',
        key: 'mail',
        icon: <MailOutlined />,
    },


];
function Completion() {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <div className="frame">
        <div className="first-frame flex p-30 " style={{ justifyContent: 'space-between', height: '100px' }}>
            <div className="tip-correction" ><strong> 文本补全</strong></div>
            <div className="refresh-correction text-color-second"><strong><QuestionCircleOutlined />&nbsp;换一批</strong></div>
        </div>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />



    </div>

}
export default Completion;