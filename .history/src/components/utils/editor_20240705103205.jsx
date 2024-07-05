

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
    '//at.alicdn.com/t/c/font_4248113_50b1fudr2rb.js'
  ],
});

import { Button, Upload } from 'antd';
const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  Markdown,
  Table,
  TableCell,
  TableHeader,
  TableRow,
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
    History: {
      depth: 10,
    },
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

  const [lineHeight, setLineHeight] = useState('2')
  // const [pdfContent, setPdfContent] = useState('');
  const [formatToApply, setFormatToApply] = useState(null);
  const [colorS, setColorS] = useState('black');
  const [currentIcon, setCurrentIcon] = useState('heading1');
  const [open, setOpen] = useState(false);
  const [openCopy, setOpenCopy] = useState(false);
  const editor = useEditor({
    extensions,
    content,
    onTransaction: ({ editor }) => {
      const selection = editor.state.selection
      const from = selection.$from
      const to = selection.$to
      if (from.sameParent(to)) {
        const parent = from.parent
        if (parent.type.name === 'heading') {
          const level = parent.attrs.level
          setCurrentIcon(`heading${level}`)
        } else {
          setCurrentIcon('text')
        }
      }
    }

  })

 useEffect(()=>{
 


 })

 
 
  // const handleFormatBrushClick = () => {
  //   const selection = editor.view.state.selection;
  //   // const from = selection.$from;
  //   // const to = selection.$to;

    const handleOpenChange = (newOpen) => {
  
        setOpen(newOpen);
     
      
    };
    const handleOpenChangeCopy = (newOpenCopy) => {
  
        setOpenCopy(newOpenCopy);
     
    };


  const applyLineHeight = () => {
    console.log(lineHeight)
    editor.chain().focus().setLineHeight(lineHeight).run()
  }
  //     const from = range.from;
  //     const $from = editor.view.state.doc.resolve(from);
  //     console.log('marks:', $from.marks());

  //     if (marks.length > 0) {
  //       const mark = marks[0]; // 假设第一个 mark 是我们需要的格式信息
  //       console.log('保存的格式信息:', mark.type.name); // 打印保存的格式信息
  //       setFormatToApply(mark.type.name); // 记录需要应用的格式类型名称
  //     } else {
  //       console.log('没有找到标记');
  //     }
  //   }
  // };
  // const handleFormatBrushClick = () => {
  //   // 获取当前选区
  //   const selection = editor.view.state.selection;

  //   // 如果没有选区，则不处理


  //   // 获取选区中的所有标记

  //   console.log(selection.ranges)
  //   // 从选区开始位置获取标记
  //   //   const from = selection.ranges[0].from;
  //   //   const $from = editor.view.state.doc.resolve(from);
  //   //   console.log($from.marks())


  //   // // 在这里，你可以使用marks数组来更新你的组件状态或执行其他操作
  //   // console.log(marks);

  //   // 示例：假设你有一个状态变量来存储标记
  //   // setMarks(marks);
  // };

  const applyFormat = () => {
    if (formatToApply) {
      console.log("应用格式")
      editor.chain().focus().toggleMark(formatToApply).run();
      setFormatToApply(null); // 应用后清除格式信息
    } else {
      console.log("保存格式")
      handleFormatBrushClick()
    }
  };
  const hide = (index) => {
    console.log(index)
    editor.chain().focus().toggleHeading({ level: index }).run()
    setCurrentIcon(icons[index])
    setOpen(false);
  };
  const hideCopy = (index) => {
    console.log(index)
    editor.chain().focus().toggleHeading({ level: index }).run()
    setCurrentIcon(icons[index])
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

  const MenuBar = () => {
    console.log("经过")


    if (!editor) {
      console.log("根本没有")
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
            className={editor.isActive('bold') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
          <IconFont type="icon-font-color" className='m-10 font-size-lg' style={{ color: colorS }} />
          <IconFont onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={editor.isActive('codeBlock') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} type="icon-code-inline" />
          <Popover placement="bottom" content={contentPop} trigger="click"
            open={open}
            onOpenChange={handleOpenChange}>
            <IconFont type={`icon-${currentIcon}`} className='m-10 font-size-lg' />
          </Popover>
          <IconFont type="icon-strikethrough" onClick={() => editor.chain().focus().toggleStrike().run()} className={editor.isActive('strike') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
{/*          
          <Popover placement="bottom"
            content={<>
           <IconFont type="icon-table-add" className='m-10 font-size-lg'onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
           <IconFont type="icon-table-remove" className='m-10 font-size-lg' onClick={() => editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()} />
           <IconFont type="icon-add-column" className='m-10 font-size-lg' onClick={() => editor.chain().focus().addColumnAfter().run()} />
           <IconFont type="icon-delete-column" className='m-10 font-size-lg' onClick={() => editor.chain().focus().deleteColumn().run()} />
           <IconFont type="icon-add-row" className='m-10 font-size-lg' onClick={() => editor.chain().focus().addRowAfter().run()} />
           <IconFont type="icon-delete-row" className='m-10 font-size-lg' onClick={editor.chain().focus().deleteRow().run()} />
          
            </>}
            trigger="click"
            open={openCopy}
            onOpenChange={handleOpenChangeCopy}
          >
           <IconFont type="icon-table" className='m-10 font-size-lg'  />
          </Popover> */}
          <IconFont type="icon-text-align-left" className='m-10 font-size-lg' />
          {/* 格式刷按钮 */}
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
            className={editor.isActive('italic') ? `${classes.isActive} m-10 font-size-lg` : 'm-10 font-size-lg'} />
          <IconFont type="icon-more-grid-big" onClick={applyLineHeight} className='m-10 font-size-lg' />
          <IconFont type="icon-swatches-palette" className='m-10 font-size-lg' />


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