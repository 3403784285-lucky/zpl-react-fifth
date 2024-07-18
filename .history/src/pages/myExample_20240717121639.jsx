import { Radio, Card, Modal, Button, Dropdown } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
// import fileFun from '../../api/user/file';
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

    const [value3, setValue3] = useState('1');
    useEffect(() => {
        const fetchData = async () => {
            // const res = await fileFun.getTemplateDocument();
            // console.log(res.data);
            // if (!res.data) res.data = []
            // setData(res.data)

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
    return <Dropdown
        menu={{
            items,
        }}
        trigger={['contextMenu']}
    >
        <div className='flex-wrap p-20 m-t-20' style={{ height: '71.5vh', overflowY: "auto" }}>
            

            {data.map(item => (
                <Card
                    key={item.id}
                    className='m-y-10 m-x-8 shadow'
                    onClick={() => handleCardClick(item.id)}
                    hoverable
                    style={{ width: 270 }}
                    cover={<img style={{ height: '250px' }} alt={item.name} src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" />}
                >
                    <Meta
                        title={
                            <div className='flex-r-center-center'>
                                <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> {item.name}
                            </div>
                        }
                    />
                </Card>
            ))}







        </div>
    </Dropdown>

}
export default MyExample;