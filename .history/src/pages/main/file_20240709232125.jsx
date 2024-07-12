import { Input,Table,  Button, Radio, Menu, Pagination, Popover, Modal, Divider, Select, message } from 'antd';

import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import fileFun from '../../api/user/file';
import { useStorage } from "web-localstorage-plus";
import { useState } from 'react';
import shareCFun from '../../api/user/share';
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
    const [popoverOpenStates, setPopoverOpenStates] = useState([]); // 状态数组，用于存储每行Popover的展开状态
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态变量
    const [selectedDocumentId, setSelectedDocumentId] = useState(null); // 新增选中文档的id状态
    const [selectedValue,setSelectedValue]=useState('EDIT');
    const [selectedValueCopy,setSelectedValueCopy]=useState(null);
    const [selectLink,setSelectLink]=useState(null);
    const [editingFileName, setEditingFileName] = useState({ id: null, name: '' });


    const handleOkCopy = () => {
        setIsModalOpenCopy(false);
    };
    const handleCancelCopy = () => {
        setIsModalOpenCopy(false);
    };
    const handleOkThree = (e) => {
        setIsModalOpenThree(false);
    };
    const handleCancelThree = () => {
        setIsModalOpenThree(false);
    };

    const handleDeleteConfirm =async () => {
        // 在这里打印当前选中文档的id
        console.log(selectedDocumentId);
        const storage=useStorage();
        storage.setItem("documentId",selectedDocumentId)
        const res=await fileFun.delete(selectedDocumentId);
        message.success(res.msg)
        const updatedData = dataDeal.filter(item => item.id !== selectedDocumentId);
        setDataDeal(updatedData); // 更新数据
        setIsModalOpenThree(false);
        handleOkThree();
    };
    const onClickCopy = (record) => {
        console.log(record)
        setSelectedDocumentId(record.id); // 设置选中文档的id
        setIsModalOpenThree(true);
        setPopoverOpenStates(new Array(dataDeal.length).fill(false));
    };

    const handleChange = (value) => {
        setSelectedValue(value) // { value: "lucy", key: "lucy", label: "Lucy (101)" }
    };
    const handleChangeCopy=(value)=>{
        setSelectedValueCopy(value)
    }

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // 根据当前页码和每页显示条数计算要展示的数据
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    const currentData = dataDeal.slice(startIndex, endIndex);


   
    const shareFun = async(record) => {
        const id=record.id;
        const editPermission=selectedValue;
        const validDays=selectedValueCopy;
        const res=await shareCFun.document({id,validDays,editPermission})
        // message.success(res.msg)
        console.log(res)
        setSelectLink(res.msg)
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
   
    const renameClick = (record) => {
        setEditingFileName({ id: record.id, name: record.name });
    };

    const handleRenameChange = (e) => {
        setEditingFileName({ ...editingFileName, name: e.target.value });
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
            render: (text, record, index) => (
                <span className='flex-start-center'>
                    <IconFont type="icon-wordIcon" className='m-r-16 font-size-vlg' />
                    <div className='text-ellipsis' style={{ width: '200px' }}>{text}</div>
                    <IconFont
                        type="icon-yishoucang1"
                        className='share-button'
                        onClick={() => toggleFavorite(record)}
                        style={{ color: record.isFavorite ? 'red' : 'inherit', cursor: 'pointer' }}
                    />
                    <Popover
                        trigger="click"
                        open={popoverOpenStates[index]}
                        content={(
                            <div>
                                <div className='p-6 hover-effect b-rd-6' onClick={() => onClickCopy(record)}>删除文件</div>
                                <div className='p-6 hover-effect b-rd-6' onClick={()=>renameClick(record)}>重命名</div>
                                <div className='p-6 hover-effect b-rd-6'>历史版本</div>
                            </div>
                        )}
                        onOpenChange={(newOpen) => handleOpenChange(newOpen, index)}
                    >
                        <IconFont type="icon-gengduo" className='font-size-mlg position-absolute share-button' style={{ right: 15, bottom: 20 }} />

                    </Popover>
                </span>
            ),
        },
        {
            title: '创建者',
            dataIndex: 'createUserNickname',
            sorter: {
                compare: (a, b) => a.createUserNickname.localeCompare(b.createUserNickname),
                multiple: 2,
            },
        },
        {
            title: '修改时间',
            dataIndex: 'updateTime',
            sorter: {
                compare: (a, b) => new Date(a.updateTime) - new Date(b.updateTime),
                multiple: 1,
            },
            render: (text, record) => (
                <span>
                    {text}
                    <Button type='primary' className='position-absolute share-button b-rd-6' onClick={()=>shareFun(record)} style={{ right: 45, bottom: 19 }}>共享</Button>
                </span>
            ),
        },
    ];
    const handleOpenChange = (newOpen, index) => {
        const newPopoverOpenStates = [...popoverOpenStates];
        newPopoverOpenStates[index] = newOpen;
        setPopoverOpenStates(newPopoverOpenStates);
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
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // 数据开始加载，设置加载状态为true

            // 获取 storage
            const storage = useStorage();
            const userId = storage.getItem('openid');

            // 进行请求，获取所有数据
            const res = await fileFun.getAllUserDocument(userId);
            console.log(res.data);
            setIsLoading(false);

            // 设置数据
            setDataDeal(res.data);
            setPopoverOpenStates(new Array(res.data.length).fill(false));
        };

        // 初始化加载数据
        fetchData();

    }, []);
    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                message.success('内容已复制到剪切板');
                // 可以添加成功复制到剪贴板的提示或者其他操作
            })
            .catch(err => {
                message.error('复制失败');
                // 处理复制失败的情况，比如提示用户复制失败
            });
    };

    const handleCopyText = () => {
        
        copyToClipboard(selectLink);
    };
    return <div className="h-full p-10" >
        <div className='flex' style={{ justifyContent: 'space-between' }}>

            <div className='m-t-24'>


                <Button danger type='primary' className='b-rd-6 m-b-20 m-r-10' onClick={start} disabled={!hasSelected} loading={loading}>删除文件</Button>
                <span className='m-r-8 m-b-20 text-color-grey'>
                    {hasSelected ? `已选中 ${selectedRowKeys.length} 个文件` : ''}
                </span>
            </div>
        </div>

        <Table columns={columns} rowSelection={rowSelection} loading={isLoading} dataSource={currentData} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
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
                        value: 'EDIT',
                        label: '可编辑',
                    }}
                    style={{
                        width: 120,
                    }}
                    onChange={handleChange}
                    options={[
                        {
                            value: 'EDIT',
                            label: '可编辑',
                        },
                        {
                            value: 'VIEW',
                            label: '可查看',
                        },
                    ]}
                />
            </div>
            <Divider />
            <div className='flex-center-center' style={{ justifyContent: 'space-between' }}>
                <div><IconFont type='icon-list-disorder' className='font-size-lg m-r-10'></IconFont>有效日期</div>
                <Select
                    labelInValue
                    defaultValue={{
                        value: null,
                        label: '永久有效',
                    }}
                    style={{
                        width: 120,
                    }}
                    onChange={handleChangeCopy}
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
                            value: null,
                            label: '永久有效',
                        },
                    ]}
                />
            </div>
            <Divider />
            <div className='flex-center-center' style={{ justifyContent: 'space-between' }}>
                <div className='flex-r-start-center' ><IconFont type='icon-link-break'  className=' font-size-lg m-r-10'></IconFont><div className='text-ellipsis' style={{width:'130px'}}>{selectLink}</div></div>
                <Button type='primary' className='b-rd-6' onClick={handleCopyText}>复制链接</Button>

            </div>

            <Divider />


            <Button className='b-rd-6 bg-color-first text-color-white w-full' size='large'>导出为word文档</Button>



        </Modal>

        <Modal title="删除" open={isModalOpenThree} footer={null} onOk={handleOkThree} onCancel={handleCancelThree} width={400} >
            <div className='m-t-20 m-l-80'>您确认<span className='text-color-red'>删除</span>该文件吗</div>
            <Button className=' m-t-30 b-rd-8 m-r-16 m-l-200' type='primary' onClick={handleDeleteConfirm}>确认</Button>
            <Button className=' m-t-16 b-rd-8 bg-color-grey text-color-white' onClick={handleCancelThree}>取消</Button>

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