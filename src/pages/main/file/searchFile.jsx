// import React, { useState, useEffect } from 'react';
// import { Input, Select, List, Typography } from 'antd';
// import { FolderOutlined, FileOutlined } from '@ant-design/icons'; // Import icons
// import searchFun from '../../../api/user/search';
// import { createFromIconfontCN } from '@ant-design/icons';


// const IconFont = createFromIconfontCN({
//     scriptUrl: [
//         '//at.alicdn.com/t/c/font_4248113_hbf9dy4u7bk.js'
//     ],
// });
// const { Option } = Select;
// const { Text } = Typography;



// const SearchFile = () => {
//     const [searchType, setSearchType] = useState('name');
//     const [searchText, setSearchText] = useState('');
//     const [items, setItems] = useState([]);

//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             if (!searchText.trim()) {
//                 setItems([]);
//                 return;
//             }

//             let response;
//             if (searchType === 'name') {
//                 response = await searchFun.byName(searchText);
//             } else if (searchType === 'content') {
//                 response = await searchFun.byContent(searchText);
//             }

//             const { documents, folders } = response.data;
//             const combinedItems = [
//                 ...(documents || []).map(doc => ({ ...doc, type: 'document' })),
//                 ...(folders || []).map(folder => ({ ...folder, type: 'folder' }))
//             ];
//             setItems(combinedItems);
//         };

//         fetchSearchResults();
//     }, [searchText, searchType]);

//     const handleSearchTypeChange = (value) => {
//         setSearchType(value);
//         // Clear search text when switching search type
//         setSearchText('');
//         setItems([]); // Clear items when switching search type
//     };

//     const highlightText = (text, highlight) => {
//         if (!text) return null;

//         if (searchType === 'name') {
//             const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
//             return (
//                 <span>
//                     {parts.map((part, index) =>
//                         part.toLowerCase() === highlight.toLowerCase() ? (
//                             <span key={index} style={{ backgroundColor: 'yellow' }}>{part}</span>
//                         ) : (
//                             part.length > 50 ? `${part.slice(0, 50)}...` : part
//                         )
//                     )}
//                 </span>
//             );
//         } else if (searchType === 'content') {
//             const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
//             return (
//                 <span>
//                     {parts.map((part, index) =>
//                         <span key={index}>
//                             {part.toLowerCase() === highlight.toLowerCase() ? (
//                                 <span style={{ backgroundColor: 'yellow' }}>{part}</span>
//                             ) : (
//                                 part.length > 50 ? `${part.slice(0, 50)}...` : part
//                             )}
//                         </span>
//                     )}
//                 </span>
//             );
//         }

//         return null;
//     };

//     const renderIcon = (type) => {
//         if (type === 'folder') {
//             return <IconFont type='icon-wordIcon' className='font-size-mlg'></IconFont>;
//         } else if (type === 'document') {
//             return <IconFont type='icon-wenjianjia1' className='font-size-mlg'></IconFont>;
//         }
//         return null;
//     };

//     return (
//         <div style={{ padding: '20px' }}>
//             <Input.Group compact style={{ display: 'flex' }}>
//                 <Select value={searchType} onChange={handleSearchTypeChange}>
//                     <Option value="name">按名字搜索</Option>
//                     <Option value="content">按内容搜索</Option>
//                 </Select>
//                 <Input
//                     style={{ flex: 1 }}
//                     placeholder="搜索内容"
//                     value={searchText}
//                     onChange={(e) => setSearchText(e.target.value)}
//                 />
//             </Input.Group>
//             <List
//                 style={{ height: '67vh', overflowY: 'auto' }}
//                 className='m-t-16'
//                 itemLayout="horizontal"
//                 dataSource={items}
//                 renderItem={(item) => (
//                     <List.Item>
//                         <List.Item.Meta
//                             avatar={renderIcon(item.type)}
//                             title={highlightText(item.name, searchText)}
//                             description={
//                                 <div>


//                                     {item.type === 'document' && searchType === 'content' && (
//                                         <Text className='font-size-sm' type="secondary">
//                                             {highlightText(item.content, searchText)}
//                                         </Text>
//                                     )}
//                                     {item.type === 'folder' && searchType === 'content' && (
//                                         <Text type="secondary">
//                                             {highlightText(item.description, searchText)}
//                                         </Text>
//                                     )} <br /><Text className='font-size-sm' type="secondary">{item.createTime}</Text>
//                                 </div>
//                             }
//                         />
//                     </List.Item>
//                 )}
//             />
//         </div>
//     );
// };

// export default SearchFile;


import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, List } from 'antd';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TableOfContents from '@tiptap-pro/extension-table-of-contents';

const EditorWithOutline = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TableOfContents.configure({
        headings: [1, 2, 3], // 可选的标题级别
      }),
    ],
    content: `
      <h1>标题 1</h1>
      <p>这是一些内容。</p>
      <h2>标题 2</h2>
      <p>更多内容。</p>
      <h3>标题 3</h3>
      <p>更多内容。</p>
    `,
  });

  const [outline, setOutline] = useState([]);

  // 获取编辑器内容大纲
  const generateOutline = () => {
    if (editor) {
      const items = editor.getExtension(TableOfContents);
      if (items) {
        const outlineItems = items.items.map(item => ({
          text: item.node.textContent,
          level: item.node.attrs.level,
        }));
        setOutline(outlineItems);
      }
    }
  };

  // 初次加载时生成大纲
  useState(() => {
    generateOutline();
  }, []);

  return (
    <PageContainer>
      <Card title="编辑器内容大纲">
        <EditorContent editor={editor} />
        <List
          bordered
          dataSource={outline}
          renderItem={item => (
            <List.Item>
              <strong>标题 {item.level}</strong>: {item.text}
            </List.Item>
          )}
        />
      </Card>
    </PageContainer>
  );
};

export default EditorWithOutline;
