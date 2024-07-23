import React, { useState, useEffect } from 'react';
import { Button, Card, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import aiFun from '../../api/user/ai';
import EditorContentCopy from '../../components/utils/edit/editorContent';

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
        <div direction="vertical" size="large"  style={{ width: 300,height:'100%', overflowY: 'auto', padding: 10 }} >
          <EditorContentCopy loadingContent={reviewText}/>
        </div>
      )}
    </div>
  );
};

export default PassageComment;
