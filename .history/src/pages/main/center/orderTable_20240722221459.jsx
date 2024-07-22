import React, { useState } from 'react';
import { Table, Input, Button, Select, Modal, message, Pagination } from 'antd';
import orderFun from '../../../api/user/search';
import { useStorage } from 'web-localstorage-plus';
import { useNavigate } from 'react-router-dom';
// 引入自定义样式

const OrderTable = () => {
    const storage = useStorage();

    const [searchOrderNumber, setSearchOrderNumber] = useState('');
    const [searchOrderStatus, setSearchOrderStatus] = useState('');
    const [filteredData, setFilteredData] = useState([]);
    const [visibleModal, setVisibleModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dataDeal, setDataDeal] = useState([]);
    const [dataContent, setDataContent] = useState(0)
    const navigate=useNavigate()
    const [total, setTotal] = useState(0);
    const [pageSize, setPageSize] = useState(5)
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [popoverOpenStates, setPopoverOpenStates] = useState([]); // 状态数组，用于存储每行Popover的展开状态
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态变量


    const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);

    };



    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,

    };

    const hasSelected = selectedRowKeys.length > 0;
    useEffect(() => {

        const fetchData = async () => {
            setIsLoading(true); // 数据开始加载，设置加载状态为true
            // 获取 storage
            const userId = storage.getItem('openid');
            // 进行请求，获取所有数据
            const res = await orderFun.getUserAllOrder();
            console.log(res.data);
            if (res.data && res.data.length > 0) {

                setPageSize(6)
            }

            setDataDeal(res.data);
            setPopoverOpenStates(new Array(res.data.length).fill(false));
            setIsLoading(false);
        };

        // 初始化加载数据
        fetchData();

    }, [dataContent]);
    const start = async (e) => {

        setLoading(true); // 启用加载状态

        // // 在这里执行批量删除或其他操作
        // // 示例：
        // if (deleteBatchFun) {
        //     const res = await deleteBatchFun(selectedRowKeys);
        //     if (res) {

        //         message.success(res.msg)
        //     }
        // } else {
        //     const newData = dataDeal.filter(item => !selectedRowKeys.includes(item.id));
        //     setDataDeal(newData);
        //     setSelectedRowKeys([]);
        //     message.success("文档记录删除成功")

        // }
        message.success("删除成功")



        setLoading(false); // 关闭加载状态

    };
    const cancelView=(order)=>{
        Modal.confirm({
            title: '确认跳转',
            content: '您确定要跳转到支付界面吗',
            okText: '确认',
            cancelText: '取消',
            onOk() {
               navigate("/order-pay")
            },
        });
    }
    const handleView = (order) => {
        Modal.confirm({
            title: '确认跳转',
            content: '您确定要跳转到支付界面吗',
            okText: '确认',
            cancelText: '取消',
            onOk() {
               navigate("/order-pay")
            },
        });
    };

    const handleDelete = (order) => {
        Modal.confirm({
            title: '确认删除',
            content: '您确定要删除这个订单吗？',
            okText: '确认',
            cancelText: '取消',
            onOk() {
                message.success('订单已删除');
                setFilteredData(prevData => prevData.filter(item => item.key !== order.key));
            },
        });
    };

    const columns = [
        {
            title: '订单号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '订单状态',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: '订单类型',
            dataIndex: 'orderType',
            key: 'orderType',
        },
        {
            title: '订单金额',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: '过期时间',
            dataIndex: 'endOrderTime',
            key: 'endOrderTime',
        },
        {
            title: '创建时间',
            dataIndex: 'orderTime',
            key: 'orderTime',
        },
        {
            title: '订单描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) =>(
                <>
                    {record.status === '待支付' && (<>
                        <Button type="primary" onClick={() => handleView(record)}>支付</Button>
                        <Button style={{ marginLeft: 8 }} onClick={() => cancelView(record)}>取消</Button>
                    </>)}
                    {(record.status === '已取消' || record.status === '已完成') && (
                        <Button onClick={() => handleView(record)}>查看</Button>
                    )}
                    <Button style={{ marginLeft: 8, color: 'red' }} onClick={() => handleDelete(record)}>删除</Button>
                </>
            ),
        },
    ];

    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    // 根据当前页码和每页显示条数计算要展示的数据
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = dataDeal?.slice(startIndex, endIndex) ?? [];


    return (
        <div className="h-full p-10 position-relative" >
            <div className='flex' style={{ justifyContent: 'space-between' }}>

                <div className='m-t-24'>


                    <Button danger className='b-rd-6 m-b-20 m-r-10' onClick={start} disabled={!hasSelected} loading={loading}>批量删除</Button>
                    <span className='m-r-8 m-b-20 text-color-grey'>
                        {hasSelected ? `已选中 ${selectedRowKeys.length} 个文件` : ''}
                    </span>
                </div>
            </div>

            <Table columns={columns} rowKey={(record) => record.id} rowSelection={rowSelection} loading={isLoading} dataSource={currentData} pagination={false} rowClassName="hover-row className='position-relative'"
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
                className='position-absolute'
                style={{ bottom: 20, left: 400 }}
                defaultCurrent={1}
                pageSize={pageSize}
                total={dataDeal.length}
                showSizeChanger={false} // 禁用每页条数选择器
                showQuickJumper
                hideOnSinglePage={true}
                onChange={onPageChange} // 分页器变化回调
            />
            <Modal
                title="订单详情"
                visible={visibleModal}
                onCancel={() => setVisibleModal(false)}
                footer={[
                    <Button key="back" onClick={() => setVisibleModal(false)}>
                        关闭
                    </Button>,
                ]}
                bodyStyle={{ padding: '20px' }}
                centered
                className="order-modal"
            >
                {dataDeal && (
                    <div className="order-details">
                        <div className="order-row">
                            <div className="order-label">订单名称:</div>
                            <div className="order-value">18999坤币</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">过期时间:</div>
                            <div className="order-value">{dataDeal.expiryTime}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单号:</div>
                            <div className="order-value">{dataDeal.id}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单金额 (元):</div>
                            <div className="order-value">{dataDeal.amount}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单状态:</div>
                            <div className="order-value">{dataDeal.orderStatus}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">创建时间:</div>
                            <div className="order-value">{dataDeal.createTime}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">商品类别:</div>
                            <div className="order-value">{dataDeal.orderType}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">商品描述:</div>
                            <div className="order-value">{dataDeal.description}</div>
                        </div>
                        <Button type="primary" danger style={{ marginTop: '20px' }} onClick={() => handleDelete(dataDeal)}>
                            删除订单
                        </Button>
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default OrderTable;