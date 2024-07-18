
import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';
import aiFun from '../../api/user/ai';
function Dictionary({ baiduClick }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [animationIndex, setAnimationIndex] = useState(-1);
    const [animationText, setAnimationText] = useState('');

    const handleSearch = async () => {
        setLoading(true);
        const keyword = document.getElementById('searchInput').value;
        // Simulate API call or fetch logic based on keyword
        // Replace with your actual API call logic here
        const formData = new FormData();
        formData.append('text', keyword);
        const res = await aiFun.baidu(formData)
        setSearchResults(res.data);
        setLoading(false);
        startAnimation(data);
    };

    const startAnimation = (results) => {
        setAnimationIndex(-1);
        setAnimationText('');
        const timer = setInterval(() => {
            setAnimationIndex(prevIndex => prevIndex + 1);
            if (animationIndex < results.length) {
                const text = results[animationIndex].title.slice(0, animationText.length + 1);
                setAnimationText(text);
            } else {
                clearInterval(timer);
            }
        }, 100); // Adjust speed of animation here (milliseconds)
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
                        <Card key={index} title={result.title} style={{ margin: '10px 0', opacity: animationIndex >= index ? 1 : 0 }}>
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
