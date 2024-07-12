import { Radio, Card, Modal, Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { useEffect } from 'react';
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
        value: '3',
    },
    {
        label: '艺术学',
        value: '4',
    },
    {
        label: '管理学',
        value: '4',
    },
    {
        label: '医学',
        value: '4',
    },
    {
        label: '农学',
        value: '4',
    },
    {
        label: '工学',
        value: '4',
    },
    {
        label: '理学',
        value: '4',
    },
    {
        label: '历史学',
        value: '4',
    },
    {
        label: '文学',
        value: '4',
    },

];
function ItsCenter() {
    const [value3, setValue3] = useState('1');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onClick = () => {
        // const res=await fileFun.favorite({userId:3,documentId:61});
        // const res = await userFun.searchUsers()
        // console.log(res);
        setIsModalOpen(true);

    }
    useEffect(() => {
        const fetchData=async() => {
            const res=await 

        }
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
            <Card className='m-r-10 shadow'
                onClick={openTemplate}
                hoverable={true}

                style={{
                    width: 270,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>
            <Card className='m-r-10 shadow'
                onClick={onClick}
                hoverable

                style={{
                    width: 270,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>
            <Card className='m-r-10 shadow'
                hoverable

                style={{
                    width: 270,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>
            <Card className='m-r-10 shadow'
                hoverable

                style={{
                    width: 270,

                }}
                cover={<img alt="example" src="/img/nodata.png" />}
            >
                <Meta title=
                    {<div className='flex-r-center-center'>
                        <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> 教师花名册
                    </div>}
                />


            </Card>




        </div>

    </div>
}
export default ItsCenter;