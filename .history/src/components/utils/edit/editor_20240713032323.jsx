
import MenuBar from './menuBar.jsx'
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import classes from "./editor.module.scss";
import { Modal } from 'antd'
import { Transformer } from 'markmap-lib';
import aiFun from '../../../api/user/ai.js'
import { Tooltip, Select, Popover, ColorPicker } from 'antd/lib/index.js'
import { useStorage } from "web-localstorage-plus";
const { Markmap, loadCSS, loadJS } = markmap;
import * as markmap from 'markmap-view';
import { cyan, grey, green, presetPalettes, red } from '@ant-design/colors';
import { createFromIconfontCN, ExclamationCircleOutlined,UploadOutlined } from '@ant-design/icons';

import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_7balxnqm0f5.js'
  ],
});
import { Button, Upload } from 'antd';
import { useEffect, useState } from 'react'

const icons = ['text', 'heading1', 'heading2', 'heading3']


const handleMarkdownChange = () => {
  const transformer = new Transformer();

  // 1. 转换 makrdown
  const { root, features } = transformer.transform(content);

  // 2. 获取 assets 数据// either get assets required by used features
  const { styles, scripts } = transformer.getUsedAssets(features);

  // 清空markmap容器
  const container = document.getElementById('markmap-container');
  container.innerHTML = '';

  // 加载样式和脚本
  if (styles) loadCSS(styles);
  if (scripts) loadJS(scripts, { getMarkmap: () => markmap });

  // 创建并渲染markmap
  Markmap.create(container, null, root);
};

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
import { ToC } from './ToC'

