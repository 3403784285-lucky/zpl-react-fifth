
function TableMy() {

    return <div className="h-full position-relative">
    <Table columns={columns}   rowKey={(record) => record.id}   rowSelection={rowSelection} loading={isLoading} dataSource={currentData} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
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
export default TableMy;