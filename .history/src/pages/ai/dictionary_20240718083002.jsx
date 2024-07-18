import React, { useState, useEffect } from 'react';
import { Input, Button, Card } from 'antd';
import aiFun from '../../api/user/ai';
function Dictionary({ baiduClick }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const keyword = document.getElementById('searchInput').value;
        
        const formData = new FormData();
        formData.append('text', keyword);
        
        try {
            // Simulate API call or fetch logic based on keyword
            const res = await aiFun.baidu(formData); // Replace with your actual API call logic
            const initialTitle = res.data.length > 0 ? res.data[0].title : '暂无数据';

            const updatedResults = res.data.map((item, index) => ({
                ...item,
                animatedTitle: index === 0 ? initialTitle : '生成中' // Initial card shows initialTitle, others show '生成中'
            }));

            setSearchResults(updatedResults);
            setLoading(false);
            animateCards(updatedResults); // Start animation for each card
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        // Clean up animation state on component unmount or re-render
        return () => {
            setSearchResults([]);
        };
    }, []);

    const animateCards = (results) => {
        results.forEach((result, index) => {
            setTimeout(() => {
                const animatedTitle = animateText(result.title);
                setSearchResults(prevResults => {
                    const updatedResults = [...prevResults];
                    updatedResults[index].animatedTitle = animatedTitle;
                    return updatedResults;
                });
            }, index * 500); // Adjust timing between animations here (milliseconds)
        });
    };

    const animateText = (text) => {
        let animatedText = '';
        let charIndex = 0;
        const charInterval = setInterval(() => {
            animatedText = text.slice(0, charIndex + 1);
            setSearchResults(prevResults => {
                const updatedResults = [...prevResults];
                updatedResults[updatedResults.length - 1].animatedTitle = animatedText;
                return updatedResults;
            });
            charIndex++;
            if (charIndex === text.length) {
                clearInterval(charInterval);
            }
        }, 100); // Adjust speed of animation here (milliseconds)
        return animatedText;
    };

    return (
        <div className="p-30" style={{ width: '360px' }}>
            <h4 className='m-b-20'>边写边搜</h4>
            <div className="input-frame flex">
                <Input id="searchInput" placeholder="请输入关键字可用逗号隔开" style={{ width: '100%' }} />
                <Button onClick={handleSearch} className='bg-color-second text-color-white flex-1 b-rd-6' disabled={loading}>
                    推荐
                </Button>
            </div>

            <div className='flex-c-center-center'>
                <Card className='m-t-30 p-4 shadow flex-c-center-center' hoverable style={{ width: 300, height: 150, overflowY: 'auto' }}>
                    {loading && <div>Loading...</div>}
                    {!loading && searchResults.length === 0 && <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>暂无数据</div>}
                    {!loading && searchResults.map((result, index) => (
                        <Card key={index} title={result.animatedTitle || ''} style={{ margin: '10px 0', opacity: result.animatedTitle ? 1 : 0 }}>
                            <p>{result.desc}</p>
                            <a href={result.href} target="_blank" rel="noopener noreferrer">{result.site}</a>
                        </Card>
                    ))}
                </Card>
            </div>
        </div>
    );
}

export default Dictionary;
