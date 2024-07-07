

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Table } from '@tiptap/extension-table'
import { Markdown } from 'tiptap-markdown'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect, useState } from 'react'
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import mammoth from 'mammoth';
import { TextAlign } from '@tiptap/extension-text-align'
import { createFromIconfontCN } from '@ant-design/icons';
import classes from "./editor.module.scss";
import { useStorage } from "web-localstorage-plus";
import { Popover } from 'antd'
import { Highlight } from '@tiptap/extension-highlight'
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
    '//at.alicdn.com/t/c/font_4248113_50b1fudr2rb.js'
  ],
});

import { Button, Upload } from 'antd';
import { current } from '@reduxjs/toolkit'
const extensions = [
  Color.configure({
    types: [TextStyle.name, ListItem.name], keepMarks: true,

  }),
  TextStyle.configure({ types: [ListItem.name], keepMarks: true, }),
  Highlight.configure({
    multicolor: true,
  }),

  Markdown,
  Table,
  TableCell,
  TableHeader,
  TableRow,
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    keepMarks: true,
  }),
  LineHeight.configure({
    keepMarks: true,
  }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
    history: {
      depth: 10,
    },
    heading: {
     
      levels: [1, 2, 3],
      
    }
  }),
];
const icons = ['text', 'heading1', 'heading2', 'heading3']
const content = `
# 库存清单

## 库存详情

### 序号、品名、单位及库存情况

| 序号    | 品名    | 单位    | 入库总计    | 出库总计    | 现有库存 |
| --- | --- | --- | --- | --- | --- |
| 1    | 物品A    | 个    | 1100    | 50    | 1050 |
| 2    | 物品B    | 条    | 100    | 60    | 40 |
| 3    | 物品C    | 台    | 1200    | 200    | 1000 |

`
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


