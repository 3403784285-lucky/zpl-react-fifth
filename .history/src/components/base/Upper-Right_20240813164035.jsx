import React from "react";
import { List, Typography, Card } from "antd";

const { Text } = Typography;

const AdminLogList = ({ logData }) => {
  return (
    <List
      dataSource={logData}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card bordered={true} style={{ width: '100%' }}>
          
            <Text strong style={{ color: "blue" }}>{item.changedBy}</Text>
            <Text type="secondary"> 在 </Text>
            <Text strong style={{ color: "green" }}>{item.changedAt}</Text>
            <Text type="secondary"> 将 </Text>
            <Text strong style={{ color: "red" }}>定价ID: {item.pricingId}</Text>
            <Text type="secondary"> 的价格从 </Text>
            <Text strong style={{ color: "orange" }}>¥{item.oldPrice.toFixed(2)}</Text>
            <Text type="secondary"> 变为 </Text>
            <Text strong style={{ color: "orange" }}>¥{item.newPrice.toFixed(2)}</Text>
            <Text type="secondary">, 并且将值从 </Text>
            <Text strong style={{ color: "purple" }}>{item.oldValue}</Text>
            <Text type="secondary"> 变为 </Text>
            <Text strong style={{ color: "purple" }}>{item.newValue}</Text>
            <Text type="secondary">修改了</Text>
            <Text style={{ color: "gray" }}>{item.describe}</Text>
          </Card>
        </List.Item>
      )}
    />
  );
};

export default AdminLogList;
