import React from "react";
import { List, Typography, Card } from "antd";

const { Text } = Typography;

const AdminLogList = ({ logData }) => {
    return (
        <List
            dataSource={logData}
            style={{height:'100%',overflowY:'auto'}}
            renderItem={(item) => (
                <List.Item key={item.id}>
                    <Card bordered={true} style={{ width: '100%' }}>

                        <Text strong style={{ color: "blue" }}>{item.changedBy}</Text>
                        <Text type="secondary"> 在 </Text>
                        <Text strong style={{ color: "green" }}>{item.changedAt}</Text>
                        {item.oldPrice == item.newPrice &&
                            <><Text type="secondary"> 将价格 </Text>
                                <Text strong style={{ color: "orange" }}>¥{item.oldPrice.toFixed(2)}</Text>
                                <Text type="secondary"> 变为 </Text>
                                <Text strong style={{ color: "orange" }}>¥{item.newPrice.toFixed(2)}</Text></>}
                        {item.oldValue == item.newValue &&
                            <><Text type="secondary"> 将 </Text>
                                <Text strong style={{ color: "orange" }}>¥{item.oldValue}</Text>
                                <Text type="secondary"> 变为 </Text>
                                <Text strong style={{ color: "orange" }}>¥{item.newValue}</Text></>}
                        <Text type="secondary">修改了</Text>
                        <Text style={{ color: "gray" }}>{item.describe}</Text>
                    </Card>
                </List.Item>
            )}
        />
    );
};

export default AdminLogList;