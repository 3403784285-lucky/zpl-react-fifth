import { Input } from 'antd';
const { TextArea } = Input
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

        </div>
        <div className="button-frame">
        <Dropdown
    menu={{
      items,
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
        </div>



    </div>
}
export default Polishing;