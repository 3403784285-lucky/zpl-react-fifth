import { Radio, Card, Modal, Button, Dropdown ,Tag,message} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../api/user/file';
import EditorContentCopy from '../../components/utils/edit/editorContent';
import { useStorage } from 'web-localstorage-plus';
import { encrypt } from '../../utils/code';
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
    const [loadingContent, setLoadingContent] = useState('')
    const [loadingName, setLoadingName] = useState('')
    const [file, setFile] = useState({})
    const [value3, setValue3] = useState('1');
    const storage=useStorage()
    const navigate=useNavigate()
    useEffect(() => {
        const fetchData = async () => {
            const res = await fileFun.getMyTemplateDocument(storage.getItem("openid"));
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
    const addSome = async () => {
        if (file.userId) {
            const res = await fileFun.saveTemplate(file.id)
            if (res) {
                message.success("添加" + res.msg)
            }
        } else {
            const res = await elementFun.add(file.id)
            if (res) {
                message.success("添加" + res.msg)
            }
        }
  
        setIsModalOpen(false);
    }
    const handleOk = () => {
        setIsModalOpen(false);
    };

    const addFile = async () => {

        const res = await fileFun.useTemplate(file.id)
        navigate(`/big-editor?` + encrypt(res.data))
        console.log(res)

    }
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleCardClick = (item) => {
        setLoadingContent(item.content)
        setLoadingName(item.name)
        setFile(item)
        setIsModalOpen(true);
      }
    const openTemplate = () => {
        setIsModalOpen(true)
    }
    return <Dropdown
        menu={{
            items,
        }}
        trigger={['contextMenu']}
    >
        <div className='flex-wrap  m-t-10' style={{ height: '71.5vh', overflowY: "auto" }}>
        <Modal title={
                <div className='flex-r-start-center'>{file.userId ? (
                    <IconFont type='icon-wordIcon' className='font-size-vlg m-r-10 position-relative'></IconFont>

                ) : (<Tag bordered={false} className="b-rd-6" color={file.type === '文本' ? 'geekblue' : 'yellow'}>
                    {file.type}
                </Tag>

                )}

                    <div>
                        <h4>{loadingName}</h4>
                        <div className='text-color-grey font-size-sm'>作者：灵智文档</div>
                    </div>
                </div>
            } open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} width={1000}>
                <div className='m-20' style={{ height: "400px" }}>
                    {file.userId ? (
                        <EditorContentCopy loadingContent={loadingContent} />
                    ) : (
                        file.type == "图片" ? (
                            <img style={{ width: '100%', height: '100%' }} src={file.content} alt="图片" />
                        ) : (
                            <div style={{ height: '100%', overflowY: 'auto' }}>
                                {loadingContent}
                            </div>
                        )
                    )}
                </div>

                <div className='flex-r-end-center'>
                    <Button className="m-r-20" onClick={addFile}>编辑模板</Button>
                    {file.userId ? (
                        <Button type='primary' onClick={addFile}>立即使用</Button>
                    ) : (null)}
                </div>
            </Modal>
      
            <div className='flex-wrap p-20 m-t-20' style={{ height: '61.5vh', overflowY: "auto"  }} >
            {data.map(item => (
              <Card
                key={item.id}
                className='m-y-10 m-x-8 shadow'
                onClick={() => handleCardClick(item)}
                hoverable
                style={{ width: 270,height:320 }}
                cover={<img style={{ height: '250px' }} alt={item.name} src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" />}
              >
                <Meta
                  title={
                    <div className='flex-r-center-center'>
                      <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> <div className='text-ellipsis' style={{width:'100px'}}>{item.name}</div>
                    </div>
                  }
                />
              </Card>
            ))}
          </div>







        </div>
    </Dropdown>

}
export default MyIts;