import React, { useEffect, useState } from 'react';
import { Input, Button, Select, List, Tag, Typography } from 'antd';
import { SearchOutlined, FileTextOutlined } from '@ant-design/icons';
import searchFun from '../../../api/user/search';

const { Option } = Select;
const { Text } = Typography;

const data = [
    {
        title: '班级管理神器，老师的超级助手',
        date: '2024-07-06',
        description: '你在 2024-07-06 打开过 我收到的文件',
        type: '多人协作的 ...',
    },
    // 可以在这里添加更多的条目
];

const App = () => {
    const [searchType, setSearchType] = useState('name');
    const [searchText, setSearchText] = useState('');
    const [filteredData, setFilteredData] = useState(data);

    const handleSearchTypeChange = (value) => {
        setSearchType(value);
    };
 
    const handleSearch = async() => {
        // const searchTextLower = searchText.toLowerCase();

        // const filtered = data.filter(item => {
        //     if (searchType === 'name') {
        //         return item.title.toLowerCase().includes(searchTextLower);
        //     } else {
        //         return item.description.toLowerCase().includes(searchTextLower);
        //     }
        // });
        // setFilteredData(filtered);
        const res = await searchFun.byName(searchText);
        console.log(res.data)
    };

    const highlightText = (text, highlight) => {
        const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
        return (
            <span>
                {parts.map((part, index) =>
                    part.toLowerCase() === highlight.toLowerCase() ? (
                        <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div style={{ padding: '20px' }}>
            <Input.Group compact style={{ display: 'flex' }}>
                <Select defaultValue="name" onChange={handleSearchTypeChange}>
                    <Option value="name">按名字搜索</Option>
                    <Option value="content">按内容搜索</Option>
                </Select>
                <Input
                    style={{ flex: 1 }}
                    placeholder="搜索内容"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                    搜索
                </Button>
            </Input.Group>
            <List
                itemLayout="horizontal"
                dataSource={filteredData}
                renderItem={(item) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<FileTextOutlined style={{ fontSize: '24px', color: '#722ed1' }} />}
                            title={highlightText(item.title, searchText)}
                            description={
                                <div>
                                    <Text type="secondary">{item.date}</Text>
                                    <br />
                                    <Text type="secondary">{highlightText(item.description, searchText)}</Text>
                                </div>
                            }
                        />
                        <Tag color="purple">{item.type}</Tag>
                    </List.Item>
                )}
            />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <Button type="link">试试搜正文</Button>
            </div>
        </div>
    );
};

export default App;
