import React from "react";
import { List, Card } from "antd";

const AdminLogList = ({ logData }) => {
  return (
    <List
      grid={{ gutter: 16, column: 1 }}
      dataSource={logData}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <Card title={`操作人ID: ${item.changedBy}`} bordered={false}>
            <p><strong>定价ID:</strong> {item.pricingId}</p>
            <p><strong>原价格:</strong> ¥{item.oldPrice.toFixed(2)}</p>
            <p><strong>现价格:</strong> ¥{item.newPrice.toFixed(2)}</p>
            <p><strong>原值:</strong> {item.oldValue}</p>
            <p><strong>现值:</strong> {item.newValue}</p>
            <p><strong>描述:</strong> {item.describe}</p>
            <p><strong>操作时间:</strong> {item.changedAt}</p> {/* 直接使用已格式化的时间 */}
          </Card>
        </List.Item>
      )}
    />
  );
};

export default AdminLogList;
