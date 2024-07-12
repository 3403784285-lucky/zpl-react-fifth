import { Input, Dropdown, Space, Button,Card } from 'antd';
import { DownOutlined } from '@ant-design/icons'
const { TextArea } = Input
const itemsDrop = [
    {
        label: '更正式',
        key: '0',
    },
    {
        label: '党政风',
        key: '1',
    },
    {
        label: '更活泼',
        key: '2',
    },
    {
        label: '中译英',
        key: '3',
    },
    {
        label: '英译中',
        key: '4',
    },
    {
        label: '普通改写',
        key: '5',
    },
];
function Polishing() {


    return <div className="p-30">
        <h4 className='m-b-20'>文本润色</h4>
        <div className="text-frame b-rd-10  p-10" style={{ border: 'lightgrey 1px solid ' }}>
            <TextArea
                maxLength={100}
                style={{
                    height: 120,
                    resize: 'none',
                    border: 0
                }}
            />
            <div className="button-frame p-t-10 flex" style={{ justifyContent: "space-between" }}>
                <Dropdown
                    className='flex-c-center-center'
                    menu={{
                        items: itemsDrop,
                        defaultSelectedKeys
                    }}
                    trigger={['click']}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            普通改写
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Button className='bg-color-second b-rd-10 text-color-white'>开始改写</Button>
            </div>
        </div>
        <div className="tip-correction m-t-30" ><strong>结果</strong></div>

        <div className='flex-c-center-center'>
            <Card className='m-t-20 shadow'
                hoverable

                style={{
                    width: 400,


                }}
            // cover={<img alt="example" src="/img/nodata.png" />}
            >

                {<div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
                    : 当然，这非常重要，做项目，还可以，但是有时候还是浪费了不少时间。另外心情非常紧张，应该在前一段时间把核心技术讨论掉，否则后面时间就没了，就过去了。
                </div>}


            </Card>

        </div>



    </div>
}
export default Polishing;