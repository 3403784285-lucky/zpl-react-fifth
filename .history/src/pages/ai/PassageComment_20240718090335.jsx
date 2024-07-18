import React, { useState, useEffect } from 'react';
import { Button, Card, Space } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const PassageComment = () => {
  const [loading, setLoading] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');

  const reviewContent = `本文关于“文心一言大模型”（或称“ERNIE Bot大模型”的研究报告结构清晰，内容全面，展现了该模型在自然语言处理NLP领域的理论基础、设计实践、性能评估及未来发展方向等多个方面的深入分析。具体优点如下：

结构完整：文章从摘要开始，逐步深入到模型的理论基础、设计与实践、性能评估和未来展望，逻辑严谨，条理清晰。
内容丰富：详细描述了模型的构建过程、优化策略及实际应用案例，展示了模型在多个NLP任务中的卓越性能并通过对比分析揭示了其优势。
技术性强：文中涉及了先进的模型结构、分布式训练、混合精度训练等技术手段，体现了研究的深度和广度。
未来展望：对模型面临的挑战及未来研究方向进行了合理预测和讨论，具有前瞻性和指导意义。
然而，文章也存在一些可以改进的地方：
语言一致性：中英文摘要在表达上存在一定差异，建议统一语言风格，确保信息的准确传递。
细节补充：在描述模型构建过程和优化策略时，可以进一步补充具体的算法细节或技术参数，以便读者更深入理解。
案例分析深度：虽然提到了实际场景中的应用案例，但可以进一步深入分析这些案例的具体效果、应用场景的多样性及模型的泛化能力。
对比分析的详细性：在对比分析部分，可以增加更多与同类先进模型的详细对比，包括模型架构、训练数据、性能指标等方面的具体差异。`
  const suggestionContent = `统一语言风格：建议将中英文摘要中的表达进行统一，确保信息的准确性和一致性。可以优先考虑使用中文撰写，因为文章的主要内容也是基于中文语境的。
补充技术细节：在描述模型构建和优化策略时，增加具体的算法步骤、技术参数或图表展示，以便读者能够更直观地理解模型的技术特点。
深化案例分析：选取几个具有代表性的应用案例，深入剖析模型在实际应用中的效果、优势及可能存在的问题。可以通过数据对比、用户反馈等方式来增强案例的说服力。
加强对比分析：在对比分析部分，增加与同类先进模型的详细对比内容。可以从模型架构、训练数据、性能指标等多个维度进行对比分析，并探讨这些差异对模型性能的影响。
增加未来研究方向的具体性：在探讨未来研究方向时，可以提出更具体的研究目标、方法或预期成果。例如，针对模型体积优化问题，可以提出采用剪枝、量化等技术的具体实施方案；针对跨领域学习能力提升问题，可以探讨引入迁移学习、领域自适应等方法的可能性。`

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
    <div className='flex p-10' style={{ height: '100%', justifyContent:'center' ,overflowY:'auto'}}>
      {!showCards ? (
        <Button type="primary" onClick={handleClick} icon={loading && <LoadingOutlined />}>
          {loading ? '生成中' : '开始评审'}
        </Button>
      ) : (
        <Space direction="vertical" size="large">
          <Card title="评审意见" className='flex-wrap' ><div style={{width:270,height:300,overflowY:'auto' ,padding:10}}>{reviewText}</div></Card>
          <Card title="改进建议" ><div style={{width:270,height:300,overflowY:'auto',padding:10}}>{suggestionText}</div></Card>
        </Space>
      )}
    </div>
  );
};

export default PassageComment;
