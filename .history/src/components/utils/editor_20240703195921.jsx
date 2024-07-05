import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import { Markdown } from 'tiptap-markdown';
import StarterKit from '@tiptap/starter-kit';
import React, { useState, useMemo } from 'react';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Popover, ColorPicker, Divider, Row, Col, Button } from 'antd';
import { useStorage } from 'web-localstorage-plus';
import { genPresets } from './utils'; // 自定义函数，用于生成颜色预设值和图标数组

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_gjge7p68k3f.js'
  ],
});

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Markdown,
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

const icons = ['text', 'heading1', 'heading2', 'heading3'];

const content = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`;

const Tiptap = () => {
  const presets = useMemo(() => genPresets({ grey, red, green, cyan }), []);
  const [colorS, setColorS] = useState('black');
  const [currentIcon, setCurrentIcon] = useState('heading1');
  const [open, setOpen] = useState(false);
  const editor = useEditor({
    extensions,
    content,
  });

  // 处理颜色选择完成事件
  const selectColorComplete = (colorO) => {
    const selectedColor = colorO.metaColor.originalInput;
    setColorS(selectedColor);
    editor.chain().focus().setColor(selectedColor).run();
    const storage = useStorage();
    storage.setItem("passage", editor.storage.markdown.getMarkdown());
  };

  // 切换标题级别或文本样式
  const hide = (index) => {
    editor.chain().focus().toggleHeading({ level: index }).run();
    setCurrentIcon(icons[index]);
    setOpen(false);
  };

  // 处理弹出菜单打开状态变化
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  // 自定义颜色选择面板渲染函数
  const customPanelRender = (_, { components: { Picker, Presets } }) => (
    <Row className='colorPickerFrame' justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider
        type="vertical"
        style={{
          height: 'auto',
        }}
      />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  // 渲染图标菜单内容
  const contentPop = (
    <>
      {icons.map((icon, index) => (
        <IconFont type={`icon-${icon}`} key={index} onClick={() => hide(index)} className={`m-10 font-size-lg`} />
      ))}
    </>
  );

  // 渲染菜单栏
  const MenuBar = () => {
    if (!editor) {
      return null;
    }

    return (
      <>
        <div className={`upper-frame bg-color-blue flex-center-center shadow`} style={{ height: '50px' }}>
          <div className='position-absolute' style={{ opacity: 0, left: 192 }}>
            <ColorPicker
              defaultValue='grey'
              onChangeComplete={selectColorComplete}
              styles={{
                popupOverlayInner: {
                  width: 480,
                },
              }}
              presets={presets}
              panelRender={customPanelRender}
            />
          </div>
          <IconFont type="icon-undo" className='m-10 font-size-lg' />
          <IconFont type="icon-redo" className='m-10 font-size-lg' />
          <IconFont
            type="icon-bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive('bold') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'}
          />
          <IconFont type="icon-font-color" className='m-10 font-size-lg' style={{ color: colorS }} />
          <IconFont
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive('codeBlock') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'}
            type="icon-code-inline"
          />
          <Popover placement="bottom" content={contentPop} trigger="click" open={open} onOpenChange={handleOpenChange}>
            <IconFont type={`icon-${currentIcon}`} className='m-10 font-size-lg' />
          </Popover>
          <IconFont type="icon-strikethrough" className='m-10 font-size-lg' />
          <IconFont type="icon-table" className='m-10 font-size-lg' />
          <IconFont type="icon-text-align-left" className='m-10 font-size-lg' />
          <IconFont type="icon-painter" className='m-10 font-size-lg' />
          <IconFont type="icon-link-break" className='m-10 font-size-lg' />
          <IconFont
            type="icon-italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive('italic') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'}
          />
          <IconFont type="icon-text-align-left" className='m-10 font-size-lg' />
        </div>
      </>
    );
  };

  return (
    <>
      <MenuBar />
      <EditorContent className={`p-24 ${classes.codeBlock} `} editor={editor} />
      <div className="footer shadow flex-r-center-center" style={{ height: '50px' }}>
        <Button className='b-rd-6 m-r-10' type="primary">
          导出
        </Button>
        <Button className='b-rd-6 bg-color-black text-color-white'>
          复制
        </Button>
      </div>
      <FloatingMenu editor={editor}>
        <div className='shadow' style={{ background: "white" }}>
          <IconFont type="icon-painter" className='m-10 font-size-lg' />
        </div>
      </FloatingMenu>
      <BubbleMenu editor={editor}>
        <div className='shadow' style={{ background: "white" }}>
          <IconFont type="icon-bold" className='m-10 font-size-lg' />
          <IconFont type="icon-font-color" className='m-10 font-size-lg' />
          <IconFont type="icon-yuyanfanyi" className='m-10 font-size-lg' />
          <IconFont type="icon-zhaiyao" className='m-10 font-size-lg' />
          <IconFont type="icon-wenbenrunse" className='m-10 font-size-lg' />
          <IconFont type="icon-link-break" className='m-10 font-size-lg' />
        </div>
      </BubbleMenu>
    </>
  );
};

export default Tiptap;
