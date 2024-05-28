import { Input, Dropdown, Space,Button } from 'antd';
import { DownOutlined } from '@ant-design/icons'
const { TextArea } = Input
const itemsDrop = [
    {
        label: <a href="https://www.antgroup.com">1st menu item</a>,
        key: '0',
    },
    {
        label: <a href="https://www.aliyun.com">2nd menu item</a>,
        key: '1',
    },
    {
        type: 'divider',
    },
    {
        label: '3rd menu item',
        key: '3',
    },
];
function Polishing() {


    return <div className="p-30">
        <h4 className='m-b-20'>文本润色</h4>
        <div className="text-frame b-rd-10  p-20" style={{ border: 'lightgrey 1px solid ' }}>
            <TextArea
                maxLength={100}
                style={{
                    height: 120,
                    resize: 'none',
                    border: 0
                }}
            />
            <div className="button-frame p-t-10">
                <Dropdown
                    menu={{
                       items: itemsDrop,
                    }}
                    trigger={['click']}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space>
                            Click me
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Button className='bg-color-second b-rd-10 text-color-white'>开始改写</Button>
            </div>
        </div>
    </div>
}
export default Polishing;