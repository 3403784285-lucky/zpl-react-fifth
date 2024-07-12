
import React, { useState } from 'react';
import { Avatar, Button, Form, Input, Space, Typography } from 'antd';
import { UserOutlined, EditOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const Person = () => {
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState('John Doe');
  const [vipStatus, setVipStatus] = useState('VIP');

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    // Save changes to backend or perform validation
    setEditing(false);
  };

  const handleCancel = () => {
    // Cancel editing and revert changes
    setEditing(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', textAlign: 'center', paddingTop: 30 }}>
      <Avatar size={120} icon={<UserOutlined />} />
      <Title level={3} style={{ marginTop: 10 }}>{editing ? '编辑资料' : '个人中心'}</Title>
      <Space direction="vertical" style={{ width: '100%' }} align="center">
        <Text strong>昵称:</Text>
        {editing ? (
          <Form.Item
            initialValue={nickname}
            onChange={(e) => setNickname(e.target.value)}
          >
            <Input />
          </Form.Item>
        ) : (
          <Text>{nickname}</Text>
        )}

        <Text strong>VIP信息:</Text>
        <Text>{vipStatus}</Text>

        {editing ? (
          <Space>
            <Button type="primary" onClick={handleSave}>保存</Button>
            <Button onClick={handleCancel}>取消</Button>
          </Space>
        ) : (
          <Button icon={<EditOutlined />} onClick={handleEdit}>编辑资料</Button>
        )}
      </Space>
    </div>
  );
};

export default Person;

