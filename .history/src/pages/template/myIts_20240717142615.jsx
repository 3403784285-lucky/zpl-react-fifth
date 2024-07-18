import { Radio, Card, Modal, Button, Dropdown } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../api/user/file';
const IconFont = createFromIconfontCN({
    scriptUrl: [

        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js',


    ],
});
const items = [
    {
        label: '创建模板',
        key: '1',
    },
    
];
const { Meta } = Card;
function MyIts() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data, setData] = useState([])

    const [value3, setValue3] = useState('1');
    useEffect(() => {
        const fetchData = async () => {
            const res = await fileFun.getTemplateDocument();
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
    return <Dropdown
        menu={{
            items,
        }}
        trigger={['contextMenu']}
    >
        <div className='flex-wrap p-20 m-t-20' style={{ height: '71.5vh', overflowY: "auto" }}>
            <Modal title={
                <div className='flex-r-start-center'>
                    <IconFont type='icon-wordIcon' className='font-size-vlg m-r-10 position-relative'></IconFont>
                    <div>
                        <h4>教师花名册</h4>
                        <div className='text-color-grey font-size-sm'>作者：金山文档</div>
                    </div>
                    <Button className='position-absolute' style={{ right: 50 }}>复制链接</Button>
                </div>
            } open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div>
                    <img src="/img/nodata.png" className='w-full' style={{ height: '300px', backgroundSize: 'cover' }} />
                </div>

                <div className='flex-r-end-center'>
                    <Button className="m-r-20">添加模板</Button>
                    <Button type='primary'>立即使用</Button>
                </div>



            </Modal>

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
export default MyIts;