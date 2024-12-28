import { Table, Pagination, Button, Popover, Modal, message } from "antd";
import { DownOutlined, createFromIconfontCN } from '@ant-design/icons';
import { useState } from "react";
import { useStorage } from "web-localstorage-plus";
import fileFun from "../../../api/user/file";
import foldersFun from "../../../api/user/folders";
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
    ],
});
const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
};
function Bin() {
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
    const [selectedValue, setSelectedValue] = useState('EDIT');
    const [selectedValueCopy, setSelectedValueCopy] = useState(null);
    const [selectLink, setSelectLink] = useState(null);
    const [editingFileName, setEditingFileName] = useState({ id: null, name: '' });
    const navigate = useNavigate();

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
    const handleDeleteConfirm = async () => {
        // 在这里打印当前选中文档的id
        console.log(selectedDocumentId);
        const storage = useStorage();
        storage.setItem("documentId", selectedDocumentId)
        const res = await deleteFun(selectedDocumentId);
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
    const handleChangeCopy = (value) => {
        setSelectedValueCopy(value)
    }
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    // 根据当前页码和每页显示条数计算要展示的数据
    const startIndex = (currentPage - 1) * 5;
    const endIndex = startIndex + 5;
    const currentData = dataDeal?.slice(startIndex, endIndex) ?? [];
    const shareFun = async (record) => {
        const id = record.id;
        const editPermission = selectedValue;
        const validDays = selectedValueCopy;
        const res = await shareCFun.document({ id, validDays, editPermission })
        // message.success(res.msg)
        console.log(res)
        setSelectLink(res.msg)
        setIsModalOpenCopy(true);
    }
    const start = async (e) => {
        setLoading(true); // 启用加载状态

        // 在这里执行批量删除或其他操作
        // 示例：
        if (deleteBatchFun) {
            const res = await deleteBatchFun(selectedRowKeys);
            if (res) {
                
                message.success(res.msg)
            }
        }else{
            const newData = dataDeal.filter(item => !selectedRowKeys.includes(item.id));
            setDataDeal(newData);
            setSelectedRowKeys([]);
            message.success("文档记录删除成功")
        }
        setLoading(false); // 关闭加载状态
    };
    const isRestore=async(record)=>{
        const res=await foldersFun.recoverDocument({documentId:record.id})
        if(res.code==200){
            message.success("文件恢复成功")
            fetchData()
        }
    }
    const restoreDelete = async(record) => {
        Modal.confirm({
                title: '恢复文件',
                icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
                content: (
                  <div className="result-content m-y-10">
                    {/* 使用状态来控制逐字显示 */}
                    <p >您确定<span className="text-color-success font-bold">恢复</span>文件吗</p>
                  </div>
                ),
                onOk:()=>isRestore(record),
              
        })
        
    };
    const handleRenameChange = (e) => {
        setEditingFileName({ ...editingFileName, name: e.target.value });
    };
    const handleRenameSave = async () => {
        const { id, name } = editingFileName;

        const updatedData = dataDeal.map(item => {
            if (item.id === id) {
                return { ...item, name };
            }
            return item;
        });
        setDataDeal(updatedData);
        const storage = useStorage()
        storage.setItem("documentId", editingFileName.id)
        const res = await fileFun.rename(editingFileName.id, editingFileName.name)
        message.success("重命名" + res.msg)
        setEditingFileName({ id: null, name: '' });

    };

    const columns = [
        {
            title: '文件名称',
            dataIndex: 'name',
            render: (text, record, index) => {
                const isEditing = editingFileName.id === record.id;
                return (
                    <span className='flex-start-center'>
                        <IconFont type="icon-wordIcon" className='m-r-16 font-size-vlg' />
                        <div>{isEditing ? (
                            <Input
                                value={editingFileName.name}
                                onChange={handleRenameChange}
                                onBlur={handleRenameSave}
                                onPressEnter={handleRenameSave}
                                style={{ width: '200px' }}
                            />
                        ) : (
                            <div className='text-ellipsis' style={{ width: '200px' }}>{text}</div>
                        )}</div>
                        <Popover
                            trigger="click"
                            open={popoverOpenStates[index]}
                            content={(
                                <div>
                                    <div className='p-6 hover-effect b-rd-6' onClick={() => onClickCopy(record)}>彻底删除</div>
                                    <div className='p-6 hover-effect b-rd-6' onClick={() =>restoreDelete(record)}>恢复</div>
                                  
                                </div>
                            )}
                            onOpenChange={(newOpen) => handleOpenChange(newOpen, index)}
                        >
                            <IconFont type="icon-gengduo" className='font-size-mlg position-absolute share-button' style={{ right: 15, bottom: 20 }} />
                        </Popover>
                    </span>
                )
            }
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
            title: '来源',
            dataIndex: 'originalFolder',
            
        },
        {
            title: '剩余天数',
            dataIndex: 'updateTime',
            sorter: {
                compare: (a, b) => new Date(a.updateTime) - new Date(b.updateTime),
                multiple: 1,
            },
            render: (text, record) => (
                <span>
                    {text}
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
        setSelectedRowKeys(newSelectedRowKeys);

    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,

    };
    const fetchData = async () => {
            setIsLoading(true); // 数据开始加载，设置加载状态为true
            // 获取 storage
            const storage = useStorage();
            const userId = storage.getItem('openid');
            // 进行请求，获取所有数据
            const res = await fileFun.getDeletedDocuments(userId);
            console.log(res.data);
          
            setIsLoading(false);
            // 设置数据
            if (res.data == null) {
                res.data = []
            }
            setDataDeal(res.data);
            setPopoverOpenStates(new Array(res.data.length).fill(false));
        };
    const hasSelected = selectedRowKeys.length > 0;
    useEffect(() => {
        
        // 初始化加载数据
        fetchData();
    },[]);
    const copyToClipboard = (text) => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text)
                .then(() => {
                    message.success('内容已复制到剪切板');
                })
                .catch(err => {
                    message.error('复制失败');
                });
        } else {
            // 备用方案：使用传统的 document.execCommand 方法
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            try {
                document.execCommand('copy');
                message.success('内容已复制到剪切板');
            } catch (err) {
                message.error('复制失败');
            }
            document.body.removeChild(textArea);
        }
    };

    const handleCopyText = () => {

        copyToClipboard(selectLink);
    };
    return <>
        <Modal title="删除" open={isModalOpenThree} footer={null} onOk={handleOkThree} onCancel={handleCancelThree} width={400} >
            <div className='m-t-20 m-l-80'>您确认<span className='text-color-red'>彻底删除</span>该文件吗</div>
            <Button className=' m-t-30 b-rd-8 m-r-16 m-l-200' type='primary'>确认</Button>
            <Button className=' m-t-16 b-rd-8 bg-color-grey text-color-white'>取消</Button>

        </Modal>
        <div className="favorite-frame p-20 p-b-2 ">
            <div className="flex-r-start-center" style={{ justifyContent: 'space-between' }}>
                <div className="title p-10 p-b-20 font-size-lg font-bold">回收站</div>
                <div className='flex' style={{ justifyContent: 'space-between' }}>

                    <div className='m-t-24'>


                        <Button danger type='primary' className='b-rd-6 m-b-20 m-r-10' onClick={start} disabled={!hasSelected} loading={loading}>彻底删除</Button>
                        <span className='m-r-8 m-b-20 text-color-grey'>
                            {hasSelected ? `已选中 ${selectedRowKeys.length} 个文件` : ''}
                        </span>
                    </div>
                </div>


            </div>

            <Table columns={columns} rowKey={(record) => record.id} rowSelection={rowSelection} loading={isLoading} dataSource={currentData} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
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
            <Pagination
                className='m-t-20 position-absolute'
                style={{ bottom: 60, left: 650 }}
                defaultCurrent={1}
                pageSize={5}
                total={dataDeal.length}
                showSizeChanger={false} // 禁用每页条数选择器
                showQuickJumper
                hideOnSinglePage={true}
                onChange={onPageChange} // 分页器变化回调
            />

        </div>

    </>
}
export default Bin