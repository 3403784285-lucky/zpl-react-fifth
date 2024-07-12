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

    </>;

}

export default Search;