import { Button,Menu } from "antd"
const items = [
    {
        label: '优质内容',
        key: 'mail',
    
    }, 
    {
        label: '高效工具',
        key: 'hah',
     
    }, 
    {
        label: '尊享体验',
        key: 'hah',
     
    },
]
function Center() {
    const [current, setCurrent] = useState('mail');
    const onClick = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };
    return <div className="frame " style={{height: '622px', overflowY: "auto"}}>
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
                <div className="two flex" style={{justifyContent:'space-between'}}>
                    <div className="number-one  m-x-20">
                        <div className="number flex-r-center-center">0</div>
                        <div className="desc">云烛币</div>

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
                <div className="three"><Button className="b-rd-4 font-bold" style={{width:'300px'}}  size="large" type="primary">限时2.9开通VIP</Button></div>
                <div className="four text-color-vip font-size-sm">会员享6亿+优质内容免费下载</div>

            </div>

            




        </div>

        <div className="bottom flex-c-center-center">
            <div className="title m-t-26  font-bold" style={{fontSize:'25px'}}>VIP 专属权益</div>
            <Menu className='font-size-lg m-20'  onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
            <div className="list p-40 flex w-full" style={{justifyContent:'space-between'}}>
                <div className="pay-doc flex-c-center-center shadow b-rd-10" style={{width:'300px',height:'250px'}}>
                    <img src="/img/pay-doc.png" className="img-lg" alt=""  />
                    <div className="title font-bold font-size-base m-b-10">付费文档会员专属折扣</div>
                    <div className="desc">享受专属低价</div>
                </div>
                <div className="pay-doc flex-c-center-center shadow b-rd-10" style={{width:'300px',height:'250px'}}>
                    <img src="/img/lib-vip.png" className="img-lg" alt=""  />
                    <div className="title font-bold font-size-base m-b-10">推荐文档集</div>
                    <div className="desc">无限优质文档</div>
                </div>
                <div className="pay-doc flex-c-center-center shadow b-rd-10" style={{width:'300px',height:'250px'}}>
                    <img src="/img/date-doc.png" className="img-lg" alt=""  />
                    <div className="title font-bold font-size-base m-b-10">优质热搜榜单</div>
                    <div className="desc">别人关注抢先看</div>
                </div>
            </div>


        </div>





    </div>
}
export default Center