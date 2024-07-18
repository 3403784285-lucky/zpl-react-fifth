import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { AppstoreOutlined, BorderOuterOutlined, AudioOutlined } from '@ant-design/icons';
import { Menu, Upload, Image, Card, message, Spin } from 'antd';
import aiFun from '../../api/user/ai';

const items = [
  {
    label: 'OCR图片识别',
    key: 'ocr',
    icon: <BorderOuterOutlined />,
    accept: '.jpg,.jpeg,.png,.gif,.bmp', // 只接受图片类型的文件
  },
  {
    label: 'ASR语音识别',
    key: 'asr',
    icon: <AudioOutlined />,
    accept: '.wav', // 只接受WAV格式的音频文件
  },
  {
    label: '表格识别',
    key: 'table',
    icon: <AppstoreOutlined />,
    accept: '.jpg,.jpeg,.png,.gif,.bmp', // 只接受图片类型的文件
  },
];

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const Extraction = () => {
  const [current, setCurrent] = useState('ocr');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const onClick = (e) => {
    setCurrent(e.key);
    setFileList([]); // 清空文件列表
    setResult(''); // 清空识别结果
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      try {
        file.preview = await getBase64(file.originFileObj);
      } catch (error) {
        message.error('预览图片失败');
        return;
      }
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = async ({ fileList: newFileList }) => {
    setFileList(newFileList);

    if (newFileList.length > 0) {
      const file = newFileList[0].originFileObj;

      if (!file) {
        console.error('未能获取上传的文件');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      setLoading(true); // 显示加载状态

      try {
        let response;
        if (current === 'ocr' || current === 'table') {
          response = await aiFun.imageRecognition(formData);
        } else if (current === 'asr') {
          response = await aiFun.audioRecognition(formData);
        }

        setResult(response.data); // 根据实际返回数据结构调整
      } catch (error) {
        console.error('识别失败:', error);
        message.error('识别失败，请重试');
      } finally {
        setLoading(false); // 隐藏加载状态
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <div className='p-30 w-full'>
      <Menu className="m-b-20" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items}>
        {items.map(item => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
      <div className="first-frame m-b-30" style={{ height: '20px' }}>
        <div className="tip-correction"><strong>信息提取</strong></div>
      </div>
      <div className='flex-c-center-center'>
        <Upload
          listType="picture-card"
          fileList={fileList}
          onPreview={handlePreview}
          onChange={handleChange}
          accept={current.accept}
          maxCount={1}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        {previewImage && (
          <Image
            wrapperStyle={{ display: 'none' }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterClose: () => setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </div>

      <div className="tip-correction m-t-20">
        <strong>提取结果</strong>
      </div>
      <div className='flex-c-center-center'>
        <Card className='m-t-20 shadow' hoverable style={{ width: 300 }}>
          {loading ? (
            <div className='flex items-center justify-center' style={{ minHeight: 150 }}>
              <Spin size="large" />
            </div>
          ) : (
            <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
              {result || '暂无结果'}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Extraction;
