import React, { useEffect, useState } from "react";
import { List, Typography, Card } from "antd";
import { createFromIconfontCN } from '@ant-design/icons';
import backFun from "../../api/user/back";

const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_5ptfzfve2a.js'
    ],
});
const { Title, Text } = Typography;

const AdminLogList = () => {
    const [logData, setLogData] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            const res = await backFun.getPriceTableLog();
            setLogData(res.data);
        };

        fetchData();
    }, []); 

    return (
        <Card title="操作日志" style={{ height: '100%', overflowY: 'auto' }} size="small" bodyStyle={{ padding: '14px' }}>
           
            <List
                dataSource={logData}
                
                renderItem={(item) => (
                    <List.Item key={item.id}>
            
                            <IconFont type="icon-peach-flower" className="font-size-lg"/>&nbsp;&nbsp;
                            <Text strong style={{ color: "blue" }}>{item.changedBy}</Text>
                            <Text type="secondary"> 在 </Text>
                            <Text strong style={{ color: "green" }}>{item.changedAt}</Text>
                            {item.oldPrice === item.newPrice &&
                                <>
                                    <Text type="secondary"> 将价格 </Text>
                                    <Text strong >¥{item.oldPrice.toFixed(2)}</Text>
                                    <Text type="secondary"> 变为 </Text>
                                    <Text strong >¥{item.newPrice.toFixed(2)}</Text>
                                </>
                            }
                            {item.oldValue === item.newValue &&
                                <>
                                    <Text type="secondary"> 将 </Text>
                                    <Text strong >¥{item.oldValue}</Text>
                                    <Text type="secondary"> 变为 </Text>
                                    <Text strong >¥{item.newValue}</Text>
                                </>
                            }
                            <Text type="secondary">{item.describe}</Text>
                            <Text style={{ color: "gray" }}>{item.pricingId}号</Text>
                  
                    </List.Item>
                )}
            />
        </Card>
    );
};

export default AdminLogList;
