import { Radio, Card, Modal, Button ,Tag} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import fileFun from '../../api/user/file';
import { encrypt } from '../../utils/code';
const IconFont = createFromIconfontCN({
    scriptUrl: [

        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js',


    ],
});
const { Meta } = Card;
const options = [
    {
        label: '哲学',
        value: '1',
    },
    {
        label: '经济学',
        value: '2',
    },
    {
        label: '法学',
        value: '3',
    },
    {
        label: '教育学',
        value: '4',
    },
    {
        label: '艺术学',
        value: '5',
    },
    {
        label: '管理学',
        value: '6',
    },
    {
        label: '医学',
        value: '7',
    },
    {
        label: '农学',
        value: '8',
    },
    {
        label: '工学',
        value: '9',
    },
    {
        label: '理学',
        value: '10',
    },
    {
        label: '历史学',
        value: '11',
    },
    {
        label: '文学',
        value: '12',
    },

];
function ItsCenter() {
    const [value3, setValue3] = useState('1');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [data,setData]=useState([])   
    const [loadingContent, setLoadingContent] = useState('')
    const [loadingName, setLoadingName] = useState('')
    const [file, setFile] = useState({})
    const onClick = () => {
        // const res=await fileFun.favorite({userId:3,documentId:61});
        // const res = await userFun.searchUsers()
        // console.log(res);
        setIsModalOpen(true);

    }
    useEffect(() => {
        const fetchData = async () => {
            const res = await fileFun.getTemplateDocument();
            console.log(res.data);
            if(!res.data)res.data=[]
            setData(res.data)

        }
        fetchData()
    }, [])
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };
    const handleCardClick = () => {
      setLoadingContent(item.content)
      setLoadingName(item.name)
      setFile(item)
      setIsModalOpen(true);
    }
    const addFile = async () => {

      const res = await fileFun.useTemplate(file.id)
      navigate(`/big-editor?` + encrypt(res.data))
      console.log(res)

  }
    return (
        <div className='flex-c-center-center' >
          <Modal title={
                <div className='flex-r-start-center'>{file.userId ? (
                    <IconFont type='icon-wordIcon' className='font-size-vlg m-r-10 position-relative'></IconFont>

                ) : (<Tag bordered={false} className="b-rd-6" color={file.type === '文本' ? 'geekblue' : 'yellow'}>
                    {file.type}
                </Tag>

                )}

                    <div>
                        <h4>{loadingName}</h4>
                        <div className='text-color-grey font-size-sm'>作者：金山文档</div>
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
                    <Button className="m-r-20" onClick={addSome}>添加到我的</Button>
                    {file.userId ? (
                        <Button type='primary' onClick={addFile}>立即使用</Button>
                    ) : (null)}
                </div>
            </Modal>
      
          <div className='p-x-20'>
            <Radio.Group className='m-t-20' size='large' options={options} onChange={onChange3} value={value3} optionType="button" />
          </div>
      
          <div className='flex-wrap p-20 m-t-20' style={{ height: '61.5vh', overflowY: "auto"  }} >
            {data.map(item => (
              <Card
                key={item.id}
                className='m-y-10 m-x-8 shadow'
                onClick={() => handleCardClick(item)}
                hoverable
                style={{ width: 270 }}
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
      );
      
}
export default ItsCenter;