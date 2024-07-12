import { Input, Button, Radio, Menu, Pagination, Popover, Modal, Divider, Select } from 'antd';
import { Table, Typography } from 'antd';
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../api/user/file';
import { useStorage } from "web-localstorage-plus";

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_b9ss08hx8l8.js'
    ],
});



const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};


function File() {
    const [loading, setLoading] = useState(false);
    const [dataDeal, setDataDeal] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpenCopy, setIsModalOpenCopy] = useState(false);
    const [isModalOpenThree, setIsModalOpenThree] = useState(false);
    const [open, setOpen] = useState(false);

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
    const onClickCopy = async () => {
        // const res=await fileFun.favorite({userId:3,documentId:61});
        // const res = await userFun.searchUsers()
        // console.log(res);
        setIsModalOpenThree(true);
        setOpen(false)

    }
    const handleChange = (value) => {
        console.log(value); // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const onPageChange = (page) => {
        setCurrentPage(page);
      };
    
      // 根据当前页码和每页显示条数计算要展示的数据
      const startIndex = (currentPage - 1) * 5;
      const endIndex = startIndex + 5;
      const currentData = dataDeal.slice(startIndex, endIndex);
    

    const content = (<div >
        <div className='p-6 hover-effect b-rd-6' onClick={onClickCopy}>删除文件</div>
        <div className='p-6 hover-effect b-rd-6'>重命名</div>
        <div className='p-6 hover-effect b-rd-6'>历史版本</div>

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
    const toggleFavorite = (record) => {
        const newDataDeal = dataDeal.map(item => {
            if (item.id === record.id) {
                return {
                    ...item,
                    isFavorite: !item.isFavorite
                };
            }
            return item;
        });
        setDataDeal(newDataDeal);
    };
    const columns = [
        {
            title: '文件名称',
            dataIndex: 'name',
            render: (text, record) => (
                <span className='flex-start-center'>
                    <IconFont type="icon-wordIcon" className='m-r-16 font-size-vlg' />
                    <div className='text-ellipsis' style={{ width: '100px' }}> {text}</div>

                    <IconFont type="icon-yishoucang1" className='m-l-20 share-button' />
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
            title: '修改时间',
            dataIndex: 'updateTime',
            sorter: {
                compare: (a, b) => a.updateTime - b.updateTime,
                multiple: 1,
            },
            render: (text, record) => (
                <span>
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


    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;
    useEffect(() => {
        const fetchData = async () => {
          // 获取 storage
          const storage = useStorage();
          const userId = storage.getItem('openid');
    
          // 进行请求，获取所有数据
          const res = await fileFun.getAllUserDocument(userId);
          console.log(res.data);
    
          // 设置数据
          setDataDeal(res.data);
        };
    
        // 初始化加载数据
        fetchData();
      }, []);
    return <div className="h-full p-10" >
        <div className='flex' style={{ justifyContent: 'space-between' }}>

            <div className='m-t-24'>


                <Button danger type='primary' className='b-rd-6 m-b-20 m-r-10' onClick={start} disabled={!hasSelected} loading={loading}>删除文件</Button>
                <span className='m-r-8 m-b-20 text-color-grey'>
                    {hasSelected ? `已选中 ${selectedRowKeys.length} 个文件` : ''}
                </span>
            </div>
        </div>

        <Table columns={columns} rowSelection={rowSelection} dataSource={currentData} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
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
            <div className='m-t-20 m-l-80'>您确认<span className='text-color-red'>删除</span>该文件吗</div>
            <Button className=' m-t-30 b-rd-8 m-r-16 m-l-200' type='primary'>确认</Button>
            <Button className=' m-t-16 b-rd-8 bg-color-grey text-color-white'>取消</Button>

        </Modal>

        {/* <div className="text-color-grey flex-center-center m-8" >没有更多咯</div> */}
        <Pagination
        className='m-t-20 position-absolute'
        style={{ bottom: 60, left: 600 }}
        defaultCurrent={1}
        pageSize={5}
        total={dataDeal.length}
        showSizeChanger={false} // 禁用每页条数选择器
        showQuickJumper
        hideOnSinglePage={true}
        onChange={onPageChange} // 分页器变化回调
      />

    </div>

}

export default File;