import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
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
            const updatedResults = res.data.map((item) => ({
                ...item,
                animatedTitle: ''
            }));

            setSearchResults(updatedResults);
            setLoading(false);
            animateListItems(updatedResults); // Start animation for each list item
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const animateListItems = (results) => {
        results.forEach((result, index) => {
            animateText(result.title, index);
        });
    };

    const animateText = (text, index) => {
        let charIndex = 0;
        const intervalId = setInterval(() => {
            setSearchResults(prevResults => {
                const updatedResults = [...prevResults];
                updatedResults[index].animatedTitle = text.slice(0, charIndex + 1);
                return updatedResults;
            });
            charIndex++;
            if (charIndex === text.length) {
                clearInterval(intervalId);
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

            <div className='m-t-30'>
                <List
                    loading={loading}
                    bordered
                    dataSource={searchResults}
                    renderItem={item => (
                        <List.Item>
                            {item.animatedTitle || '生成中'}
                            <p>{item.desc}</p>
                            <a href={item.href} target="_blank" rel="noopener noreferrer">{item.site}</a>
                        </List.Item>
                    )}
                />
            </div>
        </div>
    );
}

export default Dictionary;
