import React, { useState, useEffect } from 'react';
import { Button, Card, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import './PassageComment.css';

const PassageComment = () => {
  const [loading, setLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');

  const reviewContent = "这是评审意见内容。";
  const suggestionContent = "这是改进建议内容。";

  useEffect(() => {
    let reviewIndex = 0;
    let suggestionIndex = 0;

    if (showCards) {
      const reviewInterval = setInterval(() => {
        setReviewText((prev) => prev + reviewContent[reviewIndex]);
        reviewIndex += 1;
        if (reviewIndex === reviewContent.length) {
          clearInterval(reviewInterval);
        }
      }, 100);

      const suggestionInterval = setInterval(() => {
        setSuggestionText((prev) => prev + suggestionContent[suggestionIndex]);
        suggestionIndex += 1;
        if (suggestionIndex === suggestionContent.length) {
          clearInterval(suggestionInterval);
        }
      }, 100);

      return () => {
        clearInterval(reviewInterval);
        clearInterval(suggestionInterval);
      };
    }
  }, [showCards]);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowCards(true);
    }, 2000);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {!showCards ? (
        <Button type="primary" onClick={handleClick} icon={loading && <LoadingOutlined />}>
          {loading ? '生成中' : '开始评审'}
        </Button>
      ) : (
        <Space direction="vertical" size="large">
          <Card title="评审意见">{reviewText}</Card>
          <Card title="改进建议">{suggestionText}</Card>
        </Space>
      )}
    </div>
  );
};

export default PassageComment;
