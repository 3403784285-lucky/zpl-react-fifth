import React, { useState } from 'react';
import { Input, Button, Select, List, Typography } from 'antd';
import { SearchOutlined, FolderOutlined, FileOutlined } from '@ant-design/icons'; // Import icons
import searchFun from '../../../api/user/search';

const { Option } = Select;
const { Text } = Typography;

const App = () => {
  const [searchType, setSearchType] = useState('name');
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
  };

  const handleSearch = async () => {
    const response = await searchFun.byName(searchText);
    const { documents, folders } = response.data;
    // Combine documents and folders into a single array with type indicator
    const combinedItems = [
      ...documents.map(doc => ({ ...doc, type: 'document' })),
      ...folders.map(folder => ({ ...folder, type: 'folder' }))
    ];
    setItems(combinedItems);
  };

  const renderIcon = (type) => {
    if (type === 'folder') {
      return <FolderOutlined />;
    } else if (type === 'document') {
      return <FileOutlined />;
    }
    return null;
  };

  const highlightText = (text, highlight) => {
    const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts?.map((part, index) =>
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
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={renderIcon(item.type)}
              title={highlightText(item.name, searchText)}
              description={
                <div>
                  <Text type="secondary">{item.createTime}</Text>
                  <br />
                  {item.type === 'document' ? (
                    <Text type="secondary">{highlightText(item.content, searchText)}</Text>
                  ) : (
                    <Text type="secondary">{highlightText(item.description, searchText)}</Text>
                  )}
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
