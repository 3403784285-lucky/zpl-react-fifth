import { Table } from "antd";

function Bin()
{
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
            <div className="title p-10 p-b-20 font-size-lg font-bold">回收站</div>
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