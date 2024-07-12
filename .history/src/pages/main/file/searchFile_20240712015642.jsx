import React, { useState, useEffect } from 'react';
import { Input, Select, List, Typography } from 'antd';
import { FolderOutlined, FileOutlined } from '@ant-design/icons'; // Import icons
import searchFun from '../../../api/user/search';
import {createFromIconfontCN } from '@ant-design/icons';


const IconFont = createFromIconfontCN({
    scriptUrl: [
      '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js'
    ],
  });
const { Option } = Select;
const { Text } = Typography;



const SearchFile = () => {
  const [searchType, setSearchType] = useState('name');
  const [searchText, setSearchText] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchText.trim()) {
        setItems([]);
        return;
      }

      let response;
      if (searchType === 'name') {
        response = await searchFun.byName(searchText);
      } else if (searchType === 'content') {
        response = await searchFun.byContent(searchText);
      }

      const { documents, folders } = response.data;
      const combinedItems = [
        ...(documents || []).map(doc => ({ ...doc, type: 'document' })),
        ...(folders || []).map(folder => ({ ...folder, type: 'folder' }))
      ];
      setItems(combinedItems);
    };

    fetchSearchResults();
  }, [searchText, searchType]);

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
    // Clear search text when switching search type
    setSearchText('');
    setItems([]); // Clear items when switching search type
  };

  const highlightText = (text, highlight) => {
    if (!text) return null;
  
    if (searchType === 'name') {
      const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
      return (
        <span>
          {parts.map((part, index) =>
            part.toLowerCase() === highlight.toLowerCase() ? (
              <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
            ) : (
              part.length > 50 ? `${part.slice(0, 50)}...` : part
            )
          )}
        </span>
      );
    } else if (searchType === 'content') {
      const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
      return (
        <span>
          {parts.map((part, index) =>
            <span key={index}>
              {part.toLowerCase() === highlight.toLowerCase() ? (
                <span style={{ backgroundColor: 'yellow' }}>{part}</span>
              ) : (
                part.length > 50 ? `${part.slice(0, 50)}...` : part
              )}
            </span>
          )}
        </span>
      );
    }
  
    return null;
  };

  const renderIcon = (type) => {
    if (type === 'folder') {
      return <IconFont type='icon-wordIcon'></IconFont>;
    } else if (type === 'document') {
        return <IconFont type='icon-wordIcon'></IconFont>;
    }
    return null;
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
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
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
                  {item.type === 'document' && searchType === 'content' && (
                    <Text type="secondary">
                      {highlightText(item.content, searchText)}
                    </Text>
                  )}
                  {item.type === 'folder' && searchType === 'content' && (
                    <Text type="secondary">
                      {highlightText(item.description, searchText)}
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

export default SearchFile;
