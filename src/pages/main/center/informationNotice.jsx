import React, { useState, useEffect } from 'react';
import { List, Modal, Pagination, message } from 'antd';

const InformationNotice = () => {
  const [notices, setNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);

  useEffect(() => {
    fetchNotices();
  }, [currentPage]);

  const fetchNotices = async () => {
    try {
      // 这里替换为实际的API调用
      const response = await fetch(`/api/notices?page=${currentPage}&pageSize=${pageSize}`);
      const data = await response.json();
      if (data.code === 200) {
        setNotices(data.data.list);
        setTotal(data.data.total);
      } else {
        message.error('获取通知列表失败');
      }
    } catch (error) {
      message.error('获取通知列表失败');
    }
  };

  const handleNoticeClick = (notice) => {
    setCurrentNotice(notice);
    setModalVisible(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">系统通知</h2>
      <List
        dataSource={notices}
        renderItem={(item) => (
          <List.Item 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => handleNoticeClick(item)}
          >
            <div className="flex justify-between w-full">
              <span>{item.title}</span>
              <span className="text-gray-400">{item.createTime}</span>
            </div>
          </List.Item>
        )}
      />
      
      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={total}
          onChange={handlePageChange}
          showQuickJumper
        />
      </div>

      <Modal
        title="通知详情"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {currentNotice && (
          <div>
            <h3 className="text-lg font-bold mb-2">{currentNotice.title}</h3>
            <p className="text-gray-400 mb-4">{currentNotice.createTime}</p>
            <div className="whitespace-pre-wrap">{currentNotice.content}</div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InformationNotice;
