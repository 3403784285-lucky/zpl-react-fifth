import React, { useState } from 'react';
import { Input, Button, List } from 'antd';
import aiFun from '../../api/user/ai';

function Dictionary() {
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
            setSearchResults(res.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
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
                    className=' p-10 p-t-40'
                    style={{ height: '60vh', overflowY: 'auto' }}
                    loading={loading}
                    bordered
                    dataSource={searchResults}
                    renderItem={item => (
                        <List.Item className='flex-c-center-start'>
                            <h4>{item.title}</h4>
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
