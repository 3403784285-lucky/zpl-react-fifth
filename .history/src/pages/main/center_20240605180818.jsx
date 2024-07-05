import { Button } from "antd"

function Center() {
    return <div className="frame ">
        <div className="flex-r-start-center" style={{ justifyContent: 'space-between', backgroundImage: "url('/img/module-back.png')", height: '400px' }}>
            <img src="/img/vip-header.png" alt="" className="" style={{ width: '22%', height: '250px' }} />
            <div className="text  text-color-vip" >
                <div className="title font-bold" style={{ fontStyle: 'italic', fontSize: '60px' }}>Digital VIP</div>
                <div className="desc">畅享6亿+优质内容|会员专属高效工具|享受极致会员体验</div>
            </div>
            <div className="frame mosh shadow m-r-50" style={{ width: '400px', height: '230px' }}>
                <div className="one flex">
                    <img src="https://ts3.cn.mm.bing.net/th?id=OIP-C.p7Zf-FLKq5eU0uessiffgwHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=2&pid=3.1&rm=2" style={{ width: '43px', height: '43px', borderRadius: '50%' }} />

                    <div className="name">
                        <div className="main font-bold font-size-lg">穿花云烛展</div>
                        <div className="desc font-size-sm">首次开通享低价优惠</div>
                    </div>
                </div>
                <div className="two flex">
                    <div className="number-one">
                        <div className="number">0</div>
                        <div className="desc">云烛币</div>

                    </div>
                    
                    <div className="number-two">
                    <div className="number">0</div>
                        <div className="desc">下载特权</div>
                    </div>
                    <div className="number-three">
                    <div className="number">0</div>
                        <div className="desc">优惠卷</div>
                    </div>

                </div>
                <div className="three"><Button>限时2.9开通VIP</Button></div>
                <div className="four"></div>

            </div>




        </div>





    </div>
}
export default Center