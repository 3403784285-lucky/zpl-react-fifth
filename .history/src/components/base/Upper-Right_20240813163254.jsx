import React from "react";
import { List, Typography, Card } from "antd";

const { Text } = Typography;

const AdminLogList = ({ logData }) => {
  return (
    <Card title="管理员操作日志" bordered={false} style={{ margin: '20px' }}>
      <List
        dataSource={logData}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Text type="secondary">操作人ID: </Text>
            <Text strong style={{ color: "blue" }}>{item.changedBy}</Text>
            <Text type="secondary"> 在 </Text>
            <Text strong style={{ color: "green" }}>{item.changedAt}</Text>
            <Text type="secondary"> 将 </Text>
            <Text strong style={{ color: "red" }}>定价ID: {item.pricingId}</Text>
            <Text type="secondary"> 的价格从 </Text>
            <Text strong style={{ color: "orange" }}>¥{item.oldPrice.toFixed(2)}</Text>
            <Text type="secondary"> 调整为 </Text>
            <Text strong style={{ color: "orange" }}>¥{item.newPrice.toFixed(2)}</Text>
            <Text type="secondary">, 并且将值从 </Text>
            <Text strong style={{ color: "purple" }}>{item.oldValue}</Text>
            <Text type="secondary"> 变更为 </Text>
            <Text strong style={{ color: "purple" }}>{item.newValue}</Text>
            <Text type="secondary">。描述: </Text>
            <Text style={{ color: "gray" }}>{item.describe}</Text>
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AdminLogList;
