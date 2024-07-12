import { Table } from "antd";

function Bin()
{
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