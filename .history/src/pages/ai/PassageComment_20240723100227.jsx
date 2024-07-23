import React, { useState, useEffect } from 'react';
import { Button, Card, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import aiFun from '../../api/user/ai';

const PassageComment = ({ editor }) => {
  const [loading, setLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewContent, setReviewContent] = useState(null);


  useEffect(() => {
    let reviewIndex = 0;

    if (showCards) {
      const reviewInterval = setInterval(() => {
        setReviewText((prev) => prev + reviewContent[reviewIndex]);
        reviewIndex += 1;
        if (reviewIndex === reviewContent.length) {
          clearInterval(reviewInterval);
        }
      }, 100);


      return () => {
        clearInterval(reviewInterval);

      };
    }
  }, [showCards]);

  const handleClick = async () => {
    setLoading(true);
    const res = await aiFun.paperReview({text:editor.getText()})
    if (res.code == 200) {
      setReviewContent(res.data)
      setShowCards(true)

      setLoading(false)
    }



  };

  return (
    <div className='flex p-10' style={{ height: '100%', justifyContent: 'center', overflowY: 'auto' }}>
      {!showCards ? (
        <Button type="primary" onClick={handleClick} icon={loading && <LoadingOutlined />}>
          {loading ? '生成中' : '开始评审'}
        </Button>
      ) : (
        <Space direction="vertical" size="large">
          <Card title="评审意见及改进意见"  ><div style={{ width: 270, height: 300, overflowY: 'auto', padding: 10 }}>{reviewText}</div></Card>
        </Space>
      )}
    </div>
  );
};

export default PassageComment;
