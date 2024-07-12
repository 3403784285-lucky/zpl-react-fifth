import React, { useState } from 'react';
import { Upload, Button, Spin, Typography, Card, Row, Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';

const { Title, Text } = Typography;

const ImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [extractedInfo, setExtractedInfo] = useState(null);

  const handleUpload = async (info) => {
    // setLoading(true);
    // const formData = new FormData();
    // formData.append('file', info.file);

    // try {
    //   const response = await axios.post('/your-backend-endpoint', formData, {
    //     headers: { 'Content-Type': 'multipart/form-data' }
    //   });
    //   setExtractedInfo(response.data);
    // } catch (error) {
    //   console.error('Error uploading file:', error);
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={2} style={{ color: '#4B0082' }}>信息提取界面</Title>
        </Col>
      </Row>
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Upload customRequest={handleUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />} type="primary" style={{ backgroundColor: '#4B0082', borderColor: '#4B0082' }}>
              上传图片
            </Button>
          </Upload>
        </Col>
      </Row>
      {loading && (
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Col>
            <Spin size="large" />
          </Col>
        </Row>
      )}
      {extractedInfo && (
        <Row justify="center">
          <Col span={24}>
            <Card>
              <Title level={4}>提取结果</Title>
              <Text>{extractedInfo}</Text>
            </Card>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ImageUpload;
