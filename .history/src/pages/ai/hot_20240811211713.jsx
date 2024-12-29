import React, { useState, useEffect } from 'react';
import { List, Card, Typography } from 'antd';
import aiFun from '../../api/user/ai';

const { Title, Link } = Typography;

function Hot() {
  const [trendingData, setTrendingData] = useState([]);

  useEffect(() => {
    // 定义异步函数获取数据
    const fetchData = async () => {
      const res = await aiFun.getHot();
      if (res.code === 200) {
        setTrendingData(res.data);
      }
    };
    fetchData();
  }, []);

  return (
    <Card title="新闻头条" style={{ padding: '20px',}}>
      <List
      style={{ height: '60vh', overflowY: 'auto' }}
        itemLayout="vertical"
        dataSource={trendingData}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <Link href={item.url} target="_blank" rel="noopener noreferrer">
              {index + 1}. {item.name}
            </Link>
          </List.Item>
        )}
      />
    </Card>
  );
}

export default Hot;
