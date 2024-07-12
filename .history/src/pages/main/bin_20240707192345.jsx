function Bin()
{
    return <>
    
    <div className="favorite-frame p-20 p-b-2 ">
            <div className="title p-10 p-b-20 font-size-lg font-bold">回收站</div>
              <Table columns={columns} rowSelection={rowSelection} dataSource={dataDeal} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
            

            </div>
    
    </>
}
export default Bin