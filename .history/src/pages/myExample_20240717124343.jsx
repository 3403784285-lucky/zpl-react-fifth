import { Radio, Card, Modal, Button,Tag, Dropdown } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import elementFun from '../api/user/element';
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
    const [loading1, setLoading1] = useState(false)
    const storage = useStorage()
    const [value3, setValue3] = useState('1');
    useEffect(() => {
        const fetchData = async () => {
            const userId = storage.getItem("openid")
            const res = await elementFun.getAll(userId);
            console.log(res.data);
            if (!res.data) res.data = []
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
    return <Dropdown
        menu={{
            items,
        }}
        trigger={['contextMenu']}
    >
        <div className="item-frame flex-c-center-center p-10" style={{ justifyContent: 'space-between' }} >

            {loading1 ? <Skeleton /> : data.map((item, index) => (
                 <Dropdown
                        menu={{
                            items: items1,
                        }}
                        trigger={['contextMenu']}
                    >  <Card
                        onClick={() => onClick(item)}
                        key={index}
                        className="item b-rd-6 m-10 p-6 flex-c-center-center shadow"
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
                                        height: '200px',
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