import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { Button, Upload, message } from 'antd';
import mammoth from 'mammoth';
import { createFromIconfontCN } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_40bmlkg84c5.js'
  ],
});

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
];

const Tiptap = () => {
  const editor = useEditor({
    extensions,
    content: '',
  });

  const handleFileChange = async (info) => {
    const file = info.file.originFileObj || info.file;

    if (file) {
      try {
        const arrayBuffer = await file.arrayBuffer();
        const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
        console.log(html); // 确认生成的 HTML 内容

        editor.commands.setContent(html, {
          parseOptions: {
            preserveWhitespace: 'full',
          },
        });

        message.success('Document uploaded successfully');
      } catch (error) {
        message.error('Failed to render document');
        console.error('Error:', error);
      }
    }
  };

  const MenuBar = () => {
    if (!editor) {
      return null;
    }

    return (
      <div className="upper-frame bg-color-blue flex-center-center shadow" style={{ height: '50px' }}>
        <span>
          <IconFont
            type="icon-bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? 'is-active m-10 font-size-lg' : 'm-10 font-size-lg'}
          />
        </span>
        <span><IconFont type="icon-font-color" className='m-10 font-size-lg' /></span>
        <span><IconFont type="icon-code-inline" className='m-10 font-size-lg' /></span>
        <span><IconFont type="icon-list-order" className='m-10 font-size-lg' /></span>
        <span><IconFont type="icon-strikethrough" className='m-10 font-size-lg' /></span>
        <span><IconFont type="icon-table" className='m-10 font-size-lg' /></span>
        <span><IconFont type="icon-text-align-left" className='m-10 font-size-lg' /></span>
        <span><IconFont type="icon-painter" className='m-10 font-size-lg' /></span>
        <span><IconFont type="icon-link-break" className='m-10 font-size-lg' /></span>
        <span>
          <IconFont
            type="icon-italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? 'is-active m-10 font-size-lg' : 'm-10 font-size-lg'}
          />
        </span>
        <span><IconFont type="icon-text-align-left" className='m-10 font-size-lg' /></span>
        <Upload beforeUpload={() => false} onChange={handleFileChange}>
          <Button>Upload Word Document</Button>
        </Upload>
      </div>
    );
  };

  return (
    <>
      <MenuBar />
      <EditorContent className='p-24 ' editor={editor} />
      <div className="footer shadow flex-r-center-center" style={{ height: '50px' }}>
        <Button className='b-rd-6 m-r-10' type="primary">
          导出
        </Button>
        <Button className='b-rd-6 bg-color-black text-color-white'>
          复制
        </Button>
      </div>
    </>
  );
};

export default Tiptap;