const Tiptap = () => {


  const editor = useEditor({
    extensions,
    content,
    onTransaction: ({ editor }) => {
      const selection = editor.state.selection;
      const from = selection.$from;
      const to = selection.$to;
      console.log("editor初始化");
      if (from.sameParent(to)) {
        const parent = from.parent;
        if (parent.type.name === 'heading') {
          const level = parent.attrs.level;
          setCurrentIcon(`heading${level}`);
        } else {
          setCurrentIcon('text');
        }
        const textAlign = parent.attrs.textAlign || 'left';
        setCurrentTextAlign(textAlign);
      }
    }

  })
  const [lineHeight, setLineHeight] = useState('2')
  // const [pdfContent, setPdfContent] = useState('');

  const [isFormatBrushActive, setIsFormatBrushActive] = useState(false);
  const [formatToApply, setFormatToApply] = useState(null);
  const [colorS, setColorS] = useState('black');
  const [currentIcon, setCurrentIcon] = useState('heading1');
  const [open, setOpen] = useState(false);
  const [currentTextAlign, setCurrentTextAlign] = useState('left');
  const [openCopy, setOpenCopy] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [openFour, setOpenFour] = useState(false);
  // const handleFormatBrushClick = () => {
  //   const selection = editor.view.state.selection;
  //   // const from = selection.$from;
  //   // const to = selection.$to;

  const handleOpenChange = (newOpen) => {
    console.log("标题开关")
    setOpen(newOpen);
  };
  const handleOpenChangeCopy = (newOpenCopy) => {
    console.log("表格开关")
    setOpenCopy(newOpenCopy);
  };
  const handleOpenChangeThree = (newOpenThree) => {
    console.log("对齐开关")
    setOpenThree(newOpenThree);
  };
  const handleOpenChangeFour = (newOpenFour) => {
    console.log("对齐开关")
    setOpenFour(newOpenFour);
  };



  const applyLineHeight = () => {
    console.log("应用行距")
    editor.chain().focus().setLineHeight(lineHeight).run()
  }
   // 保存格式
   const saveFormat = () => {
    console.log("格式保存")
    if (editor) {
      const { $from } = editor.state.selection;
      const marks = $from.marks();
      console.log(marks)
      if (marks.length > 0) {
        const allMarks = marks.map(mark => ({
          type: mark.type.name,
          attrs: mark.attrs,
        }));
        setFormatToApply(allMarks);
        setIsFormatBrushActive(true);
      }
    }
  };
  
  const applyFormat = () => {
    console.log("格式应用")
    if (editor && formatToApply) {
      const { from, to } = editor.state.selection;
      console.log("哈哈哈"+from,to)
    
        formatToApply.forEach(mark => {
          editor.chain().focus().setTextSelection({from: from, to: to}).toggleMark('bold').run();
        });
      
      setIsFormatBrushActive(false);
      setFormatToApply(null);
    }
  };

  // 格式刷点击处理
  const handleFormatBrushClick = () => {
    console.log("点击处理")
    if (isFormatBrushActive) {
      applyFormat();
    } else {
      saveFormat();
    }
  };

  // 双击格式刷处理
  const handleFormatBrushDoubleClick = () => {
    console.log("双击处理")
    if (isFormatBrushActive) {
      setIsFormatBrushActive(false);
      setFormatToApply(null);
    } else {
      saveFormat();
    }
  };
  const hide = (index) => {
    console.log("选择开关")

    console.log(index)
    editor.chain().focus().toggleHeading({ level: index }).run()
    setCurrentIcon(icons[index])
    setOpen(false);
  };
  const hideCopy = () => {
    console.log("选择开关2")

    setOpen(false);
  };
  const hideThree = () => {
    console.log("选择开关2")

    setOpen(false);
  };
  const hideFour = () => {
    console.log("选择开关2")
    setOpen(false);
  };


  // const handleFileUpload = async (file) => {
  //   const reader = new FileReader();
  //   reader.onload = async () => {
  //     const buffer = reader.result;
  //     const data = new Uint8Array(buffer);
  //     const pdfText = await pdfParser(data);

  //     // 获取 PDF 内容
  //     const content = pdfText.text;
  //     setPdfContent(content);

  //     // 将内容插入到编辑器中
  //     editor.chain().insertContent(content).run();
  //   };
  //   reader.readAsArrayBuffer(file);
  // };

  // const handleBeforeUpload = (file) => {
  //   handleFileUpload(file);
  //   return false; // 阻止上传
  // };
  const selectColorComplete = (colorO) => {
    console.log("选择颜色开关")
    console.log("我现在选择的颜色是" + colorO.metaColor.originalInput)
    setColorS((colorS) => { colorS = colorO.metaColor.originalInput; editor.chain().focus().setColor(colorS).run(); return colorS });
    const storage = useStorage();
    console.log(editor.storage.markdown.getMarkdown())
    storage.setItem("passage", editor.storage.markdown.getMarkdown());
  }
  const contentPop = (<>
    {icons.map((icon, index) => (
      <IconFont type={`icon-${icon}`} key={index} onClick={() => hide(index)} className={`m-10 font-size-lg`}>
      </IconFont>
    ))}
  </>
  );
  const contentPopCopy = (<>
    <IconFont type="icon-table-add" className='m-10 font-size-lg' onClick={() => { editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); hideCopy() }} />
    <IconFont type="icon-table-remove" className='m-10 font-size-lg' onClick={() => { editor.chain().focus().deleteTable({ rows: 3, cols: 3, withHeaderRow: true }).run(); hideCopy() }} />
    <IconFont type="icon-add-column" className='m-10 font-size-lg' onClick={() => { editor.chain().focus().addColumnAfter().run(); hideCopy() }} />
    <IconFont type="icon-delete-column" className='m-10 font-size-lg' onClick={() => { editor.chain().focus().deleteColumn().run(); hideCopy() }} />
    <IconFont type="icon-add-row" className='m-10 font-size-lg' onClick={() => { editor.chain().focus().addRowAfter().run(); hideCopy() }} />
    <IconFont type="icon-delete-row" className='m-10 font-size-lg' onClick={() => { editor.chain().focus().deleteRow().run(); hideCopy() }} />
  </>)
  const contentPopThree = (<>
    <IconFont type="icon-text-align-left" className='m-10 font-size-lg' onClick={() => editor.chain().focus().setTextAlign('left').run()} />
    <IconFont type="icon-text-align-center" className='m-10 font-size-lg' onClick={() => editor.chain().focus().setTextAlign('center').run()} />
    <IconFont type="icon-text-align-right" className='m-10 font-size-lg' onClick={() => editor.chain().focus().setTextAlign('right').run()} />
  </>)
  const contentPopFour = (<>
    {/* <IconFont type="icon-bg-color" className={editor.isActive('highlight') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} onClick={() => { editor.chain().focus().toggleHighlight().run(); console.log("高亮提示") }} />
    <IconFont type="icon-list-disorder" className={editor.isActive('bulletList') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} onClick={() => editor.chain().focus().toggleBulletList().run()} />
    <IconFont type="icon-clean" className='m-10 font-size-lg' onClick={() => editor.chain().focus().setTextAlign('right').run()} />
    <IconFont type="icon-double-quotes-left " className={editor.isActive('blockquote') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} onClick={() => editor.chain().focus().toggleBlockquote().run()} />
    <IconFont type="icon-image" className='m-10 font-size-lg' onClick={() => editor.chain().focus().setTextAlign('right').run()} />
    <IconFont type="icon-font" className='m-10 font-size-lg' onClick={() => editor.chain().focus().setTextAlign('right').run()} />
    <IconFont type="icon-list-order" className={editor.isActive('orderedList') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} onClick={() => editor.chain().focus().toggleOrderedList().run()} /> */}

  </>)
  const MenuBar = () => {
    console.log("菜单渲染")
    if (!editor) {
      console.log("根本没有editor")
      return null
    }
    // const handleFileChange = async (info) => {
    //   const file = info.file.originFileObj || info.file;

    //   if (file) {
    //     try {
    //       const arrayBuffer = await file.arrayBuffer();
    //       const { value: html } = await mammoth.convertToHtml({ arrayBuffer });
    //       console.log(html); // 确认生成的 HTML 内容

    //       editor.commands.setContent(html, {
    //         parseOptions: {
    //           preserveWhitespace: 'full',
    //         },
    //       });


    //       console.log('Document uploaded successfully');
    //     } catch (error) {
    //       console.error('Failed to render document');
    //       console.error(error);
    //     }
    //   }
    // };



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
            /></div>
          <IconFont type="icon-undo" onClick={() => editor.chain().focus().undo().run()} className='m-10 font-size-lg' />
          <IconFont type="icon-redo" onClick={() => editor.chain().focus().redo().run()} className='m-10 font-size-lg' />
          <IconFont type="icon-bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
          <IconFont type="icon-font-color" className='m-10 font-size-lg' style={{ color: colorS }} />
          <IconFont onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} type="icon-code-inline" />
          <Popover placement="bottom" content={contentPop} trigger="click"
            open={open}
            onOpenChange={handleOpenChange}>
            <IconFont type={`icon-${currentIcon}`} className='m-10 font-size-lg' />
          </Popover>
          <IconFont type="icon-strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />

          <Popover placement="bottom"
            content={contentPopCopy}
            trigger="click"
            open={openCopy}
            onOpenChange={handleOpenChangeCopy}
          >
            <IconFont type="icon-table" className='m-10 font-size-lg' />
          </Popover>
          <Popover
            placement="bottom"
            content={contentPopThree}
            trigger="click"
            open={openThree}
            onOpenChange={handleOpenChangeThree}
          >
            <IconFont type={`icon-text-align-${currentTextAlign}`} className='m-10 font-size-lg' />
          </Popover>
          {/* 格式刷按钮 */}
          <IconFont type="icon-painter" onClick={handleFormatBrushClick} onDoubleClick={handleFormatBrushDoubleClick} className='m-10 font-size-lg' />
          {/* 这是超链接按钮 */}
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
            className={editor.isActive('italic') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
          <IconFont type="icon-more-grid-big" onClick={applyLineHeight} className='m-10 font-size-lg' />
          <Popover
            placement="bottom"
            content={contentPopFour}
            trigger="click"
            open={openFour}
            onOpenChange={handleOpenChangeFour}
          >
            <IconFont type="icon-swatches-palette" className='m-10 font-size-lg' />
          </Popover>

          {/* <Upload beforeUpload={() => false} onChange={handleFileChange}>
            <Button>Upload Word Document</Button>
          </Upload> */}
          {/* <Upload beforeUpload={handleBeforeUpload} showUploadList={false}>
        <Button>上传 PDF</Button>
      </Upload> */}
        </div>
      </>
    )
  }

  return <>

    <MenuBar />
    <EditorContent className={`p-24 ${classes.codeBlock} `} editor={editor} />
    <div className="footer shadow flex-r-center-center" style={{ height: '50px' }}>
      <Button className='b-rd-6 m-r-10' type="primary" >
        导出
      </Button>

      <Button className='b-rd-6 bg-color-black text-color-white'>
        复制
      </Button>
    </div>

    <FloatingMenu editor={editor}>
      <div className='shadow' style={{
        background: "white"
      }}>
        <IconFont type="icon-painter" className='m-10 font-size-lg' />
      </div>
    </FloatingMenu>
    <BubbleMenu editor={editor}>
      <div className='shadow' style={{
        background: "white"
      }}>
        <IconFont type="icon-bold" className='m-10 font-size-lg' />
        <IconFont type="icon-font-color" className='m-10 font-size-lg' />
        <IconFont type="icon-yuyanfanyi" className='m-10 font-size-lg' />
        <IconFont type="icon-zhaiyao" className='m-10 font-size-lg' />
        <IconFont type="icon-wenbenrunse" className='m-10 font-size-lg' />
        <IconFont type="icon-link-break" className='m-10 font-size-lg' />

      </div>
    </BubbleMenu>
  </>
}
export default Tiptap;