
import { Tag } from 'antd'

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
let myDom = items.map((item,) => {
    return <>

    </>
})
function Recommendation() {
    return <div className="p-30" style={{ height: '622px', overflowY: "auto" }}>
        <div className="doc">
            <div className="first-title font-bold font-size-lg  ">
                文档模板
            </div>
            <div className="desc font-size-sm text-color-grey flex-r-start-center p-6"><img className="img-vsm" src="/img/index-first.png" />笔墨玲珑织锦绣，文档精美韵无穷</div>

            <div className="item-frame p-10 flex" style={{ justifyContent: 'space-between' }} >
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{ width: '18%', height: '250px' }}>
                    <img className="m-b-10" src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" alt="图片示例" style={{ width: '90%', height: '78%' }} />

                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{ width: '18%', height: '250px' }}>
                    <img className="m-b-10" src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" alt="图片示例" style={{ width: '90%', height: '78%' }} />

                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{ width: '18%', height: '250px' }}>
                    <img className="m-b-10" src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" alt="图片示例" style={{ width: '90%', height: '78%' }} />

                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{ width: '18%', height: '250px' }}>
                    <img className="m-b-10" src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" alt="图片示例" style={{ width: '90%', height: '78%' }} />

                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{ width: '18%', height: '250px' }}>
                    <img className="m-b-10" src="https://wkimg.bdimg.com/img/eb13653…?new=1&w=500&p=1" alt="图片示例" style={{ width: '90%', height: '78%' }} />

                    <div className="title font-bold">入党申请书</div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>


            </div>
        </div>
        <div className="video">
            <div className="second-title font-size-lg font-bold ">热门素材</div>
            <div className="desc font-size-sm text-color-grey flex-r-start-center p-6"><img className="img-vsm" src="/img/index-second.png" />百川汇海无穷尽，万象包罗细又全</div>



            <div className="item-frame p-10 flex" style={{ justifyContent: 'space-between' }} >
                <div className="item b-rd-6 shadow p-10 m-10 flex-c-center-center" style={{ width: '18%', height: '250px' }}>
                    <div className="text-content " style={{
                        width: '90%', height: '78%',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'wrap',
                    }}>
                        早在 1999 年，文件共享网络 Napster 就出现了，可方便用户在混合对等网络（之所以使用“混合”一词是因为它使用了中央目录服务器）上轻松共享音频文件（通常包含音乐）。文件共享网络不仅仅可用于共享音乐文件，还允许所有用户保留这些共享文件的副本。这样一来，单个数字资产就会跨全球网络生成无限个合理副本。这项技术简单易用，只要有计算机，任何人都可以利用它。这让备受尊崇的淘儿唱片业绩意外下滑。到 2006 年，淘儿唱片被迫关闭了它在美国国内的所有 89 家门店。

                    </div>

                    <div className="title font-bold text-overflow-1" style={{ width: '70%' }}><Tag bordered={false} className='b-rd-6' color="geekblue">文本</Tag>入党申请书 </div>
                    <div className="pres font-size-sm text-color-grey text-overflow-1">2024-12-10 23:12</div>
                </div>
            </div>



        </div>
        <div className="style">
            <div className="third-title font-size-lg font-bold ">新奇样式</div>
            <div className="desc font-size-sm text-color-grey flex-r-start-center p-6"><img className="img-vsm" src="/img/index-third.png" />页中多彩意，文卷若繁星</div>

            <div className="third-content ">




            </div>


        </div>




    </div>
}
export default Recommendation