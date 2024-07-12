import { Radio, Card, Modal, Button } from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [

        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js',


    ],
});
const { Meta } = Card;
const options = [
    {
        label: '期刊论文',
        value: '1',
    },
    {
        label: '会议论文',
        value: '2',
    },
    {
        label: '学位论文',
        value: '3',
    },
    {
        label: '专著',
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
        <Modal title={``} open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} width={1000}>
            <div className="flex">

                <div className="model">
                    <IconFont className='font-size-vlg m-r-20' type="icon-wendang" />
                    <p>文档</p>
                </div>
                <div className="model">
                    <IconFont className='font-size-vlg m-r-20' type="icon-shangchuan" />
                    <p>上传</p>
                </div>

            </div>
            <h4 className='m-t-10 m-b-6'>文档类型</h4>

            {/* <Button className='w-full m-y-10 b-rd-16' type='primary'>确认</Button>
            <Button className='w-full m-y-5 b-rd-16 bg-color-grey text-color-white'>取消</Button> */}

        </Modal>
        <Radio.Group className='m-t-20' size='large' options={options} onChange={onChange3} value={value3} optionType="button" />
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
                cover={<img  alt="example" src="/img/nodata.png" />}
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