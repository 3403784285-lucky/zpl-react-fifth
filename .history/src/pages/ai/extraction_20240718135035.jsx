import React, { useState } from 'react';
import { PlusOutlined, AppstoreOutlined, BorderOuterOutlined, AudioOutlined } from '@ant-design/icons';
import { Menu, Upload, Card, message } from 'antd';
import aiFun from '../../api/user/ai';
import { LoadingOutlined } from '@ant-design/icons';

const items = [
  {
    label: 'OCR图片识别',
    key: 'ocr',
    icon: <BorderOuterOutlined />,
  },
  {
    label: 'ASR语音识别',
    key: 'asr',
    icon: <AudioOutlined />,
  },
  {
    label: '表格识别',
    key: 'table',
    icon: <AppstoreOutlined />,
  },
];

const Extraction = () => {
  const [current, setCurrent] = useState('ocr');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState([]);
  const [recognitionResult, setRecognitionResult] = useState('');
  const [loading, setLoading] = useState(false);

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

      setLoading(true);

      try {
        let response;
        switch (current) {
          case 'ocr':
            response = await aiFun.ocr(formData);
            break;
          case 'asr':
            if (file.type !== 'audio/wav') {
              message.error('语音识别只支持.wav格式的文件');
              setLoading(false);
              return;
            }
            response = await aiFun.asr(formData);
            break;
          case 'table':
            response = await aiFun.ocrTable(formData);
            break;
          default:
            break;
        }

        // setRecognitionResult(response);
        console.log(response)
        setLoading(false);
      } catch (error) {
        console.error('请求失败:', error);
        message.error('请求失败，请重试');
        setLoading(false);
      }
    }
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}></div>
    </div>
  );

  return (
    <div className='p-30 w-full'>
      <Menu className="m-b-20" onClick={setCurrent} selectedKeys={[current]} mode="horizontal" items={items} />

      <div className="first-frame m-b-30" style={{ height: '20px' }}>
        <div className="tip-correction"><strong>信息提取</strong></div>
      </div>

      <div className='flex-c-center-center'>
        <Upload
          accept={current === 'asr' ? '.wav' : 'image/*'}
          fileList={fileList}
          beforeUpload={() => false} // Prevent default upload behavior
          onChange={handleChange}
          maxCount={1}
        >
          {uploadButton}
        </Upload>
        {loading && <LoadingOutlined style={{ fontSize: 24, color: '#1890ff', marginLeft: 16 }} spin />}
        {previewImage && (
          <Card className="m-t-20 shadow" hoverable style={{ width: 300 }}>
            <img alt="preview" style={{ width: '100%' }} src={previewImage} />
          </Card>
        )}
      </div>

      <div className="tip-correction m-t-20">
        <strong>提取结果</strong>
      </div>

      <div className='flex-c-center-center'>
        <Card className='m-t-20 shadow' hoverable style={{ width: 300 }}>
          <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>
            {loading ? '正在生成中...' : (recognitionResult || '暂无结果')}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Extraction;
