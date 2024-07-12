
import { Tag, Card, Modal, Button } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import fileFun from '../../api/user/file';
import elementFun from '../../api/user/element';
const { Meta } = Card
const items = [
    {
        key: 1,
        url: "",
        title: "",
        time: ""
    }, {
        key: 2,
        url: "",
        title: "",
        time: ""
    },
    {
        key: 3,
        url: "",
        title: "",
        time: ""
    },
]
const IconFont = createFromIconfontCN({
    scriptUrl: [

        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js',


    ],
});
let myDom = items.map((item,) => {
    return <>

    </>
})
function Recommendation() {
    const [data1, setData1] = useState([])
    const [data2, setData2] = useState([])
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
    const openTemplate = () => {
    }
    useEffect(() => {
        const fetchData = async () => {
            const res1 = await fileFun.getTemplateShow();
            setData1(res1.data.slice(0, 5))
            const res2 = await elementFun.index();
            setData2(res2.data.slice(0, 4))
            console.log(res1, res2)

        }
        fetchData()
    }, [])
    return <div className="p-36" style={{ height: '80.5vh', overflowY: "auto" }}>

        <div className="flex text-color-white m-b-20" style={{ justifyContent: 'space-between' }}>
            <div className="one flex-c-center-center  b-rd-10" style={{ width: '32%', height: '120px', backgroundImage: "url('/img/rec-one.png')", backgroundSize: 'cover' }}>
                <div className="title m-b-10 font-size-mlg font-bold">文字类</div>
                <div className="desc">哲学/法学/教育学/文学</div>
            </div>
            <div className="one flex-c-center-center b-rd-10" style={{ width: '32%', height: '120px', backgroundImage: "url('/img/rec-two.png')", backgroundSize: 'cover' }}>
                <div className="title m-b-10 font-size-mlg font-bold">逻辑类</div>
                <div className="desc">管理学/经济学/工学/理学</div>

            </div>
            <div className="one flex-c-center-center  b-rd-10" style={{ width: '32%', height: '120px', backgroundImage: "url('/img/rec-three.png')", backgroundSize: 'cover' }}>
                <div className="title m-b-10 font-size-mlg font-bold">其他类</div>
                <div className="desc">直播管理/供应与选品/进稍存订单管理/会员管理</div>
            </div>


        </div>

        <div className="doc m-b-10">
            <div className="first-title font-bold font-size-lg text-color-three ">
                文档模板
            </div>
            <div className="desc font-size-sm text-color-grey flex-r-start-center p-6"><img className="img-vsm" src="/img/index-first.png" />&nbsp;&nbsp;笔墨玲珑织锦绣，文档精美韵无穷</div>

            <div className="item-frame p-10 flex" style={{ justifyContent: 'space-between' }} >
                {data1.map(item => (
                    <Card onClick={onClick} className='m-x-6 shadow'
                        hoverable={true}
                        style={{
                            width: 220,

                        }}
                        cover={<img alt="example" style={{ height: '190px' }} src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" />}
                    >
                        <Meta title=
                            {<div className='flex-r-center-center'>
                                <IconFont type="icon-wordIcon" className='font-size-mlg m-r-10' /> {item.name}
                            </div>}
                        />


                    </Card>
                ))}


            </div>
        </div>
        <div className="video m-b-20">
            <div className="second-title font-size-lg font-bold text-color-one">热门素材</div>
            <div className="desc font-size-sm text-color-grey flex-r-start-center p-6"><img className="img-vsm" src="/img/index-second.png" />&nbsp;&nbsp;百川汇海无穷尽，万象包罗细又全</div>


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
            <div className="item-frame flex" style={{ justifyContent: 'space-between' }} >

                {data2.map((item, index) => (
                    <Card
                        onClick={onClick}
                        key={index}
                        className="item b-rd-6 m-10 flex-c-center-center shadow"
                        hoverable={true}
                        style={{
                            width: 270,

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
                ))}



            </div>



        </div>

    </div>
}
export default Recommendation