import React, { useState, useEffect } from 'react';
import { List, Card, Typography } from 'antd';
import aiFun from '../../api/user/ai';

const { Title, Link } = Typography;
import { createFromIconfontCN, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
    scriptUrl: [
        '//at.alicdn.com/t/c/font_4248113_egjq2hct1il.js'
    ],
});
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
        <Card title="新闻头条" className='h-full' style={{ padding: '20px', overflowY: 'auto' }}>
            <List
                itemLayout="vertical"
                dataSource={trendingData}
                renderItem={(item, index) => (
                    <List.Item key={index}>
                        <Link href={item.url} target="_blank" rel="noopener noreferrer">
                            {index == 0 ? <IconFont type='icon-diyiming1' className='font-size-mlg' /> : (index == 1 ? <IconFont type='icon-diyiming1' className='font-size-mlg' /> : (index == 2 ? <IconFont type='icon-dierming1' className='font-size-mlg' /> : (index == 3 ? <IconFont type='icon-disanming' className='font-size-mlg' /> : (index + 1))))} . {item.name}
                        </Link>
                    </List.Item>
                )}
            />
        </Card>
    );
}

export default Hot;
