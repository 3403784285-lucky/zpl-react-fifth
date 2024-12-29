import React, { useEffect, useState } from 'react';
import { Table, Pagination, message, Upload, Button, Modal, Popconfirm } from 'antd';
import { UploadOutlined, DeleteOutlined } from '@ant-design/icons';
import fileCFun from '../../api/user/file';

const App = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // 获取文档数据
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fileCFun.getVsFiles();
      const fetchedData = response.data;
      setData(
          fetchedData.map((item) => ({
            key: item.docId,
            doc_id: item.docId,
            doc_name: item.docName,
          }))
      );
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 分页数据处理
  const paginatedData = data.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSelectChange = (selectedKeys) => {
    setSelectedRowKeys(selectedKeys);
  };

  const handleDelete = async () => {
    try {
      await Promise.all(selectedRowKeys.map((id) => fileCFun.deleteVs(id)));
      message.success('删除成功');
      setIsModalVisible(false);
      setSelectedRowKeys([]);
      fetchData();
    } catch (error) {
      message.error('删除失败');
    }
  };

  const handleUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      await fileCFun.addVs(formData);
      message.success('上传成功');
      fetchData();
    } catch (error) {
      message.error('上传失败');
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: handleSelectChange,
  };

  return (
      <div style={{ padding: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <Upload customRequest={handleUpload} showUploadList={false}>
            <Button icon={<UploadOutlined />}>上传文件</Button>
          </Upload>
          <Popconfirm
              title={`确定要删除这${selectedRowKeys.length}项吗？`}
              onConfirm={() => setIsModalVisible(true)}
              okText="确认"
              cancelText="取消"
              disabled={selectedRowKeys.length === 0}
          >
{/*            <Button icon={<DeleteOutlined />} type="danger" disabled={selectedRowKeys.length === 0}>
              删除
            </Button>*/}
          </Popconfirm>
        </div>

        <Table
            rowSelection={rowSelection}
            columns={[
              {
                title: '文档ID',
                dataIndex: 'doc_id',
                key: 'doc_id',
              },
              {
                title: '文档名称',
                dataIndex: 'doc_name',
                key: 'doc_name',
              },
            ]}
            dataSource={paginatedData}
            pagination={false}
            loading={loading}
            bordered
        />

        <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={data.length}
            showQuickJumper
            onChange={handlePageChange}
        />

        <Modal
            title="确认删除"
            visible={isModalVisible}
            onOk={handleDelete}
            onCancel={() => setIsModalVisible(false)}
        >
          <p>您将要删除{selectedRowKeys.length}项内容，确认删除吗？</p>
        </Modal>
      </div>
  );
};

export default App;
