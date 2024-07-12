import React, { useState } from 'react';
import { Avatar, Upload, Button, Modal, Form, Input } from 'antd';
import { EditOutlined, UserOutlined, UploadOutlined } from '@ant-design/icons';

const PersonalCenter = () => {
  const [editNickname, setEditNickname] = useState(false);
  const [nickname, setNickname] = useState('John Doe');
  const [vipInfo, setVipInfo] = useState('VIP Member');
  const [avatar, setAvatar] = useState('https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png');
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');

  const handleNicknameChange = (value) => {
    setNickname(value);
    setEditNickname(false); // Close the edit mode after change
  };

  const handleAvatarChange = (info) => {
    if (info.file.status === 'done') {
      setAvatar(info.file.response.url); // Assuming backend returns the avatar URL
    }
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>Change Avatar</div>
    </div>
  );

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        <Avatar size={100} src={avatar} icon={<UserOutlined />} />
        <div style={{ marginTop: 10 }}>
          <Upload
            name="avatar"
            action="https://example.com/upload"
            showUploadList={false}
            onChange={handleAvatarChange}
            beforeUpload={() => false} // Prevent default upload behavior
          >
            <Button type="link">{uploadButton}</Button>
          </Upload>
        </div>
      </div>
      
      <div style={{ marginBottom: 20 }}>
        <strong>Nickname:</strong>{' '}
        {editNickname ? (
          <Form
            initialValues={{ nickname }}
            onFinish={(values) => handleNicknameChange(values.nickname)}
            style={{ display: 'inline-block' }}
          >
            <Form.Item name="nickname">
              <Input autoFocus />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <>
            {nickname}{' '}
            <Button type="link" onClick={() => setEditNickname(true)}>
              <EditOutlined />
            </Button>
          </>
        )}
      </div>

      <div style={{ marginBottom: 20 }}>
        <strong>VIP Info:</strong> {vipInfo}
      </div>

      <Button type="primary">Edit Profile</Button>
    </div>
  );
};

export default PersonalCenter;
