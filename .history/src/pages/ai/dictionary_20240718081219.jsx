import React, { useState } from 'react';
import { Input, Button, Card } from 'antd';

function Dictionary({ baiduClick }) {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        // // Simulate API call or fetch logic
        // // Replace with your actual API call logic here
        // const response = await fetch('your_search_endpoint');
        // const data = await response.json();
        setSearchResults(data);
        setLoading(false);
    };

    return (
        <div className="p-30" style={{ width: '360px' }}>
            <h4 className='m-b-20'>边写边搜</h4>
            <div className="input-frame flex">
                <Input placeholder="请输入关键字可用逗号隔开" style={{ width: '100%' }} />
                <Button onClick={handleSearch} className='bg-color-second text-color-white flex-1 b-rd-6' disabled={loading}>
                    推荐
                </Button>
            </div>

            <div className='flex-c-center-center'>
                <Card className='m-t-30 p-4 shadow flex-c-center-center' hoverable style={{ width: 300, height: 150, overflowY: 'auto' }}>
                    {loading && <div>Loading...</div>}
                    {!loading && searchResults.length === 0 && <div className='flex' style={{ wordBreak: 'break-all', wordWrap: 'break-word' }}>暂无数据</div>}
                    {!loading && searchResults.map((result, index) => (
                        <Card key={index} title={<a href={result.href} target="_blank" rel="noopener noreferrer">{result.title}</a>} style={{ margin: '10px 0' }}>
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
