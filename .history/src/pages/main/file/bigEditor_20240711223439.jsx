import React, { useState, useEffect, useRef } from 'react';
import { Input, Select, List, Typography } from 'antd';
import { SearchOutlined, FolderOutlined, FileOutlined } from '@ant-design/icons'; // Import icons
import searchFun from '../../../api/user/search';

const { Option } = Select;
const { Text } = Typography;

const App = () => {
  const [searchType, setSearchType] = useState('name');
  const [items, setItems] = useState([]);
  const searchTextRef = useRef('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchText = searchTextRef.current.trim();

      if (!searchText) {
        setItems([]);
        return;
      }

      let response;
      if (searchType === 'name') {
        response = await searchFun.byName(searchText);
      } else if (searchType === 'content') {
        response = await searchFun.byContent(searchText);
      }
      console.log(response)

      const { documents, folders } = response.data;
      const combinedItems = [
        ...(documents || []).map(doc => ({ ...doc, type: 'document' })),
        ...(folders || []).map(folder => ({ ...folder, type: 'folder' }))
      ];
      setItems(combinedItems);
    };

    const debounceTimeout = setTimeout(() => {
      fetchSearchResults();
    }, 500); // Adjust debounce time as needed (milliseconds)

    return () => clearTimeout(debounceTimeout);
  }, [searchType]);

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
    setItems([]); // Clear items when switching search type
  };

  const highlightText = (text, highlight) => {
    if (!text) return null;

    const parts = text?.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts?.map((part, index) =>
          part.toLowerCase() === highlight.toLowerCase() ? (
            <span key={index} style={{ backgroundColor: searchType === 'name' ? 'transparent' : 'yellow' }}>{part}</span>
          ) : (
            part.length > 50 ? `${part.slice(0, 50)}...` : part
          )
        )}
      </span>
    );
  };

  const renderIcon = (type) => {
    if (type === 'folder') {
      return <FolderOutlined />;
    } else if (type === 'document') {
      return <FileOutlined />;
    }
    return null;
  };

  const handleInputChange = (e) => {
    searchTextRef.current = e.target.value;
  };

  return (
    <div style={{ padding: '20px' }}>
      <Input.Group compact style={{ display: 'flex' }}>
        <Select value={searchType} onChange={handleSearchTypeChange}>
          <Option value="name">按名字搜索</Option>
          <Option value="content">按内容搜索</Option>
        </Select>
        <Input
          style={{ flex: 1 }}
          placeholder="搜索内容"
          onChange={handleInputChange}
        />
      </Input.Group>
      <List
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={renderIcon(item.type)}
              title={highlightText(item.name, searchTextRef.current)}
              description={
                <div>
                  <Text type="secondary">{item.createTime}</Text>
                  <br />
                  {item.type === 'document' && searchType === 'content' && (
                    <Text type="secondary">
                      {highlightText(item.content, searchTextRef.current)}
                    </Text>
                  )}
                  {item.type === 'folder' && searchType === 'content' && (
                    <Text type="secondary">
                      {highlightText(item.description, searchTextRef.current)}
                    </Text>
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
