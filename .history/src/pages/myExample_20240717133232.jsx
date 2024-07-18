import { Radio, Card, Modal, Button, Tag, Dropdown,Skeleton } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import elementFun from '../api/user/element';
import UploadMaterialForm from '../components/utils/main/cards';
import { useStorage } from 'web-localstorage-plus';
const IconFont = createFromIconfontCN({
    scriptUrl: [

        '//at.alicdn.com/t/c/font_4248113_7balxnqm0f5.js',


    ],
});
const items = [
    {
        label: '上传素材',
        key: '1',
    },

];
const { Meta } = Card;
function MyExample() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])
    const [modal, contextHolder] = Modal.useModal();
    const [loading1, setLoading1] = useState(false)
    const storage = useStorage()
    const [value3, setValue3] = useState('1');
    useEffect(() => {
        const fetchData = async () => {
            setLoading1(true)
            const userId = storage.getItem("openid")
            const res = await elementFun.getAll(userId);
            console.log(res.data);
            if (!res.data) res.data = []
            setLoading1(false)
            setData(res.data)
        }
        fetchData()
    }, [])
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const openTemplate = () => {
        setIsModalOpen(true)
    }
    const handleChildContextMenu = (e) => {
        e.preventDefault(); // 阻止默认右键菜单
        e.stopPropagation(); // 停止事件传播，阻止父组件接收右键菜单事件// 阻止默认右键菜单
      };
    const items1 = [
        {
            label: '编辑',
            key: '100',
        },
        {
            label: '删除',
            key: '101',
        },

    ];
    const handleSelect=(e)=>
    {
        modal.confirm({
            title: '上传素材',
            icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
            content: <UploadMaterialForm/>,
            okText: '确认',
            cancelText: '取消',
            onOk() {
              console.log(editor.state.selection)
              editor.chain().focus().deleteSelection().insertContent(res.data).run();
            },
          });
    }
    return  <Dropdown
    menu={{
        items,
        onClick:handleSelect
    }}
    
    trigger={['contextMenu']}
><div  className="item-frame flex-c-center-center p-10" style={{ justifyContent: 'space-between'}} >
{contextHolder}
        {loading1 ? <Skeleton /> : data.map((item, index) => (
            <Dropdown
                menu={{
                    items: items1,
                }}
                trigger={['contextMenu']}
            >  <Card
            onContextMenu={handleChildContextMenu}
                onClick={() => onClick(item)}
                key={item.key}
                className="item b-rd-6 m-10 flex-c-center-center shadow"
                hoverable={true}
                style={{
                    width: 300,

                }}
                cover={
                    item.type === '文本' ? (
                        <div
                            className="text-content"
                            style={{
                                width: '100%',
                                height: '150px',
                                display: 'flex',
                                overflowY: 'auto',
                                alignItems: 'start',
                                padding: '20px',

                                justifyContent: 'center',

                            }}
                        >
                            {item.content}
                        </div>
                    ) : (
                        <img
                            style={{
                                width: '100%',
                                height: '200px',
                                display: 'flex',
                                overflowY: 'auto',
                                alignItems: 'start',
                                justifyContent: 'center',

                            }}

                            className="text-content"
                            src={item.content}
                            alt={item.name}
                        />

                    )
                }
            >
                    <Meta
                        title={
                            <div className='flex-c-center-center'>
                                <div className="title font-bold text-overflow-1">
                                    <Tag bordered={false} className="b-rd-6" color={item.type === '文本' ? 'geekblue' : 'yellow'}>
                                        {item.type}
                                    </Tag>
                                    {item.name}
                                </div>
                                <div className="pres font-size-sm text-color-grey text-overflow-1">
                                    {new Date(item.createTime).toLocaleString()}
                                </div>
                            </div>
                        }
                    />
                </Card>
            </Dropdown>


        ))}
    
          
      
    </div>

  </Dropdown>


}
export default MyExample;