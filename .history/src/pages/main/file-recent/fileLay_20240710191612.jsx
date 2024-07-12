

import { Radio, Dropdown, Typography, Space, Button, Divider, Popover, message } from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../../api/user/file';
import userFun from '../../../api/user/user';
import shareCFun from '../../../api/user/share';
import { useStorage } from "web-localstorage-plus";
import { Table, Modal, Pagination } from 'antd';
const showTotal = (total) => `Total ${total} items`;
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js'
    ],
});


const data = [
    {
        "document": {
            "id": 45,
            "userId": 3,
            "name": "23213",
            "content": "# 示例论文标题\n\n",
            "summary": "1231",
            "type": 21312,
            "label": "1312",
            "subject": "132",
            "category": "1321",
            "status": 1312,
            "isDeleted": 0,
            "likeCount": 0,
            "visibility": 1,
            "createTime": "2024-06-07 17:17:24",
            "updateTime": "2024-06-07 17:17:24"
        },
        "category": "今天",
        "user": {
            "id": 3,
            "username": "lz",
            "password": "**********",
            "email": "466",
            "level": 0,
            "money": 0,
            "nickname": "廖梓行",
            "avatar": "http://8.130.128.14:9000/myfile/%E9%BB%98%E8%AE%A4%E5%A4%B4%E5%83%8F.png",
            "createTime": "2024-06-01 00:21:23",
            "updateTime": "2024-06-01 00:21:23"
        }
    },

];
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


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
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const storage = useStorage();
    const [dataDeal, setDataDeal] = useState([]);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [value4, setValue4] = useState('Apple');
    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const toDocument=(record)=>{
        console.log("!1")
        const storage=useStorage();
        const navigate=useNavigate();
        const userId=storage.getItem("openid")
        // const res=await shareCFun.shareCollaboration({room:record.id,userId:userId})
        console.log(res)
    }
    const onChange4 = ({ target: { value } }) => {
        console.log('radio4 checked', value);
        setValue4(value);
    };

    const columns = [
        {
            title: '文件名称',
            dataIndex: 'name',
            render: (text, record) => (
                <span key={record.id} className='flex-r-start-center' onClick={()=>toDocument(record)}>
                    <IconFont type="icon-wordIcon" className='m-r-16 font-size-vlg' />
                    {text}
                    <IconFont type="icon-yishoucang1" className='m-l-20' />
                </span>
            ),
        },

        {
            title: '创建者',
            dataIndex: 'nickname',
            sorter: {
                compare: (a, b) => a.nickname - b.nickname,
                multiple: 2,
            },
        },
        {
            title: '最后修改',
            dataIndex: 'updateTime',
            sorter: {
                compare: (a, b) => a.updateTime - b.updateTime,
                multiple: 1,
            },
            render: (text, record) => (
                <span key={record.id}>
                    {text}
                    <Button type='primary' className='position-absolute share-button b-rd-6' onClick={shareFun} style={{ right: 45, bottom: 19 }}>共享</Button>
                    <Popover
                        trigger="click"
                        open={open}
                        content={content}
                        onOpenChange={handleOpenChange}
                    >
                        <IconFont type="icon-gengduo" className='font-size-mlg position-absolute share-button' style={{ right: 15, bottom: 23 }}></IconFont>
                    </Popover>

                </span>
            ),
        },
    ];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenCopy, setIsModalOpenCopy] = useState(false);
    const [isModalOpenThree, setIsModalOpenThree] = useState(false);
    const [selectedOption, setSelectedOption] = useState('文档');
    const [selectedType,setSelectedType]=useState(0)
    const [selectedLabel,setSelectedLabel]=useState("理科")
    const onClick = async () => {
        // const res=await fileFun.favorite({userId:3,documentId:61});
        // const res = await userFun.searchUsers()
        // console.log(res);
        setIsModalOpen(true);

    }
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const onClickCopy = async () => {
        // const res=await fileFun.favorite({userId:3,documentId:61});
        // const res = await userFun.searchUsers()
        // console.log(res);
        setIsModalOpenThree(true);
        setOpen(false)

    }
    const content = (<div >
        <div className='p-6 hover-effect b-rd-6' onClick={onClickCopy}>删除记录</div>
        <div className='p-6 hover-effect b-rd-6'>历史版本</div>
        <div className='p-6 hover-effect b-rd-6'>重命名</div>

    </div>)
    const shareFun = () => {
        setIsModalOpenCopy(true);
    }
    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeys([]);
            setLoading(false);
        }, 1000);
    };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const handleOkCopy = () => {
        setIsModalOpenCopy(false);
    };
    const handleCancelCopy = () => {
        setIsModalOpenCopy(false);
    };
    const handleOkThree = () => {
        setIsModalOpenThree(false);
    };
    const handleCancelThree = () => {
        setIsModalOpenThree(false);
    };
    const createDocument=async()=>{
        const category=selectedOption;//文档还是模板
        const storage=useStorage()
        const userId=storage.getItem("openid")//用户id
        const type=selectedType;
        const subject=selectedLabel;
        const res=await fileFun.create({userId,type,subject,category})
        console.log(res)
        message.success(res.msg)
        handleOk()
        
    }
    useEffect(() => {

        const deal = [

            {
                "name": `${data[0].document.name}`,
                "nickname": data[0].user.username,
                "updateTime": data[0].document.updateTime
            },
            // {
            //     "name": data[0].document.name,
            //     "nickname": data[0].user.username,
            //     "updateTime": data[0].document.updateTime
            // },
            // {
            //     "name": data[0].document.name,
            //     "nickname": data[0].user.username,
            //     "updateTime": data[0].document.updateTime
            // }
        ]
        setDataDeal(deal)
    }, [])
    const handleChange = (value) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    };
    const labelSelect=(value,option)=>{
        console.log(value,option)
        setSelectedLabel(option.value)

    }
    const documentSelect=(value,option)=>{
        console.log(value,option)
        selectedType(option.key)

    }


    return <>


        <div className="start-frame p-x-30 p-y-10" >
            <div className="upper-frame p-t-20">
                <div className="title font-size-lg font-bold">开始</div>
                <div className="lay-out flex m-16">
                    <div className="list-one b-rd-10 m-10 p-10 flex-r-center-center shadow" style={{ width: '17%', height: '70px' }}>
                        <IconFont className='font-size-vlg m-r-20' type="icon-xinzengwenjianjia" />
                        <div className="right-add-file flex-c-center-center">
                            <div className="big-text" onClick={onClick}>文档</div>
                            <div className="small-text font-size-sm text-color-grey">暂时只有word文档</div>
                        </div>

                    </div>
                    <Modal title="新建" visible={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} width={300}>
                        <div className="flex">
                            <div className="model m-r-10 p-x-10 p-y-6 b-rd-6" style={{backgroundColor:selectedOption=='文档'?'#c7d2d3':'white'}} onClick={() => handleOptionClick('文档')}>
                                <IconFont className='font-size-vlg ' type="icon-wendang" />
                                <p>文档</p>
                            </div>
                            <div className="model m-r-20 p-x-10 p-y-6 b-rd-6" style={{backgroundColor:selectedOption=='模板'?'#c7d2d3':'white'}} onClick={() => handleOptionClick('模板')}>
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
                    <Modal title="共享" open={isModalOpenCopy} footer={null} onOk={handleOkCopy} onCancel={handleCancelCopy} width={300}>

                        <Divider />
                        <div className='flex-center-center' style={{ justifyContent: 'space-between' }}>
                            <div><IconFont type='icon-suoding' className='font-size-lg m-r-10'></IconFont>链接权限</div>
                            <Select
                                labelInValue
                                defaultValue={{
                                    value: 'edit',
                                    label: '可编辑',
                                }}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: 'edit',
                                        label: '可编辑',
                                    },
                                    {
                                        value: 'view',
                                        label: '可查看',
                                    },
                                ]}
                            />
                        </div>
                        <Divider />
                        <div className='flex-center-center' style={{ justifyContent: 'space-between' }}>
                            <div><IconFont type='icon-list-disorder' className='font-size-lg m-r-10'></IconFont>链接权限</div>
                            <Select
                                labelInValue
                                defaultValue={{
                                    value: 'forever',
                                    label: '永久有效',
                                }}
                                style={{
                                    width: 120,
                                }}
                                onChange={handleChange}
                                options={[
                                    {
                                        value: '7',
                                        label: '7天有效',
                                    },
                                    {
                                        value: '30',
                                        label: '30天有效',
                                    },
                                    {
                                        value: 'forever',
                                        label: '永久有效',
                                    },
                                ]}
                            />
                        </div>
                        <Divider />
                        <div className='flex-center-center' style={{ justifyContent: 'space-between' }}>
                            <div><IconFont type='icon-link-break' className='font-size-lg m-r-10'></IconFont>lHcERCmHJOFO3k</div>
                            <Button type='primary' className='b-rd-6'>复制链接</Button>

                        </div>

                        <Divider />


                        <Button className='b-rd-6 bg-color-first text-color-white w-full' size='large'>导出为word文档</Button>



                    </Modal>

                    <Modal title="删除" open={isModalOpenThree} footer={null} onOk={handleOkThree} onCancel={handleCancelThree} width={400} >
                        <div className='m-t-20 m-l-80'>您确认<span className='text-color-red'>删除</span>本条记录吗</div>
                        <Button className=' m-t-30 b-rd-8 m-r-16 m-l-200' type='primary'>确认</Button>
                        <Button className=' m-t-16 b-rd-8 bg-color-grey text-color-white'>取消</Button>

                    </Modal>


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
                <div className="file-frame p-y-20 flex" style={{ justifyContent: 'space-between' }} >
                    <div>
                        <Button danger type='primary' className='b-rd-6' onClick={start} disabled={!hasSelected} loading={loading}>删除记录</Button>
                        <span className='m-l-8 text-color-grey'>
                            {hasSelected ? `已选中 ${selectedRowKeys.length} 条记录` : ''}
                        </span>
                    </div>

                    <div className="dropdown-frame flex-r-center-center">
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

                </div>
                <Table columns={columns} rowKey="name"  rowSelection={rowSelection} dataSource={dataDeal} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
                    onRow={(record, rowIndex) => ({
                        onMouseEnter: () => {
                            // 鼠标移入行时执行的操作
                            const rows = document.querySelectorAll('.hover-row');
                            rows[rowIndex].classList.add('hover-row-active');
                        },
                        onMouseLeave: () => {
                            // 鼠标移出行时执行的操作
                            const rows = document.querySelectorAll('.hover-row');
                            rows[rowIndex].classList.remove('hover-row-active');
                        },
                    })} />
                <div className="text-color-grey flex-center-center m-8" >没有更多咯</div>
                <Pagination className='m-t-20 position-absolute' style={{ bottom: 40, left: 500 }} total={50} showSizeChanger showQuickJumper hideOnSinglePage={true} />




            </div>
        </div>

    </>
}
export default FileLay;



