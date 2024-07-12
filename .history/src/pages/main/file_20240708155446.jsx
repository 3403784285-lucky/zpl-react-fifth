function Search() {
    return <>
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
        <div className="text-color-grey flex-center-center m-8" >没有更多咯</div>
         <Pagination className='m-t-20 position-absolute' style={{ bottom: 40, left: 500 }} total={50} showSizeChanger showQuickJumper hideOnSinglePage={true} />



    </>;

}

export default Search;