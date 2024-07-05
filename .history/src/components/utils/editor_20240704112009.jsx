import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { createFromIconfontCN } from '@ant-design/icons';
import classes from "./editor.module.scss";
import { useStorage } from "web-localstorage-plus";
import { Popover } from 'antd'
import { LineHeight } from './lineHeight.jsx'
import { cyan, grey, green, presetPalettes, red } from '@ant-design/colors';
import { Col, ColorPicker, Divider, Row, Space, theme } from 'antd';

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_g3pyx54dvee.js'
  ],
});

import { Button, Upload } from 'antd';
import { current } from '@reduxjs/toolkit'

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  LineHeight,
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    History:{
      depth: 10,
    },
  }),
];

const markdownContent = `# 库存清单

## 库存详情

### 序号、品名、单位及库存情况

| 序号    | 品名    | 单位    | 入库总计    | 出库总计    | 现有库存 |
| --- | --- | --- | --- | --- | --- |
| 1    | 物品A    | 个    | 1100    | 50    | 1050 |
| 2    | 物品B    | 条    | 100    | 60    | 40 |
| 3    | 物品C    | 台    | 1200    | 200    | 1000 |`;

const Tiptap = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const processMarkdown = async () => {
      const result = await new Promise((resolve) => {
        const markdownToHtml = <Markdown remarkPlugins={[remarkGfm]}>{markdownContent}</Markdown>;
        resolve(markdownToHtml);
      });
      setContent(result);
    };

    processMarkdown();
  }, []);

  const presets = genPresets({
    grey,
    red,
    green,
    cyan,
  });

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

  const editor = useEditor({
    extensions,
    content,
    onTransaction: ({ editor }) => {
      const selection = editor.state.selection;
      const from = selection.$from;
      const to = selection.$to;
      if (from.sameParent(to)) {
        const parent = from.parent;
        if (parent.type.name === 'heading') {
          const level = parent.attrs.level;
          setCurrentIcon(`heading${level}`);
        } else {
          setCurrentIcon('text');
        }
      }
    },
  });

  const [lineHeight, setLineHeight] = useState('2');
  const [formatToApply, setFormatToApply] = useState(null);
  const [colorS, setColorS] = useState('black');
  const [currentIcon, setCurrentIcon] = useState('heading1');
  const [open, setOpen] = useState(false);

  const applyLineHeight = () => {
    editor.chain().focus().setLineHeight(lineHeight).run();
  };

  const handleFormatBrushClick = () => {
    const selection = editor.view.state.selection;
    console.log(selection.ranges);
  };

  const applyFormat = () => {
    if (formatToApply) {
      editor.chain().focus().toggleMark(formatToApply).run();
      setFormatToApply(null);
    } else {
      handleFormatBrushClick();
    }
  };

  const hide = (index) => {
    editor.chain().focus().toggleHeading({ level: index }).run();
    setCurrentIcon(icons[index]);
    setOpen(false);
  };

  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const selectColorComplete = (colorO) => {
    setColorS(colorO.metaColor.originalInput);
    editor.chain().focus().setColor(colorS).run();
    const storage = useStorage();
    storage.setItem("passage", editor.storage.markdown.getMarkdown());
  };

  const contentPop = (
    <>
      {icons.map((icon, index) => (
        <IconFont type={`icon-${icon}`} key={index} onClick={() => hide(index)} className={`m-10 font-size-lg`}></IconFont>
      ))}
    </>
  );

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
          <IconFont type="icon-undo" onClick={() => editor.chain().focus().redo().run()} className='m-10 font-size-lg' />
          <IconFont type="icon-redo" onClick={() => editor.chain().focus().undo().run()} className='m-10 font-size-lg' />
          <IconFont type="icon-bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'}
          />
          <IconFont type="icon-font-color" className='m-10 font-size-lg' style={{ color: colorS }} />
          <IconFont onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} type="icon-code-inline" />
          <Popover placement="bottom" content={contentPop} trigger="click" open={open} onOpenChange={handleOpenChange}>
            <IconFont type={`icon-${currentIcon}`} className='m-10 font-size-lg' />
          </Popover>
          <IconFont type="icon-strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
          <IconFont type="icon-table" className='m-10 font-size-lg' />
          <IconFont type="icon-text-align-left" className='m-10 font-size-lg' />
          <IconFont type="icon-painter" onClick={applyFormat} className='m-10 font-size-lg' />
          <IconFont type="icon-link-break" className='m-10 font-size-lg' />
          <IconFont type="icon-italic"
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleItalic()
                .run()
            }
            className={editor.isActive('italic') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'}
          />
          <IconFont type="icon-more-grid-big" onClick={applyLineHeight} className='m-10 font-size-lg' />
        </div>
      </>
    );
  };

  return (
    <>
      <MenuBar />
      <EditorContent className={`p-24 ${classes.codeBlock}`} editor={editor} />
      <div className='footer shadow flex-r-center-center' style={{ height: '50px' }}>
        <Button className='b-rd-6 m-r-10' type="primary">导出</Button>
        <Button className='b-rd-6 bg-color-black text-color-white'>复制</Button>
      </div>
      <FloatingMenu editor={editor}>
        <div className='shadow' style={{ background: 'white' }}>
          <IconFont type='icon-painter' className='m-10 font-size-lg' />
        </div>
      </FloatingMenu>
      <BubbleMenu editor={editor}>
        <div className='shadow' style={{ background: 'white' }}>
          <IconFont type='icon-bold' className='m-10 font-size-lg' />
          <IconFont type='icon-font-color' className='m-10 font-size-lg' />
          <IconFont type='icon-yuyanfanyi' className='m-10 font-size-lg' />
        </div>
      </BubbleMenu>
    </>
  );
};

export default Tiptap;
