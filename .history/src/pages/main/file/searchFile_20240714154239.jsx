import React, { useState, useEffect } from 'react';
import { Input, Select, List, Typography } from 'antd';
import searchFun from '../../../api/user/search';
import { createFromIconfontCN } from '@ant-design/icons';
import { setSearchText } from '../../../store';
import { useSelector } from 'react-redux';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js'
  ],
});
const { Option } = Select;
const { Text } = Typography;



const SearchFile = () => {
  const [searchType, setSearchType] = useState('name');
  const [items, setItems] = useState([]);
  const searchText = useSelector(state=>state.search.value);

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
    console.log(searchText+"!!!!!!!!!!!!!!")

  }, [searchText, searchType]);

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
    // Clear search text when switching search type
    setSearchText('');
    setItems([]); // Clear items when switching search type
  };
const toDocument=()=>{
  const toDocument = async (record) => {
       
    navigate(`/edit?` + encrypt(record.id))


}
}
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
      return <IconFont type='icon-wenjianjia1' className='font-size-mlg'></IconFont>;
    } else if (type === 'document') {
      return <IconFont type='icon-wordIcon' className='font-size-mlg'></IconFont>;
    }
    return null;
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* <Input.Group compact style={{ display: 'flex' }}> */}
      <Select style={{
        width: 90,
      }} value={searchType} onChange={handleSearchTypeChange}>
        <Option value="name">按名字</Option>
        <Option value="content">按内容</Option>
      </Select>
      {/* <Input
                    style={{ flex: 1 }}
                    placeholder="搜索内容"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Input.Group> */}
      <List
        style={{ height: '67vh', overflowY: 'auto' }}
        className='m-t-16 flex-c-center-center'
        itemLayout="horizontal"
        dataSource={items}
        renderItem={(item) => (
          <List.Item onClick={toDocument}>
            <List.Item.Meta
              avatar={renderIcon(item.type)}
              title={highlightText(item.name, searchText)}
              description={
                <div>


                  {item.type === 'document' && searchType === 'content' && (
                    <Text className='font-size-sm' type="secondary">
                      {highlightText(item.content, searchText)}
                    </Text>
                  )}
                  {item.type === 'folder' && searchType === 'content' && (
                    <Text type="secondary">
                      {highlightText(item.description, searchText)}
                    </Text>
                  )} <br /><Text className='font-size-sm' type="secondary">{item.createTime}</Text>
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

