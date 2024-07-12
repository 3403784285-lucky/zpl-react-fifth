
import { Dropdown, Popover, Popconfirm, Button, Input, Modal } from 'antd'
import { DownOutlined, UnorderedListOutlined, createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd'
import { useState } from 'react';
import foldersFun from '../../api/user/folders';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js',

    ],
});
const items = [
    {
        label: '全部文件',
        key: '0',
    },

];







function Favorites() {
    const [open, setOpen] = useState(false);
    const [openCopy, setOpenCopy] = useState(false);
    const [isModalOpenThree, setIsModalOpenThree] = useState(false)
    const [editing, setEditing] = useState(false);
    const [folderName, setFolderName] = useState('读书笔记');
    const [inputValue, setInputValue] = useState(folderName);
    const [dataDeal, setDataDeal] = useState([]);


    const handleEditClick = () => {
        setEditing(true);
        setInputValue(folderName);
    };

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        setFolderName(inputValue);
        setEditing(false);
    };
    const confirm = () =>
        new Promise((resolve) => {
            setTimeout(() => resolve(null), 3000);
        });
    const hide = () => {

        setOpen(false)

    }
    const contentCopy = (<div >
        <div className='p-6 hover-effect b-rd-6' onClick={() => { setIsModalOpenThree(true); setOpenCopy(false) }}>删除</div>
        <div className='p-6 hover-effect b-rd-6' onClick={handleEditClick}>重命名</div>
    </div>)
    const onChange = (e) => {
        console.log('Change:', e.target.value);
    };
    const onChangeCopy = (e) => {
        console.log('Change:', e.target.value);
    };

    const description = (<>
        <h6 className='m-b-6'>文件夹名称</h6>
        <Input showCount maxLength={10} onChange={onChange} />
        <h6 className='m-b-6 m-t-10'>描述</h6>
        <Input className='m-b-12' showCount maxLength={10} onChange={onChangeCopy} />




    </>)
    useEffect(() => {
        const fetchData = async () => {



            // 进行请求，获取所有数据
            const res = await foldersFun.getFolderDocument();
            console.log(res.data);


            // 设置数据
            setDataDeal(res.data);

        };

        // 初始化加载数据
        fetchData();




    }, []);
    const content = (<div >
        <Popconfirm
            title="新建"
            description={description}
            onConfirm={confirm}
            placement="leftTop"
            onOpenChange={() => console.log('open change')}
        >
            <div className='p-6 hover-effect b-rd-6' onClick={hide}>新建文件夹</div>
        </Popconfirm>

    </div>)
    const handleOkThree = () => {
        setIsModalOpenThree(false);
    };
    const handleCancelThree = () => {
        setIsModalOpenThree(false);
    };

    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };
    const handleOpenChangeCopy = (newOpenCopy) => {
        setOpenCopy(newOpenCopy);
    };
    return <>

        <div className="favorite-frame p-20 p-b-2 ">
            <div className="title p-10 p-b-20 font-size-lg font-bold">收藏</div>
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

                <Modal title="删除" open={isModalOpenThree} footer={null} onOk={handleOkThree} onCancel={handleCancelThree} width={400} >
                    <div className='m-t-20 m-l-80'>您确认<span className='text-color-red'>删除</span>该文件夹吗</div>
                    <Button className=' m-t-30 b-rd-8 m-r-16 m-l-200' type='primary'>确认</Button>
                    <Button className=' m-t-16 b-rd-8 bg-color-grey text-color-white'>取消</Button>

                </Modal>


            </div>

            <div className="list-frame p-16 flex-r-start-center " >
                {dataDeal.map((folder, index) => (
                    <div
                        key={folder.folderId}
                        className="li shadow b-rd-6 p-16 m-10 m-r-16 position-relative hover-row"
                        onMouseEnter={() => {
                            const rows = document.querySelectorAll('.hover-row');
                            rows[0].classList.add('hover-row-active');
                        }}
                        onMouseLeave={() => {
                            const rows = document.querySelectorAll('.hover-row');
                            rows[0].classList.remove('hover-row-active');
                        }}
                        style={{ width: '250px', height: '180px' }}
                    >
                        <div className="first-header flex-r-start-center">
                            <IconFont className='font-size-vlg m-r-10' type="icon-wenjianjia" />
                            {editing ? (
                                <Input
                                    value={inputValue}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    autoFocus
                                    style={{ width: '100px' }}
                                />
                            ) : (
                                <span>{folder.folderName}</span>
                            )}
                        </div>
                        <Popover
                            trigger="click"
                            open={openCopy}
                            content={contentCopy}
                            onOpenChange={handleOpenChangeCopy}
                        >
                            <IconFont type='icon-gengduo' className='font-size-mlg position-absolute share-button' style={{ right: 15, top: 20 }}></IconFont>
                        </Popover>

                        <div className="desc-part font-size-sm m-l-44 text-color-grey text-overflow-1">
                            主要是用来激励自己 {/* Replace with folder-specific description */}
                        </div>
                        <div className="second-li">
                            <ul className='m-t-16 p-6 text-color-grey'>
                                {dataDeal[index].documents.map((item, index) => {
                                    return <li key={item.id} className='flex m-t-6 ' style={{ justifyContent: 'space-between' }}>
                                        <div style={{width:'60%'}} className='text-ellipsis'>{item.name}</div>
                                        <div style={{width:'35%'}} className='text-ellipsis'>{item.updateTime}</div>
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