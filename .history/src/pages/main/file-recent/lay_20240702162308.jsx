

import { Radio, Dropdown, Typography, Space } from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../../api/user/file';
import userFun from '../../../api/user/user';
import { useStorage } from "web-localstorage-plus";
import { Table, Modal ,Pagination } from 'antd';
const showTotal = (total) => `Total ${total} items`;
const columns = [
    {
        title: '文件类型',
        dataIndex: 'name',
    },
    {
        title: '文件位置',
        dataIndex: 'chinese',
        sorter: {
            compare: (a, b) => a.chinese - b.chinese,
            multiple: 3,
        },
    },
    {
        title: '创建者',
        dataIndex: 'math',
        sorter: {
            compare: (a, b) => a.math - b.math,
            multiple: 2,
        },
    },
    {
        title: '最后修改',
        dataIndex: 'english',
        sorter: {
            compare: (a, b) => a.english - b.english,
            multiple: 1,
        },
    },
];

const data = [
    {
        key: '1',
        name: 'John Brown',
        chinese: 98,
        math: 60,
        english: 70,
    },
    {
        key: '2',
        name: 'Jim Green',
        chinese: 98,
        math: 66,
        english: 89,
    },

    {
        key: '4',
        name: 'Jim Red',
        chinese: 88,
        math: 99,
        english: 89,
    },
];
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
const optionsWithDisabled = [
    { label: '编辑过', value: 'Apple' },
    { label: '浏览过', value: 'Pear' },

];

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

const getFolders= async()=>{
    const res=await userFun.getFolders();
    console.log(res+"结束")

}
const IconFont = createFromIconfontCN({
    scriptUrl: [
     ''
    ],
});
function FileLay() {
    const storage = useStorage();

    const [value4, setValue4] = useState('Apple');
    const onChange4 = ({ target: { value } }) => {
        console.log('radio4 checked', value);
        setValue4(value);
    };
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onClick = async () => {
        // const res=await fileFun.favorite({userId:3,documentId:61});
        // const res = await userFun.searchUsers()
        // console.log(res);
        setIsModalOpen(true);

    }
    const handleOk = () => {
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };


    return <>


        <div className="start-frame p-x-30 p-y-10" >
            <div className="upper-frame p-t-20">
                <div className="title font-size-lg font-bold">开始</div>
                <div className="lay-out flex m-16">
                    <div className="list-one b-rd-10 m-10 p-10 flex-r-center-center shadow" style={{ width: '17%', height: '70px' }}>
                        <IconFont className='font-size-vlg m-r-20' type="icon-xinzengwenjianjia" />
                        <div className="right-add-file flex-c-center-center">
                            <div className="big-text" onClick={onClick}>新建文档</div>
                            <div className="small-text font-size-sm text-color-grey">暂时只有普通文档</div>
                        </div>

                    </div>
                    <Modal title="新建" open={isModalOpen} footer={null} onOk={handleOk} onCancel={handleCancel} width={300}>
                        <div className="flex">
                            <div className="model">
                            <IconFont className='font-size-vlg m-r-20' type="icon-tubiaozhizuomoban-" />
                            <p>模版</p>
                            </div>
                            <div className="model">
                            <IconFont className='font-size-vlg m-r-20' type="icon-wendang" />
                            <p>文档</p>
                            </div>
                            <div className="model">
                            <IconFont className='font-size-vlg m-r-20' type="icon-shangchuan" />
                            <p>上传</p>
                            </div>
                            <div className="model">
                            <IconFont className='font-size-vlg m-r-20' type="icon-wenjianjia" />
                            <p>文件夹</p>
                            </div>
                            <div className="model">
                            </div>
                        </div>
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
                                    时间
                                    <DownOutlined />
                                </Space>
                            </Typography.Link>
                        </Dropdown>
                    </div>

                </div>
                <Table columns={columns} dataSource={data} onChange={onChange} pagination={false}/>
                <Pagination className='m-t-20 m-l-230' total={50} showSizeChanger showQuickJumper hideOnSinglePage={true}/>




            </div>
        </div>

    </>
}
export default FileLay;



