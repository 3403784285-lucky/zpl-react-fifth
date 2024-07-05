

import { Radio, Dropdown, Typography, Space } from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../../api/user/file';
import userFun from '../../../api/user/user';
import { useStorage } from "web-localstorage-plus";

const optionsWithDisabled = [
    { label: '编辑过', value: 'Apple' },
    { label: '浏览过', value: 'Pear' },

];
const onClick = async () => {
    // const res=await fileFun.favorite({userId:3,documentId:61});
    const res = await userFun.searchUser()
    console.log(res);

}
const items = [
    {
        key: '1',
        label: 'Item 1',
    },
    {
        key: '2',
        label: 'Item 2',
    },
    {
        key: '3',
        label: 'Item 3',
    },
];
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_ybuylbais59.js'
    ],
});
function FileLay() {
    const storage = useStorage();

    const [value4, setValue4] = useState('Apple');
    const onChange4 = ({ target: { value } }) => {
        console.log('radio4 checked', value);
        setValue4(value);
    };
    console.log(storage.getItem("token") + "这是token")
    return <>


        <div className="start-frame  p-30">
            <div className="upper-frame">
                <div className="title font-size-lg font-bold">开始</div>
                <div className="lay-out flex m-16">
                    <div className="list-one b-rd-10 m-10 p-10 flex-r-center-center shadow" style={{ width: '17%', height: '70px' }}>
                        <IconFont className='font-size-vlg m-r-20' type="icon-xinzengwenjianjia" />
                        <div className="right-add-file flex-c-center-center">
                            <div className="big-text" onClick={onClick}>新建文档</div>
                            <div className="small-text font-size-sm text-color-grey">暂时只有普通文档</div>
                        </div>
                    </div>
                    <div className="list-two b-rd-10 m-10 p-10 flex-r-center-center shadow" style={{ width: '17%', height: '70px', }}>
                        <IconFont className='font-size-vlg m-r-20' type="icon-mobanzhongxin-01" />
                        <div className="module-center flex-c-center-center">
                            <div className="big-text">模版中心</div>
                            <div className="small-text font-size-sm text-color-grey">从模版中获取灵感</div>
                        </div>

                    </div>
                </div>

            </div>
            <div className="bottom-frame">
                <div className="title font-size-lg m-b-16 font-bold">文档</div>
                <div className="file-frame p-20 flex" style={{ justifyContent: 'space-between' }} >
                    <Radio.Group
                        options={optionsWithDisabled}
                        onChange={onChange4}
                        value={value4}
                        style={{ width: "" }}
                        optionType="button"
                        buttonStyle="solid"
                    />
                    <div className="dropdown-frame flex-r-center-center">
                        <Dropdown
                            className='m-r-10'
                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ['3'],
                            }}
                        >
                            <Typography.Link>
                                <Space>
                                    类型
                                    <DownOutlined />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                        <Dropdown
                            className='m-r-10'

                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ['3'],
                            }}
                        >
                            <Typography.Link>
                                <Space>
                                    归属
                                    <DownOutlined />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                        <Dropdown
                            className='m-r-10'

                            menu={{
                                items,
                                selectable: true,
                                defaultSelectedKeys: ['3'],
                            }}
                        >
                            <Typography.Link>
                                <Space>
                                    创建者
                                    <DownOutlined />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                    </div>

                </div>



            </div>
        </div>

    </>
}
export default FileLay;



