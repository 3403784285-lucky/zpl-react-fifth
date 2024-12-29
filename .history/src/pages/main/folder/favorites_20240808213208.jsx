
import { Dropdown, Popover, Popconfirm, Button, Input, Modal, message } from 'antd'
import { DownOutlined, UnorderedListOutlined, createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd'
import { useState } from 'react';
import foldersFun from '../../../api/user/folders';
import { useStorage } from 'web-localstorage-plus';
import { useNavigate } from 'react-router-dom';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js',
    ],
});
const items = [
    {
        label: '全部文件',
        key: '0',
    },
];
function Favorites() {
    const storage = useStorage()
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);
    const [openCopy, setOpenCopy] = useState(false);
    const [editing, setEditing] = useState(false);
    const [inputNameValue, setInputNameValue] = useState('');
    const [dataDeal, setDataDeal] = useState([]);
    const [popoverOpenStates, setPopoverOpenStates] = useState([]); // 状态数组，用于存储每行Popover的展开状态

    const inputRef = useRef(null);
    const descriptionRef = useRef(null);
    const confirm = async () => {
        const inputValue = inputRef.current.nativeElement.value
        console.log(inputValue)
        if (!inputValue.trim()) {
            message.error('请输入文件夹名称');
            return;
        }
        // Send request to create folder (replace with your actual API call)
        // const newFolder = {
        //     folderId: Math.random(), // Replace with actual ID generation
        //     folderName: inputValue,
        //     description: description,
        //     permissions: 'VIEW', // Example permission
        //     userId: 3, // Replace with actual user ID
        //     documents: [] // Example empty documents array
        // };
        // Update folders array with new folder
        const userId = storage.getItem("openid");
        if (!userId) {
            message.error("未登录")
        }
        const description = descriptionRef.current.nativeElement.value
        const res = await foldersFun.createFolder({ userId, name: inputValue, description })
        console.log(res)
        message.success('文件夹' + res.msg);
        fetchData();
    };
    const handleEditClick = (e,folder) => {
        e.stopPropagation()
        setEditing(true);
        setInputNameValue(folder.folderName);
    };
    const handleInputNameChange = (e) => {
        setInputNameValue(e.target.value);
    };
    const handleBlur = async(folder) => {
        const res=await foldersFun.updateFolder({id:folder.folderId,name:inputNameValue})
        if(res.code==200){
            message.success("重命名成功")
        }
        setEditing(false);
    };
    const hide = () => {
        setOpen(false)
    }
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };
    const onChangeCopy = (e) => {
        console.log('Change:', e.target.value);
    };
    const descriptionCopy = (<>
        <h6 className='m-b-6'>文件夹名称</h6>
        <Input showCount maxLength={10} ref={inputRef} />
        <h6 className='m-b-6 m-t-10'>描述(可选)</h6>
        <Input className='m-b-12' showCount maxLength={30} ref={descriptionRef} />
    </>)
    const fetchData = async () => {
        // 进行请求，获取所有数据
        const res = await foldersFun.getFolderDocument();
        console.log(res.data);
        // 设置数据
        setDataDeal(res.data);
    };
    const openFolders = (folder) => {
        storage.setItem("folder", folder);
        storage.setItem("isFolder", true)
        navigate('/my-file')
    }
    useEffect(() => {
        // 初始化加载数据
        setPopoverOpenStates(new Array(dataDeal.length).fill(false));
        fetchData();
    }, []);
    const content = (<div >
        <Popconfirm
            title="新建"
            description={descriptionCopy}
            onConfirm={confirm}
            placement="leftTop"
            onOpenChange={() => console.log('open change')}
        >
            <div className='p-6 hover-effect b-rd-6' onClick={hide}>新建文件夹</div>
        </Popconfirm>

    </div>)
    const handleOkThree = async(id) => {
        const res= await foldersFun.deleteFolder(id)
        if(res.code==200)
        {
            message.success("文件夹删除成功")
        }
        fetchData()
        

    };
   

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleOpenChangeCopy = (newOpenCopy,index) => {
        const newPopoverOpenStates = [...popoverOpenStates];
        newPopoverOpenStates[index] = newOpenCopy;
        setPopoverOpenStates(newPopoverOpenStates);

    };
    const handleDeleteCopy=(e,folder)=>{
        e.stopPropagation();
        Modal.confirm({
            title: "删除",
            icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
            content: <div className='m-x-50 m-y-20'>您确认要删除该文件夹吗？</div>,
            onOk:()=>{
                handleOkThree(folder.folderId)

            }
        });
         setOpenCopy(false) 


    }
    return <>
        <div className="favorite-frame p-20 p-b-2 ">
            <div className="select-part p-16 flex" style={{ justifyContent: 'space-between' }}>
                <Dropdown
                    menu={{
                        items,
                        selectable: true,
                        defaultSelectedKeys: ['8'],
                    }}
                >
                    <a onClick={(e) => e.preventDefault()}>
                        <Space className='text-color-black'>
                            全部文件
                            <DownOutlined />
                        </Space>
                    </a>
                </Dropdown>
                <Popover
                    trigger="click"
                    open={open}
                    content={content}
                    onOpenChange={handleOpenChange}
                >
                    <UnorderedListOutlined />
                </Popover>
                
            </div>

            <div className="list-frame p-16 flex-r-start-center " >
                {dataDeal.map((folder, index) => (
                    <div
                        key={folder.folderId}
                        onClick={() => openFolders(folder)}
                        className="li shadow b-rd-6 p-16 m-10 m-r-16 position-relative hover-row"
                        onMouseEnter={() => {
                            const rows = document.querySelectorAll('.hover-row');
                            rows[index].classList.add('hover-row-active');
                        }}
                        onMouseLeave={() => {
                            const rows = document.querySelectorAll('.hover-row');
                            rows[index].classList.remove('hover-row-active');
                        }}
                        style={{ width: '250px', height: '180px' }}
                    >
                        <div className="first-header flex-r-start-center">
                            <IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />
                            {editing ? (
                                <Input
                                    value={inputNameValue}
                                    onClick={(e)=> e.stopPropagation()}
                                    onChange={handleInputNameChange}
                                    onBlur={()=>handleBlur(folder)}
                                    autoFocus
                                    style={{ width: '100px' }}
                                />
                            ) : (
                                <span>{folder.folderName}</span>
                            )}
                        </div>
                        <Popover
                            trigger="click"
                            open={popoverOpenStates[index]}
                            content={<div >
                                <div className='p-6 hover-effect b-rd-6' onClick={(e) => handleDeleteCopy(e,folder)}>删除</div>
                                <div className='p-6 hover-effect b-rd-6' onClick={(e) => handleEditClick(e,folder)}>重命名</div>
                            </div>}
                            onOpenChange={(newCopy)=>handleOpenChangeCopy(newCopy,index)}
                        >
                            <IconFont type='icon-gengduo' onClick={(event) => {
                                event.stopPropagation(); // 阻止事件冒泡到父组件
                                // 处理子组件的点击事件逻辑
                            }} className='font-size-mlg position-absolute share-button' style={{ right: 15, top: 20 }}></IconFont>
                        </Popover>
                        <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                           {folder.description} {/* Replace with folder-specific description */}
                        </div>
                        <div className="second-li">
                            <ul className='m-t-14 p-y-10 text-color-grey'>
                                {dataDeal[index].documents?.slice(0,3).map((item, index) => {
                                    return <li key={item.id} className='flex m-t-6 font-size-sm ' style={{ justifyContent: 'space-between' }}>
                                        <div style={{ width: '60%' }} className='text-ellipsis'>{item.name}</div>
                                        <div style={{ width: '35%' }} className='text-ellipsis'>{item.updateTime}</div>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
            {/* <Table
        columns={columns}
        dataSource={data}
        onChange={onChange}
        showSorterTooltip={{
        target: 'sorter-icon',
        }}
    /> */}
        </div>
    </>
}
export default Favorites