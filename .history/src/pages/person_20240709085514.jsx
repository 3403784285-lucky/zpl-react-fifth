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

  const uploadButton =()=> {

};
}

export default PersonalCenter;
