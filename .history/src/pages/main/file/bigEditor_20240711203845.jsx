
// import Tiptap from "../../../components/utils/edit/editor.jsx";

// function BigEditor() {
    
    
//     // return <>
//     // {/* <Tiptap room={45} user={null} content={''}/>
//     //  */}
//     // </>

// }

// export default BigEditor;

import React, { useState } from 'react';
import { Input, Button, Select, List, Tag, Typography } from 'antd';
import { SearchOutlined, FileTextOutlined } from '@ant-design/icons';

const { Option } = Select;
const { Text } = Typography;

const data = [
  {
    title: '班级管理神器，老师的超级助手',
    date: '2024-07-06',
    description: '你在 2024-07-06 打开过 我收到的文件',
    type: '多人协作的 ...',
  },
  // Add more items here
];

const App = () => {
  const [searchType, setSearchType] = useState('name');
  const [searchText, setSearchText] = useState('');

  const handleSearchTypeChange = (value) => {
    setSearchType(value);
  };

  const handleSearch = () => {
    // Add logic to perform search based on searchType and searchText
    console.log('Searching for', searchText, 'by', searchType);
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
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<FileTextOutlined style={{ fontSize: '24px', color: '#722ed1' }} />}
              title={<Text strong>{item.title}</Text>}
              description={
                <div>
                  <Text type="secondary">{item.date}</Text>
                  <br />
                  <Text type="secondary">{item.description}</Text>
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