const MemorizedToC = memo(ToC)
// const content=storage.getItem("document")
const Tiptap = ({ user, room, content = `# AI在智能编辑器中的应用

## 摘要

* 简要介绍AI在智能编辑器领域的应用背景、研究意义及论文的主要研究内容。

## 关键词

* AI；智能编辑器；自然语言处理；机器学习；深度学习

## 第一章 引言

### 一、研究背景与意义

* 介绍智能编辑器的概念及其发展历程。
* 阐述AI技术在智能编辑器中应用的重要性和潜力。

### 二、国内外研究现状

* 综述国内外关于AI在智能编辑器中应用的研究现状。
* 分析现有研究的不足之处及改进方向。

### 三、研究目的与主要内容

* 明确论文的研究目的和预期目标。
* 简要介绍论文的主要研究内容和结构安排。

## 第二章 AI技术基础

### 一、人工智能概述

* 简述AI技术的概念、特点和应用领域。

### 二、机器学习

* 介绍机器学习的基本原理、分类及典型算法。

### 三、深度学习

* 阐述深度学习的基本原理、模型结构及应用案例。

### 四、自然语言处理

* 介绍自然语言处理在智能编辑器中的关键作用及相关技术。

## 第三章 智能编辑器技术分析

### 一、智能编辑器的功能特
* 分析智能编辑器的核心功能和特点。
### 二、智能编辑器的技术架构
* 阐述智能编辑器的技术架构和关键技术。
### 三、智能编辑器的应用场景
* 举例说明智能编辑器在不同领域的应用场景。
## 第四章 AI在智能编辑器中的具体应用
### 一、智能语法检查与纠
* 详细介绍AI在智能语法检查与纠错方面的应用原理和方
### 二、智能推荐与提示
* 阐述AI在智能推荐和提示方面的作用及实现方式。
### 三、智能内容生成
* 介绍AI在智能内容生成方面的应用，如自动摘要、文本续写等。
### 四、其他应用案例
* 举例说明AI在智能编辑器中的其他应用案例。
## 第五章 实验设计与结果分析
### 一、实验环境与数据集
* 描述实验所使用的软硬件环境及数据集。
### 二、实验设计
* 详细介绍实验的具体步骤和方法
### 三、实验结果与分析
* 展示实验结果，并对实验结果进行分析和讨论。
## 第六章 结论与展望
### 一、研究结论
* 总结论文的主要研究内容和结论。
### 二、研究不足与展望
* 分析论文研究的不足之处，并提出未来研究方向和展望。
## 参考文献
* 列出论文引用的所有参考文献。
## 附录
* 提供论文相关的附加材料或数据。
` , editor }) => {
  const [editorContent, setEditorContent] = useState('');
  const ydoc = useMemo(() => new Y.Doc(), []);   // 使用 useMemo 保证只创建一次 provider
  console.log(room + "---------------------")
  // const provider = useMemo(() => { 
  //   console.log(room+"hhhhhhhh")
  //   return new WebsocketProvider(`ws:// http://7hnn9d.natappfree.cc/ws/${room}`, 'tttt', ydoc) 
  // }, [ydoc, room]);
  console.log("执行====")
  useEffect(() => {
    if (!editor) return;
    // console.log(editorContent+"1111111111111111111111111111-----")
    editor.commands.setContent(content)
    //  handleMarkdownChange()
    const handleTransaction = () => {
      const { selection } = editor.state;
      const { $from, $to } = selection;

      if ($from.sameParent($to)) {
        const parent = $from.parent;
        if (parent.type.name === 'heading') {
          const level = parent.attrs.level;
          setCurrentIcon(`heading${level}`);
        } else {
          setCurrentIcon('text');
        }
        const textAlign = parent.attrs.textAlign || 'left';
        setCurrentTextAlign(textAlign);

        // 检查选区的颜色
        const marks = $from.marks();
        console.log(marks)
        const colorMark = marks.find(mark => mark.attrs.color != null);
        console.log(colorMark)
        if (colorMark) {
          setColorS(colorMark.attrs.color);
        } else {
          setColorS('black'); // 默认颜色
        }
      }
    };

    editor.on('transaction', handleTransaction);

    return () => {
      editor.off('transaction', handleTransaction);
    };

  }, [editor, content]);



  const [lineHeight, setLineHeight] = useState('2')
  // const [pdfContent, setPdfContent] = useState('');
  const [level, setLevel] = useState('0');
  const [textAlign, setTextAlign] = useState('');
  const [isFormatBrushActive, setIsFormatBrushActive] = useState(false);
  const [formatToApply, setFormatToApply] = useState(null);
  const [colorS, setColorS] = useState('black');
  const [currentIcon, setCurrentIcon] = useState('heading1');
  const [open, setOpen] = useState(false);
  const [currentTextAlign, setCurrentTextAlign] = useState('left');
  const [openCopy, setOpenCopy] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [openFour, setOpenFour] = useState(false);
  const [openFive, setOpenFive] = useState(false);
  const [uniqueOpen, setUniqueOpen] = useState(false)
  const [modal, contextHolder] = Modal.useModal();
  const contentFive = (<div >
    <div className='p-6 hover-effect b-rd-6'>导出为word文档</div>
    <div className='p-6 hover-effect b-rd-6'>导出为pdf文档</div>

  </div>)

  const titleClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.titleGeneration(formData)
    console.log(res.data + "2222");

  }
  const beautificationClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.titleGeneration(formData)
    console.log(res.data + "4444");

  }
  const expansionClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.expansion(formData)
    console.log(res.data + "11 11");

  }
  const rewriteClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.rewrite(formData)
    console.log(res.data + "10 10");

  }
  const createChartClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.createChart(formData)
    console.log(res.data + "8888");

  }
  const baiduClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.baidu(formData)
    console.log(JSON.stringify(res.data) + "7777");

  }
  const outlineGenerationClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', '基于XX技术的计算机系统性能优化研究');
    formData.append('project', '08 工学 0809 计算机科学与技术类');
    formData.append('paper_type', '专科/本科(约1万字)');
    formData.append('directory_type', '一、（一）、1');
    const res = await aiFun.paperOutlineGeneration(formData)
    console.log(res.data + "6666");

  }
  const contentGenerationClick = async () => {
    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', '基于XX技术的计算机系统性能优化研究');
    formData.append('project', '08 工学 0809 计算机科学与技术类');
    formData.append('paper_type', '专科/本科(约1万字)');
    formData.append('directory_type', '一、（一）、1');
    const res = await aiFun.paperContentGeneration(formData)
    console.log(res.data + "5555");

  }
  const continuationClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    formData.append('passage', selectedText);
    const res = await aiFun.textContinuation(formData)
    console.log(res.data + "4444");

  }
  const formatClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.fixFormat(formData)
    console.log(res.data + "9999");

  }

  const summarizationClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.textSummarization(formData)
    console.log(res.data + "3333");

  }
  const correctionClick = async () => {
    //  获取选区文本内容
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    // 调用接口函数
    const res = await aiFun.textCorrection(formData)
    console.log(res.data + "1111");

  };

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
      if ($from.parent.type.name == 'heading') {
        console.log($from.parent.attrs.level)
        setLevel($from.parent.attrs.level)
      }
      console.log($from.parent.attrs.textAlign)
      setTextAlign($from.parent.attrs.textAlign);

      console.log($from.parent)

      const allMarks = marks.map(mark => ({
        type: mark.type.name,
        attrs: mark.attrs,
      }));
      setFormatToApply(allMarks);
      setIsFormatBrushActive(true);

    }
  };

  const applyFormat = () => {
    console.log("格式应用")
    if (editor) {
      const { from, to } = editor.state.selection;
      console.log("哈哈哈" + from, to)

      formatToApply.forEach(mark => {
        if (!mark.attrs == {}) {
          editor.chain().focus().setTextSelection({ from: from, to: to }).toggleMark(mark.type, mark.attrs).run();
        } else {
          editor.chain().focus().setTextSelection({ from: from, to: to }).toggleMark(mark.type).run();
        }


      });
      if (level != '') {
        console.log("nihao")
        editor.chain().focus().toggleHeading({ level: level }).run();
      }

      editor.chain().focus().setTextAlign(textAlign).run();
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
  const handleOpenChangeFive = (newOpenFive) => {
    setOpenFive(newOpenFive);
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
  const newModal = () => {
    modal.confirm({

      title: '结果',
      icon: <IconFont type='icon-jihebiaoshi21' className='font-size-lg'></IconFont>,
      content: `## 综述国内外关于AI在智能编辑器中应用的研究现状

        深入剖析当前AI在智能编辑器中应用的国内外研究现状，提炼关键进展和趋势。

        ## 分析现有研究的不足之处及改进方向

        系统梳理当前研究存在的短板，并提出针对性的改进策略和发展方向，以推动领域研究的深入。

        ## 明确论文的研究目的和预期目标

        确立本研究的核心目的和期望达成的具体目标，为后续的研究工作提供明确的指导方向。

        ## 简要介绍论文的主要研究内容和结构安排

        概括论文的主要研究议题和整体框架，使读者对论文的组织结构和核心内容有初步了解。
`,
      okText: '替换',
      cancelText: '取消',
    });
    setUniqueOpen(false)
  }

  const [fileList, setFileList] = useState([

  ]);
  const handleChange = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };
  const props = {
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange: handleChange,
    multiple: true,
  };
  return <div style={{ height: '100%' }}>

    <MenuBar
      editor={editor}
      selectColorComplete={selectColorComplete}
      currentIcon={currentIcon}
      currentTextAlign={currentTextAlign}
      colorS={colorS}
      open={open}
      contentPop={contentPop}
      contentPopCopy={contentPopCopy}
      contentPopThree={contentPopThree}
      contentPopFour={contentPopFour}
      handleOpenChange={handleOpenChange}
      openCopy={openCopy}
      handleOpenChangeCopy={handleOpenChangeCopy}
      openThree={openThree}
      handleOpenChangeThree={handleOpenChangeThree}
      openFour={openFour}
      handleOpenChangeFour={handleOpenChangeFour}
      applyLineHeight={applyLineHeight}
      handleFormatBrushClick={handleFormatBrushClick}
      handleFormatBrushDoubleClick={handleFormatBrushDoubleClick}
    />
    {/* <svg id="markmap-container" style={{ height: '400px' ,width:'400px'}}></svg> */}
    <div style={{ height: '84%', overflowY: 'auto' }}>
      <EditorContent className={`p-24 ${classes.codeBlock} `} editor={editor} />
    </div>


    <div className="footer shadow flex-r-center-center p-x-10" style={{ height: '8%', justifyContent: 'space-between' }}>


      <Tooltip placement="topLeft" title='文档权限'>
        <Select
          defaultValue="person"
          style={{
            width: 60,
          }}
          allowClear
          options={[
            {
              value: 'person',
              label: <div className='flex-c-center-center'><IconFont type="icon-suoding" className='font-size-mlg'></IconFont></div>,
            },
            {
              value: 'people',
              label: <div className='flex-c-center-center'><IconFont type="icon-gongkai" className='font-size-lg'></IconFont></div>,
            },

          ]}
        />
      </Tooltip>
      <div>
        <Popover
          trigger="click"
          open={openFive}
          content={contentFive}
          onOpenChange={handleOpenChangeFive}
        ><Button className='b-rd-6 m-r-10 m-l-300' type="primary" >
            导出
          </Button>
        </Popover>
        <Button className='b-rd-6 bg-color-black text-color-white'>
          全文复制
        </Button></div>

    </div>

    <FloatingMenu editor={editor}>
      <div className='shadow' style={{
        background: "white"
      }}>
        <IconFont type="icon-painter" className='m-10 font-size-lg' />
      </div>
    </FloatingMenu>
    <BubbleMenu editor={editor}>
    <Modal title="图片识别结果" open={true} footer={null} width={400} >
      <div className='flex-c-center-center'>
         <div className='m-t-20'>
              <Upload {...props} fileList={fileList}>
              <Button icon={<UploadOutlined />}>上传</Button>
              </Upload>
            </div>
            <div style={{height:'200px'}}>

            </div>
            <div className='flex'>
              <Button className=' m-t-30 b-rd-8 m-r-16' type='primary' >使用</Button>
              <Button className=' m-t-16 b-rd-8 bg-color-grey text-color-white' >取消</Button>
            </div>
            
        </div>
           
        </Modal>
      
      </BubbleMenu >


  </div >
}
export default Tiptap;
//  <div className='shadow flex-c-center-start' style={{
//         background: "white",
//         width: '80px',
//         height:'200px'
        
//       }}>
//         <IconFont
//         type="icon-bold"
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         disabled={!editor.can().chain().focus().toggleBold().run()}
//         className={editor.isActive('bold') ? `isActive m-10 font-size-lg` : 'm-10 font-size-lg'}
//       />
//         <IconFont type="icon-font-color" className='m-10 font-size-lg' style={{ color: colorS }} />
//         <IconFont type="icon-yuyanfanyi" className='m-10 font-size-lg' />
//         <div className='flex-r-center-center' style={{justifyContent:'space-between'}}> 
//           <IconFont type="icon-zhongxiex" onClick={rewriteClick} className='m-10 font-size-lg' />
//           <div className='font-size-sm'>重写</div>
//         </div>
//         <div className='flex-r-center-center' style={{justifyContent:'space-between'}}> 
//         <IconFont type="icon-jurassic_chart" onClick={createChartClick} className='m-10 font-size-lg' />

//           <div className='font-size-sm'>扩写</div>
//         </div>
//         <div className='flex-r-center-center' style={{justifyContent:'space-between'}}> 
//         <IconFont type="icon-neirongshengchengqi" onClick={contentGenerationClick} className='m-10 font-size-lg' />

//           <div className='font-size-sm'>总结</div>
//         </div>
//         <div className='flex-r-center-center' style={{justifyContent:'space-between'}}> 
//         <IconFont type="icon-a-nav_AImanagement" onClick={baiduClick} className='m-10 font-size-lg' />
//         <div className='font-size-sm'>校正</div>
//         </div>
//         <div className={`flex-r-center-center m-4 b-rd-6 ${classes.isActive}`} style={{justifyContent:'space-between'}}> 
//        <Popover 
//           trigger="click"
//            open={popoverOpenStates[index]}
//           open={uniqueOpen}
//           placement='left'
//           content={(
//             <div>
//               <div className='p-6 hover-effect b-rd-6' /*onClick={() => onClickCopy(record)}> 更专业</div>
//           <div className='p-6 hover-effect b-rd-6' onClick={newModal}>更正式</div> 
//           <div className='p-6 hover-effect b-rd-6'> 
//           <Cascader
//             options={options}
//             expandTrigger="hover"
//             displayRender={displayRender}
//             onChange={onChangeCopy}
//           />
//         </div>
//         <div className='p-6 hover-effect b-rd-6'>更口语</div>
//       </div>
//     )}
//     onOpenChange={() => setUniqueOpen(true)}
//   >
//     onClick={beautificationClick}
//     <IconFont type="icon-runse" className={` p-10 font-size-lg`} />
//   </Popover> 
//    <div className='font-size-sm m-r-10'>润色</div>
//         </div>
       
//         <IconFont type="icon-geshishua" onClick={formatClick} className='m-10 font-size-lg' />
//         <IconFont type="icon-xuxie" onClick={continuationClick} className='m-10 font-size-lg' />
//         <IconFont type="icon-kuoxie" onClick={expansionClick} className='m-10 font-size-lg' />
      
//         {contextHolder}
//         <IconFont type="icon-dagangshengcheng-xi" onClick={outlineGenerationClick} className='m-10 font-size-lg' />
//         <IconFont type="icon-zhaiyao1" onClick={summarizationClick} className='m-10 font-size-lg' />
//         <IconFont type="icon-piliangshengchengbiaoti" onClick={titleClick} className='m-10 font-size-mlg' />
//         <IconFont type="icon-wenbenrunse" onClick={correctionClick} className='m-10 font-size-lg' />
//         <IconFont type="icon-link-break" className='m-10 font-size-lg' />

//       </div> 