
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
            setData2(res2.data.slice(0, 3))
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



            <div className="item-frame p-10 flex" style={{ justifyContent: 'space-between' }} >
                {/* <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{ width: '32%', height: '200px' }}>
                    <div className="text-content m-b-10 font-size-sm" style={{
                        width: '90%', height: '76%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'wrap',
                    }}>
                        早在 1999 年，文件共享网络 Napster 就出现了，可方便用户在混合对等网络（之所以使用“混合”一词是因为它使用了中央目录服务器）上轻松共享音频文件（通常包含音乐）。文件共享网络不仅仅可用于共享音乐文件，还允许所有用户保留这些共享文件的副本。这样一来，单个数字资产就会跨全球网络生成无限个合理副本。这项技术简单易用，只要有计算机，任何人都可以利用它。这让备受尊崇的淘儿唱片业绩意外下滑。到 2006 年，淘儿唱片被迫关闭了它在美国国内的所有 89 家门店。pster 就出现了，可方便用户在混合对等网络（之所以使用“混合”一词是因为它使用了中央目录服务器）上轻松共享音频文件（通常包含音乐）。文件共享网络不仅仅可用于共享音乐文件，还允许所有用户保留这些共享文件的副本。这样一来，单个数字资产就会跨全球网络生成无限个合理副本。这项技术简单易用，只要有计算机，任何人都可以利用它。这让备受尊崇的淘儿唱片业绩意外下滑。到 2006 年，淘儿唱片被迫关闭了它在美国国内的所有 89 家门店。pster 就出现了，可方便用户在混合对等网络（之所以使用“混合”一词是因为它使用了中央目录服务器）上轻松共享音频文件（通常包含音乐）。文件共享网络不仅仅可用于共享音乐文件，还允许所有用户保留这些共享文件的副本。这样一来，单个数字资产就会跨全球网络生成无限个合理副本。这项技术简单易用，只要有计算机，任何人都可以利用它。这让备受尊崇的淘儿唱片业绩意外下滑。到 2006 年，淘儿唱片被迫关闭了它在美国国内的所有 89 家门店。

                    </div>

                    <div className="title font-bold text-overflow-1" style={{ width: '50%' }}><Tag bordered={false} className='b-rd-6' color="geekblue">文本</Tag>区块链基本知识</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{ width: '32%', height: '200px' }}>
                    <img className="text-content m-b-10" src='data:image/jpeg;base64,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' style={{
                        width: '90%', height: '76%',

                    }} />

                    <div className="title font-bold text-overflow-1" style={{ width: '50%' }}><Tag bordered={false} className='b-rd-6' color="yellow">图片</Tag>清新大自然</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div> */}
                {data2.map((item, index) => (
                    <Card className=' key={index}
                        className="item b-rd-6 m-10 flex-c-center-center" shadow'
                        hoverable={true}
                        style={{
                            width: 270,
                          

                        }}
                        cover={item.type === '文本' ? (
                            <div
                                className="text-content m-b-10 p-10"
                                style={{
                                    width: '90%',
                                    height: '96%',
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
                        )}
                    >

                        <Meta title=
                            {<><div className="title font-bold text-overflow-1" >
                                <Tag bordered={false} className="b-rd-6" color={item.type === '文本' ? 'geekblue' : 'yellow'}>
                                    {item.type}
                                </Tag>
                                {item.name}
                            </div>
                                <div className="pres font-size-sm text-color-grey text-overflow-1">
                                    {new Date(item.createTime).toLocaleString()}
                                </div></>}
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