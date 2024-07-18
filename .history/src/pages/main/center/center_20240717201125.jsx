import { Button, Card, Divider } from "antd"
import { createFromIconfontCN } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { useStorage } from "web-localstorage-plus";

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
    ],
});


function Center() {
    const storage=useStorage()

    const navigate = useNavigate()
    return <div className="frame " style={{ height: '80.5vh', overflowY: "auto" }}>
        <div className="flex-r-start-center" style={{ justifyContent: 'space-between', backgroundImage: "url('/img/module-back.png')", height: '400px' }}>
            <img src="/img/vip-header.png" alt="" className="" style={{ width: '22%', height: '250px' }} />
            <div className="text  text-color-vip" >
                <div className="title font-bold" style={{ fontStyle: 'italic', fontSize: '60px' }}>Digital VIP</div>
                <div className="desc">畅享6亿+优质内容|会员专属高效工具|享受极致会员体验</div>
            </div>
            <div className="frame mosh shadow m-r-50 p-10 text-color-second flex-c-center-center" style={{ width: '400px', height: '230px' }}>
                <div className="one flex">
                    <img src="https://ts3.cn.mm.bing.net/th?id=OIP-C.p7Zf-FLKq5eU0uessiffgwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2" className="m-r-10" style={{ width: '43px', height: '43px', borderRadius: '50%' }} />

                    <div className="name">
                        <div className="main font-bold font-size-lg">穿花云烛展</div>
                        <div className="desc font-size-sm">首次开通享低价优惠</div>
                    </div>
                </div>
                <div className="two flex" style={{ justifyContent: 'space-between' }}>
                    <div className="number-one  m-x-20">
                        <div className="number flex-r-center-center">0</div>
                        <div className="desc" onClick={storage.setItem("isBuying",)}>积分</div>

                    </div>

                    <div className="number-two p-x-20">
                        <div className="number flex-r-center-center">0</div>
                        <div className="desc">下载特权</div>
                    </div>
                    <div className="number-three p-x-20">
                        <div className="number flex-r-center-center">0</div>
                        <div className="desc">优惠卷</div>
                    </div>

                </div>
                <div className="three"><Button className="b-rd-4 font-bold" onClick={()=>{storage.setItem("isBuying",true);navigate('/my-wallet') ;}} style={{ width: '300px' }} size="large" type="primary">限时2.9开通VIP</Button></div>
                <div className="four text-color-vip font-size-sm">会员享6亿+优质内容免费下载</div>

            </div>






        </div>

        <div className="bottom m-t-30 flex-c-center-center">
            <div className="title m-t-26  font-bold" style={{ fontSize: '25px' }}>VIP 专属权益</div>

            <div className="list p-50 flex w-full" style={{ justifyContent: 'space-between', flexFlow: 'wrap' }}>
                <div className="pay-doc flex-c-center-center shadow b-rd-10" style={{ width: '250px', height: '250px' }}>
                    <img src="/img/pay-doc.png" className="img-lg" alt="" />
                    <div className="title font-bold font-size-base m-b-10">付费文档会员专属折扣</div>
                    <div className="desc">享受专属低价</div>
                </div>

                <div className="pay-doc flex-c-center-center shadow b-rd-10" style={{ width: '250px', height: '250px' }}>
                    <img src="/img/date-doc.png" className="img-lg" alt="" />
                    <div className="title font-bold font-size-base m-b-10">优质热搜榜单</div>
                    <div className="desc">别人关注抢先看</div>
                </div>
                <div className="pay-doc flex-c-center-center shadow b-rd-10" style={{ width: '250px', height: '250px' }}>
                    <img src="/img/rec-doc.png" className="img-lg" alt="" />
                    <div className="title font-bold font-size-base m-b-10">推荐文档集</div>
                    <div className="desc">无限优质文档</div>
                </div>
                <div className="pay-doc flex-c-center-center shadow b-rd-10" style={{ width: '250px', height: '250px' }}>
                    <img src="/img/free-search.png" className="img-lg" alt="" />
                    <div className="title font-bold font-size-base m-b-10">免费文档检索</div>
                    <div className="desc">不限次</div>
                </div>
            </div>
            <div className="title m-t-16  font-bold" style={{ fontSize: '25px' }}>普通用户和会员权益对比</div>
            <div className="card-frame flex m-t-20 m-b-20">
                <Card
                    className="m-r-40 shadow"

                    hoverable={true}

                    style={{
                        width: 400,
                    }}
                >
                    <div className="flex-c-center-center">
                        <div className="flex-r-center-center"> <IconFont type="icon-putongyonghu" className="m-r-20 font-size-vlg"></IconFont><h3>普通用户</h3></div>
                        <Divider />

                    </div>


                </Card>
                <Card
                    className="shadow"

                    hoverable={true}


                    style={{
                        width: 400,
                    }}
                >
                    <div className="flex-c-center-center">
                        <div className="flex-r-center-center"><img src="/img/vip-header.png" className="img-sm m-r-20" alt="" /><h3>尊贵会员</h3></div>
                        <Divider />

                    </div>


                </Card>


            </div>



        </div>





    </div>
}
export default Center