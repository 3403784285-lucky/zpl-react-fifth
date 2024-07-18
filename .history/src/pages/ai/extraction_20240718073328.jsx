import React, { useState } from 'react';
import { Upload, Button, message, Spin } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import aiFun from '../../api/user/ai';

const FileUploader = () => {
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleFileUpload = async (file) => {
    if (!file) {
      console.error('未能获取上传的文件');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true); // 显示加载状态

    try {
      let response;
      // 根据文件类型调用不同的后端处理函数
      if (file.type.startsWith('image/')) {
        response = await aiFun.imageRecognition(formData);
      } else if (file.type === 'audio/wav') {
        response = await aiFun.audioRecognition(formData);
      } else {
        message.error('不支持的文件类型');
        return;
      }

      setResult(response.data); // 根据实际返回数据结构调整
    } catch (error) {
      console.error('识别失败:', error);
      message.error('识别失败，请重试');
    } finally {
      setLoading(false); // 隐藏加载状态
    }
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className='p-30 w-full'>
      <Upload
        fileList={fileList}
        onChange={handleChange}
        beforeUpload={handleFileUpload}
        maxCount={1}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
      >
        <Button icon={<PlusOutlined />}>Select File</Button>
      </Upload>

      <div className="tip-correction m-t-20">
        <strong>提取结果</strong>
      </div>
      <div className='flex-c-center-center'>
        <Spin spinning={loading}>
          <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
            {loading ? '正在识别中...' : result || '暂无结果'}
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default FileUploader;
