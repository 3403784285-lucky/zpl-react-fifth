
import { Tag, Card } from 'antd'
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
                <div className="title m-b-10 font-size-mlg font-bold">智能制造方案</div>
                <div className="desc">生产管理/缺料预警/供应链管理/质量管理/设备巡检</div>
            </div>
            <div className="one flex-c-center-center b-rd-10" style={{ width: '32%', height: '120px', backgroundImage: "url('/img/rec-two.png')", backgroundSize: 'cover' }}>
                <div className="title m-b-10 font-size-mlg font-bold">教务教学管理</div>
                <div className="desc">市场招生/学员管理/排课约课/成绩管理/采购管理</div>

            </div>
            <div className="one flex-c-center-center  b-rd-10" style={{ width: '32%', height: '120px', backgroundImage: "url('/img/rec-three.png')", backgroundSize: 'cover' }}>
                <div className="title m-b-10 font-size-mlg font-bold">电商企业管理</div>
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
                    <Card className='m-x-6 shadow'
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



            <div className="item-frame flex" style={{ justifyContent: 'space-between' }} >
               
                {data2.map((item, index) => (
                    <Card
                        key={index}
                        className="item b-rd-6 m-10 flex-c-center-center shadow"
                        hoverable={true}
                        style={{
                            width: 270,
                        }}
                        cover={
                            item.type === '文本' ? (
                                <div
                                    className="text-content p-10 flex-c-center-center"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'wrap',
                                    }}
                                >
                                    {item.content}
                                </div>
                            ) : (
                                <img
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
        <div className="style">
            <div className="third-title font-size-lg font-bold text-color-two">新奇样式</div>
            <div className="desc font-size-sm text-color-grey flex-r-start-center p-6"><img className="img-vsm" src="/img/index-third.png" />&nbsp;&nbsp;页中多彩意，文卷若繁星</div>

            <div className="third-content ">





            </div>


        </div>




    </div>
}
export default Recommendation