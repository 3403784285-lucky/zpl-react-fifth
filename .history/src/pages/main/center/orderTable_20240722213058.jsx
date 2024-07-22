import React, { useState } from 'react';
import { Table, Input, Button, Select, Modal, message } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
// 引入自定义样式

const { Option } = Select;

const data = [
    {
        key: '1',
        orderNumber: 'order_9639441582',
        orderStatus: '已取消',
        orderType: '积分充值',
        amount: '¥9.99',
        expiryTime: '2024-07-10 00:22:51',
        createTime: '2024-07-10 00:17:50',
        description: '增加18999坤币到钱包',
    },
    {
        key: '2',
        orderNumber: 'order_8577286710',
        orderStatus: '待支付',
        orderType: '积分充值',
        amount: '¥9.99',
        expiryTime: '2024-07-10 00:22:54',
        createTime: '2024-07-10 00:17:53',
        description: '增加18999坤币到钱包',
    },
    {
        key: '3',
        orderNumber: 'order_0340752834',
        orderStatus: '已完成',
        orderType: '积分充值',
        amount: '¥1.99',
        expiryTime: '2024-07-10 01:43:02',
        createTime: '2024-07-10 01:38:02',
        description: '增加3000坤币到钱包',
    },
];

const OrderTable = () => {
    const [searchOrderNumber, setSearchOrderNumber] = useState('');
    const [searchOrderStatus, setSearchOrderStatus] = useState('');
    const [filteredData, setFilteredData] = useState(data);
    const [visibleModal, setVisibleModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dataDeal, setDataDeal] = useState([]);
    const [dataContent,setDataContent]=useState(0)
    const [total, setTotal] = useState(0);
    const [pageSize,setPageSize]=useState(5)
    const [currentPage, setCurrentPage] = useState(1); // 当前页码
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [isModalOpenCopy, setIsModalOpenCopy] = useState(false);
    const [isModalOpenThree, setIsModalOpenThree] = useState(false);
    const [popoverOpenStates, setPopoverOpenStates] = useState([]); // 状态数组，用于存储每行Popover的展开状态
    const [isLoading, setIsLoading] = useState(true); // 添加加载状态变量
    const [selectedDocumentId, setSelectedDocumentId] = useState(null); 
    const handleSearch = () => {
        const filtered = data.filter(item =>
            (!searchOrderNumber || item.orderNumber.includes(searchOrderNumber)) &&
            (!searchOrderStatus || item.orderStatus === searchOrderStatus)
        );
        setFilteredData(filtered);
    };
    
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
            const storage = useStorage();
            const userId = storage.getItem('openid');

            // 进行请求，获取所有数据
         
            const res = await getFun(userId);
            console.log(res.data);
            if (res.data&&res.data.length>0) {
                if (dataContent != 2 && dataContent != 3) {
                    res.data = res.data[dataContent].documents
                }else if(dataContent == 3){
                    setPageSize(3)
                }
            }
            if(dataContent==2){
                if(isFolder){
                    res.data=storage.getItem("folder").documents
                    
                }
            }

            // 设置数据
            if (!res.data) {
                res.data = []
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

        // 在这里执行批量删除或其他操作
        // 示例：
        if (deleteBatchFun) {
            const res = await deleteBatchFun(selectedRowKeys);
            if (res) {

                message.success(res.msg)
            }
        } else {
            const newData = dataDeal.filter(item => !selectedRowKeys.includes(item.id));
            setDataDeal(newData);
            setSelectedRowKeys([]);
            message.success("文档记录删除成功")

        }



        setLoading(false); // 关闭加载状态

    };
    const handleView = (order) => {
        setSelectedOrder(order);
        setVisibleModal(true);
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
            dataIndex: 'orderNumber',
            key: 'orderNumber',
        },
        {
            title: '订单状态',
            dataIndex: 'orderStatus',
            key: 'orderStatus',
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
            dataIndex: 'expiryTime',
            key: 'expiryTime',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
        },
        {
            title: '订单描述',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: '操作',
            key: 'action',
            render: (text, record) => (
                <>
                    {record.orderStatus === '待支付' && (
                        <Button type="primary" onClick={() => handleView(record)}>支付</Button>
                    )}
                    {(record.orderStatus === '已取消' || record.orderStatus === '已完成') && (
                        <Button onClick={() => handleView(record)}>查看</Button>
                    )}
                    <Button style={{ marginLeft: 8, color: 'red' }} onClick={() => handleDelete(record)}>删除</Button>
                </>
            ),
        },
    ];

    return (
        <div className="h-full p-10 position-relative" >
        <div className='flex' style={{ justifyContent: 'space-between' }}>

            <div className='m-t-24'>


                <Button danger type='primary' className='b-rd-6 m-b-20 m-r-10' onClick={start} disabled={!hasSelected} loading={loading}>删除}</Button>
                <span className='m-r-8 m-b-20 text-color-grey'>
                    {hasSelected ? `已选中 ${selectedRowKeys.length} 个文件` : ''}
                </span>
            </div>
        </div>
            
            <Table columns={columns} rowKey={(record) => record.id} rowSelection={rowSelection} loading={isLoading} dataSource={currentData} onChange={onChange} pagination={false} rowClassName="hover-row className='position-relative'"
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
            })}  />
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
                {selectedOrder && (
                    <div className="order-details">
                        <div className="order-row">
                            <div className="order-label">订单名称:</div>
                            <div className="order-value">18999坤币</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">过期时间:</div>
                            <div className="order-value">{selectedOrder.expiryTime}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单号:</div>
                            <div className="order-value">{selectedOrder.orderNumber}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单金额 (元):</div>
                            <div className="order-value">{selectedOrder.amount}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">订单状态:</div>
                            <div className="order-value">{selectedOrder.orderStatus}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">创建时间:</div>
                            <div className="order-value">{selectedOrder.createTime}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">商品类别:</div>
                            <div className="order-value">{selectedOrder.orderType}</div>
                        </div>
                        <div className="order-row">
                            <div className="order-label">商品描述:</div>
                            <div className="order-value">{selectedOrder.description}</div>
                        </div>
                        <Button type="primary" danger style={{ marginTop: '20px' }} onClick={() => handleDelete(selectedOrder)}>
                            删除订单
                        </Button>
                    </div>
                )}
            </Modal>

        </div>
    );
};

export default OrderTable;