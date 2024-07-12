import { Radio, Card, Modal, Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import fileFun from '../../api/user/file';
const IconFont = createFromIconfontCN({
    scriptUrl: [

        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js',


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
    const openTemplate = () => {

    }
    return <div className='flex-c-center-center' style={{ height: '73.5vh', overflowY: "auto" }}>
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
        <div className='p-x-20'><Radio.Group className='m-t-20' size='large' options={options} onChange={onChange3} value={value3} optionType="button" /></div>

        <div className='flex-wrap p-20 m-t-20' style={{ justifyContent: 'space-between' }}>
           
            {data.map(item => (
                <Card
                    key={item.id}
                    className='m-r-10 m-y-10 shadow'
                    onClick={() => handleCardClick(item.id)} // 替换为你的点击处理函数
                    hoverable
                    style={{ width: 270 }}
                    cover={ <img style={{height:'150px'}} alt={item.name} src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" /> }
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

    </div>
}
export default ItsCenter;