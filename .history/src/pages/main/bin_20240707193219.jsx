import { Table,Pagination,Button } from "antd";
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
function Bin()
{
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [dataDeal, setDataDeal] = useState([]);
    const [loading, setLoading] = useState(false);

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
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    const columns = [
        {
            title: '文件名称',
            dataIndex: 'name',
            render: (text, record) => (
                <span className='flex-start-center'>
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
    return <>
    
    <div className="favorite-frame p-20 p-b-2 ">
        <div className="flex-r-start-center" style={{justifyContent:'space-between'}}>
            <div className="title p-10 p-b-20 font-size-lg font-bold">回收站</div>
            <Button danger type='primary' className='b-rd-6' onClick={start} disabled={!hasSelected} loading={loading}>删除记录</Button>
                        <span className='m-l-8 text-color-grey'>
                            {hasSelected ? `已选中 ${selectedRowKeys.length} 条记录` : ''}
                        </span>

        </div>
            
              <Table columns={columns} rowSelection={rowSelection} dataSource={dataDeal} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
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
    
    </>
}
export default Bin