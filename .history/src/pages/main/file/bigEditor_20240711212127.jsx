import React, { useState } from 'react';
import { Input, Button, Select, List, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const mockData = {
  documents: [
    {
      category: "工科",
      content: "大家好，我是廖梓行，哈哈哈哈哈。我是一个很敏感的男孩啊",
      createTime: "2024-06-07 17:55:23",
      id: 50,
      isDeleted: 1,
      label: "423",
      likeCount: 0,
      name: "人工智能在医疗领域的应用研究",
      status: 0,
      subject: "计算机",
      summary: "2432",
      type: 0,
      updateTime: "2024-06-07 17:55:23",
      userId: 3,
      visibility: 1,
    }
  ],
  folders: [
    {
      createTime: "2024-06-09 00:59:11",
      description: null,
      id: 1,
      isDeleted: 0,
      name: "软件杯",
      permissions: "VIEW",
      updateTime: "2024-06-11 06:18:03",
      userId: 3
    },
    {
      id: 2, userId: 3, name: '十大撒旦', description: null, isDeleted: 0, createTime: '2024-06-09 00:59:11', updateTime: '2024-06-11 06:18:03', permissions: "VIEW"
    },
    {
      id: 5, userId: 3, name: '默认文件夹', description: null, isDeleted: 0, createTime: '2024-06-09 00:59:11', updateTime: '2024-06-11 06:18:03', permissions: "VIEW"
    },
    {
      id: 6, userId: 3, name: '', description: '哈哈', isDeleted: 0, createTime: '2024-06-09 00:59:11', updateTime: '2024-06-11 06:18:03', permissions: "VIEW"
    },
    {
      id: 7, userId: 3, name: '睡觉', description: '我爱睡觉', isDeleted: 0, createTime: '2024-06-09 00:59:11', updateTime: '2024-06-11 06:18:03', permissions: "VIEW"
    }
  ]
};

const App = () => {
  const [searchType, setSearchType] = useState('name');
  const [searchText, setSearchText] = useState('');
  const [filteredDocuments, setFilteredDocuments] = useState(mockData.documents);

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
  };

  const handleSearch = () => {
    const searchTextLower = searchText.toLowerCase();
    const filtered = mockData.documents.filter(item => {
      if (searchType === 'name') {
        return item.name.toLowerCase().includes(searchTextLower);
      } else {
        return item.content.toLowerCase().includes(searchTextLower);
      }
    });
    setFilteredDocuments(filtered);
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
        dataSource={filteredDocuments}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={highlightText(item.name, searchText)}
              description={
                <div>
                  <Text type="secondary">{item.createTime}</Text>
                  <br />
                  <Text type="secondary">{highlightText(item.content, searchText)}</Text>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default App;
