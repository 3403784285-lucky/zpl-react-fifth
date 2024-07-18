import { Radio, Card, Modal, Button } from 'antd';
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

    }
    const addFile = async () => {

      const res = await fileFun.useTemplate(file.id)
      navigate(`/big-editor?` + encrypt(res.data))
      console.log(res)

  }
    return (
        <div className='flex-c-center-center' >
          <Modal
            title={
              <div className='flex-r-start-center'>
                <IconFont type='icon-wordIcon' className='font-size-vlg m-r-10 position-relative'></IconFont>
                <div>
                  <h4>教师花名册</h4>
                  <div className='text-color-grey font-size-sm'>作者：金山文档</div>
                </div>
                <Button className='position-absolute' style={{ right: 50 }}>复制链接</Button>
              </div>
            }
            open={isModalOpen}
            footer={null}
            onOk={handleOk}
            onCancel={handleCancel}
            width={1000}
            style={{ maxHeight: '90vh' }} // 设置 Modal 的最大高度为屏幕高度的90%
          >
            <div>
              <img src="/img/nodata.png" className='w-full' style={{ height: '300px', backgroundSize: 'cover' }} />
            </div>
      
            <div className='flex-r-end-center'>
              <Button className="m-r-20">添加模板</Button>
              <Button type='primary' onClick={addFile}>立即使用</Button>
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
                onClick={() => handleCardClick(item.id)}
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