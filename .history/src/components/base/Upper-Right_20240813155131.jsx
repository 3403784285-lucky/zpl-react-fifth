import React from "react";
import { List } from "antd";

const AdminLogList = ({ logData }) => {
  return (
    <List
      dataSource={logData}
      renderItem={(item) => (
        <List.Item key={item.id}>
          <span style={{ color: "blue" }}>操作人ID: {item.changedBy}</span> 在 
          <span style={{ color: "green" }}> {item.changedAt} </span> 将 
          <span style={{ color: "red" }}>定价ID: {item.pricingId} </span> 的 
          <span style={{ color: "orange" }}>价格从 ¥{item.oldPrice.toFixed(2)} 调整为 ¥{item.newPrice.toFixed(2)}</span>, 并且将 
          <span style={{ color: "purple" }}>值从 {item.oldValue} 变更为 {item.newValue}</span>。
          <span style={{ color: "gray" }}>描述: {item.describe}</span>
        </List.Item>
      )}
    />
  );
};

export default AdminLogList;
