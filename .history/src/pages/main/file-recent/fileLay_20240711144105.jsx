

import { Radio, Dropdown, Typography, Space, Button, Divider, Popover, message } from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../../api/user/file';

import { useStorage } from "web-localstorage-plus";
import { Table, Modal, Pagination } from 'antd';

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js'
    ],
});



const items2 = [
    {
        key: '1',
        label: '今天',
    },
    {
        key: '2',
        label: '昨天',
    },
    {
        key: '3',
        label: '近七天',
    },
    {
        key: '4',
        label: '更早',
    },
];
const items1 = [
    {
        key: '5',
        label: '所有人',
    },
    {
        key: '6',
        label: '我自己',
    },
    {
        key: '7',
        label: '其他人',
    },

];
const items3 = [
    {
        key: '8',
        label: 'word',
    },

];
import { Select, Tag } from 'antd';
import TableMy from '../../../components/utils/tableMy';
import shareCFun from '../../../api/user/share';

const options1 = [
    {
        key: 0,
        value: '普通文档',
    },
    {
        key: 1,
        value: '论文',
    },

];
const options2 = [
    {
        key: '理科',
        value: '理科',
    },
    {
        key: '文科',
        value: '文科',
    },

];

const tagRender = (props) => {
    const { label, value, closable, onClose } = props;
    console.log(label, value)
    const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };
    return (
        <Tag
            color={'green'}
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
                marginInlineEnd: 4,
            }}
        >
            {label}
        </Tag>
    );
};
// const getFolders = async () => {
//     const res = await userFun.getFolders();
//     console.log(res + "结束")

// }


function FileLay() {



    const [isModalOpen, setIsModalOpen] = useState(false);

    const [selectedOption, setSelectedOption] = useState('文档');
    const [selectedType, setSelectedType] = useState(0)
    const [selectedLabel, setSelectedLabel] = useState("理科")
    const onClick = async () => {
        // const res=await fileFun.favorite({userId:3,documentId:61});
        // const res = await userFun.searchUsers()
        // console.log(res);
        setIsModalOpen(true);

    }
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };




    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const createDocument = async () => {
        const category = selectedOption;//文档还是模板
        const storage = useStorage()
        const userId = storage.getItem("openid")//用户id
        const type = selectedType;
        const subject = selectedLabel;
        const res = await fileFun.create({ userId, type, subject, category })
        console.log(res)
        message.success(res.msg)
        handleOk()

    }

    const labelSelect = (value, option) => {
        console.log(value, option)
        setSelectedLabel(option.value)

    }
    const documentSelect = (value, option) => {
        console.log(value, option)
        selectedType(option.key)

    }


    return <>


        <div className="start-frame p-x-30 p-y-10" >
            <div className="upper-frame p-t-20">
                <div className="title font-size-lg font-bold">开始</div>
                <div className="lay-out m-16 flex">
                    <div className="list-one b-rd-10 m-10 p-10 flex-r-center-center shadow" style={{ width: '17%', height: '70px' }}>
                        <IconFont className='font-size-vlg m-r-20' type="icon-xinzengwenjianjia" />
                        <div className="right-add-file flex-c-center-center">
                            <div className="big-text" onClick={onClick}>文档</div>
                            <div className="small-text font-size-sm text-color-grey">暂时只有word文档</div>
                        </div>
                    </div>
                    <Modal title="新建" visible={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} width={300}>
                        <div className="flex">
                            <div className="model m-r-10 p-x-10 p-y-6 b-rd-6" style={{ backgroundColor: selectedOption == '文档' ? '#c7d2d3' : 'white' }} onClick={() => handleOptionClick('文档')}>
                                <IconFont className='font-size-vlg ' type="icon-wendang" />
                                <p>文档</p>
                            </div>
                            <div className="model m-r-20 p-x-10 p-y-6 b-rd-6" style={{ backgroundColor: selectedOption == '模板' ? '#c7d2d3' : 'white' }} onClick={() => handleOptionClick('模板')}>
                                <IconFont className='font-size-vlg' type="icon-shangchuan" />
                                <p>模板</p>
                            </div>
                        </div>
                        <h4 className='m-t-10 m-b-6'>文档类型</h4>
                        <Select
                            maxTagCount={1}
                            mode="tags"
                            onSelect={documentSelect}
                            tagRender={tagRender}
                            defaultValue={'普通文档'}
                            style={{ width: '100%' }}
                            maxCount={1}
                            options={options1}
                        />
                        <h4 className='m-t-10 m-b-6'>学科类型</h4>
                        <Select
                            maxTagCount={1}
                            mode="tags"
                            onSelect={labelSelect}
                            tagRender={tagRender}
                            maxCount={1}
                            defaultValue={'理科'}
                            style={{ width: '100%' }}
                            options={options2}
                        />
                        <Button className='w-full m-y-10 b-rd-16' type='primary' onClick={createDocument}>确认</Button>
                        <Button className='w-full m-y-5 b-rd-16 bg-color-grey text-color-white' onClick={handleCancel}>取消</Button>
                    </Modal>

                    <div className="list-two b-rd-10 m-10 p-10 flex-r-center-center shadow" style={{ width: '17%', height: '70px', }}>
                        <IconFont className='font-size-vlg m-r-20' type="icon-mobanzhongxin-01" />
                        <div className="module-center flex-c-center-center">
                            <div className="big-text">模版中心</div>
                            <div className="small-text font-size-sm text-color-grey">从模版中获取灵感</div>
                        </div>

                    </div>

                </div>

                <div className="bottom-frame position-relative">
                    <div className="title font-size-lg m-b-16 font-bold">文档</div>



                    <div className="dropdown-frame position-absolute" style={{right:0,top:70}}>
                        <Dropdown
                            className='m-r-10'
                            menu={{
                                items: items3,
                                selectable: true,

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
                                items: items1,
                                selectable: true,

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
                                items: items2,
                                selectable: true,

                            }}
                        >
                            <Typography.Link>
                                <Space>
                                    时间
                                    <DownOutlined />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                    </div>
                    <TableMy getFun={shareCFun.recent} dataContent={2} deleteFun={fileFun.deleteRecentDocument} deleteBatchFun={null} uniqueText="记录"/>







                </div>
            </div>
        </div>

    </>
}
export default FileLay;



