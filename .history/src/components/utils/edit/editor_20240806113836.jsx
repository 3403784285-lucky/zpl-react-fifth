
import MenuBar from './menuBar.jsx'
import { SlackOutlined, TranslationOutlined, CaretRightOutlined, BuildOutlined, RadarChartOutlined, ApiFilled, ContainerOutlined, AndroidOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import classes from "./editor.module.scss";
import { Modal, Spin, Cascader, Layout, Menu, message } from 'antd'
import aiFun from '../../../api/user/ai.js'
import { Tooltip, Select, Popover, ColorPicker } from 'antd/lib/index.js'
import { useStorage } from "web-localstorage-plus";

import { cyan, grey, green, presetPalettes, red } from '@ant-design/colors';
import { createFromIconfontCN, ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_6bsmqu142h.js'
  ],
});
const { Header, Footer, Sider, Content } = Layout;
import { Button, Upload } from 'antd';
import { useEffect, useState } from 'react'
import { setEditor, setItemsState } from "../../../store";
import { useDispatch } from 'react-redux';
import Extraction from '../../../pages/ai/extraction.jsx';
import Dictionary from '../../../pages/ai/dictionary.jsx';
import { toggleHeader } from '@tiptap/pm/tables';
import Generation from '../../../pages/ai/generation.jsx';
import fileFun from '../../../api/user/file.js';
import Polishing from '../../../pages/ai/polish.jsx';
import MyExample from '../../../pages/myExample.jsx';
import AiHelper from '../../../pages/ai/aiHelper.jsx';
import PassageComment from '../../../pages/ai/PassageComment.jsx';
import Picture from '../../../pages/ai/picture.jsx';
import { head } from 'lodash';
const icons = ['text', 'heading1', 'heading2', 'heading3']
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
// const content=storage.getItem("document")
const Tiptap = ({ content, editor = {} }) => {

  const contentFive = (<div >
    <div className='p-6 hover-effect b-rd-6' >导出为word文档</div>
    <div className='p-6 hover-effect b-rd-6'>导出为pdf文档</div>
  </div>)
  const [current, setCurrent] = useState(1);
  const onClickMenu = (e) => {
    setCurrent(e.key)
  }


  const [lineHeight, setLineHeight] = useState(1)
  const [lineCurrentHeight, setLineCurrentHeight] = useState(1)
  // const [pdfContent, setPdfContent] = useState('');
  const [level, setLevel] = useState('0');
  const storage = useStorage();

  const [textAlign, setTextAlign] = useState('');
  const [isFormatBrushActive, setIsFormatBrushActive] = useState(false);
  const [formatToApply, setFormatToApply] = useState(null);
  const [formatToApplyCopy, setFormatToApplyCopy] = useState(null);
  const [colorS, setColorS] = useState('black');
  const [currentIcon, setCurrentIcon] = useState('heading1');
  const [open, setOpen] = useState(false);
  const [currentTextAlign, setCurrentTextAlign] = useState('left');
  const [openCopy, setOpenCopy] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [openFour, setOpenFour] = useState(false);
  const [openFive, setOpenFive] = useState(false);
  const [uniqueOpen, setUniqueOpen] = useState(false)
  const [shrink, setShrink] = useState(false)
  let timerUnique = null
  const [fontSize, setFontSize] = useState("16")
  const [currentFamily, setCurrentFamily] = useState("")
  const [power, setPower] = useState("person")
  const [fontFamily, setFontFamily] = useState("Inter")
  const [currentSize, setCurrentSize] = useState("")
  const [fontFamilyH1Value, setFontFamilyH1Value] = useState('Inter');
  const [fontFamilyH2Value, setFontFamilyH2Value] = useState('Inter');
  const [fontFamilyH3Value, setFontFamilyH3Value] = useState('Inter');
  const [fontFamilyH4Value, setFontFamilyH4Value] = useState('Inter');
  const [fontSizeH1Value, setFontSizeH1Value] = useState(16); // Default font size
  const [fontSizeH2Value, setFontSizeH2Value] = useState(16); // Default font size
  const [fontSizeH3Value, setFontSizeH3Value] = useState(16); // Default font size
  const [fontSizeH4Value, setFontSizeH4Value] = useState(16); // Default font size
  const [lineHeightH1Value, setLineHeightH1Value] = useState('1.5');
  const [lineHeightH2Value, setLineHeightH2Value] = useState('1.5');
  const [lineHeightH3Value, setLineHeightH3Value] = useState('1.5');
  const [lineHeightH4Value, setLineHeightH4Value] = useState('1.5');
  const [uniqueOpenCopy, setUniqueOpenCopy] = useState(false)
  const toggleSize = () => {
    setShrink(true)
  }
  let isSaving = false;
  const saveContent = async () => {
    message.info("保存中...")
    const content = editor.getHTML(); // 获取编辑器内容
    console.log(content + "haha")
    try {
      const res = await fileFun.update(storage.getItem("documentId"), { content: content, userId: storage.getItem("openid") })
      console.log(res.data)
    } catch {

    } finally {
      if (isSaving) {
        message.success("保存成功")
        isSaving = false;
      } else {
        message.success("已自动保存")
      }
    }



  };
  const saveContentCopy = () => {
    isSaving = true;
    saveContent();
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault(); // 阻止默认的保存操作
        saveContentCopy(); // 执行保存操作
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);
  useEffect(() => {
    const saveInterval = setInterval(saveContent, 300000); // 每五分钟保存一次
    return () => clearInterval(saveInterval);
  }, [editor]);
  const [spin, setSpin] = useState(false)
  const [modal, contextHolder] = Modal.useModal();
  const [chartType, setChartType] = useState(null); // 用于存储当前选中的图表类型
  useEffect(() => {
    if (!editor) return;

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
        // console.log(marks)
        const colorMark = marks.find(mark => mark.attrs.color != null);
        let size = marks.find(mark => mark.attrs.fontSize != null);
        const family = marks.find(mark => mark.attrs.fontFamily != null);
        const line = marks.find(mark => mark.attrs.lineHeight != null);

        // console.log(colorMark)
        if (colorMark) {
          setColorS(colorMark.attrs.color);
        } else {
          setColorS('black'); // 默认颜色
        }
        if (size) {

          setFontSize(size.attrs.fontSize);

        } else {
          setFontSize("16"); // 默认颜色
        }
        if (family) {
          setFontFamily(family.attrs.fontFamily);
        } else {
          setFontFamily("Inter"); // 默认颜色
        }
        if (line) {
          setLineHeight(line.attrs.lineHeight);
        } else {
          setLineHeight(1); // 默认颜色
        }
      }
    };
    editor.on('transaction', handleTransaction);
    return () => {
      editor.off('transaction', handleTransaction);
    };
  }, [editor, content]);
  // const handleChartTypeChange = async (type) => {
  //   setChartType(type);

  //   // 模拟请求数据，实际项目中根据需要替换成实际请求
  //   const data = await fetchDataAskChart(type);

  //   // 渲染图表
  //   renderChart(data);
  // };

  // const fetchDataAskChart = async (type) => {
  //   // 根据选项type发送请求获取数据，这里用setTimeout模拟异步请求
  //   return new Promise(resolve => {
  //     setTimeout(() => {
  //       // 模拟返回的数据，实际根据后端返回的格式来处理
  //       const data = {
  //         // 根据type不同返回不同的数据格式
  //         xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //         series: [
  //           {
  //             name: 'Sales',
  //             type: type === 'bar' ? 'bar' : (type === 'line' ? 'line' : 'pie'),
  //             data: [120, 200, 150, 80, 70, 110, 130]
  //           }
  //         ]
  //       };
  //       resolve(data);
  //     }, 500); // 模拟延迟
  //   });
  // };




  const titleClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    // 创建FormData对象
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.titleGeneration(formData)
    console.log(res.data + "2222");
  }
  const polishClick = async (value) => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    editor.commands.focus('end')
    setU()


    // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = modal.info({
      title: '生成中',
      icon: null, // 可以根据需要设置一个加载中的图标
      content: (
        <div className="generating-content">
          <p>文字动画正在生成中...</p> {/* 这里可以放置彩色流动效果的CSS动画 */}
        </div>
      ),
      okButtonProps: { disabled: true }, // 禁用模态框的确认按钮，避免用户操作
    });


    const formData = new FormData();
    console.log(selectedText)
    formData.append('text', selectedText);
    formData.append('requirement', value);
    const res = await aiFun.textBeautification(formData)
    generatingModal.destroy();

    if (res.code == 200) {
      // 关闭生成中的模态框

      // 显示结果模态框，并逐字输出结果
      const resultModal = modal.confirm({
        title: '润色结果',
        icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
        content: (
          <div className="result-content">
            {/* 使用状态来控制逐字显示 */}
            <p id="result-text"></p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(res.data).run();
        },
        onCancel() {
          clearInterval(timerUnique)
        }
      });

      // 开始逐字显示结果
      await startAnimation(resultModal, res.data);
    }



  }

  const rewriteClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = modal.info({
      title: '生成中',
      icon: null, // 可以根据需要设置一个加载中的图标
      content: (
        <div className="generating-content">
          <p>文字动画正在生成中...</p> {/* 这里可以放置彩色流动效果的CSS动画 */}
        </div>
      ),
      okButtonProps: { disabled: true }, // 禁用模态框的确认按钮，避免用户操作
    });


    const formData = new FormData();
    formData.append('text', selectedText);

    // 发起重写请求
    const res = await aiFun.rewrite(formData);
    generatingModal.destroy();

    // console.log(res.data);
    if (res.code == 200) {
      // 关闭生成中的模态框

      // 显示结果模态框，并逐字输出结果
      const resultModal = modal.confirm({
        title: '重写结果',
        icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
        content: (
          <div className="result-content">
            {/* 使用状态来控制逐字显示 */}
            <p id="result-text"></p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(res.data).run();
        },
        onCancel() {
          clearInterval(timerUnique)

        }
      });

      // 开始逐字显示结果
      await startAnimation(resultModal, res.data);
    }


  };
  const correctionClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    const generatingModal = modal.info({
      title: '生成中',
      icon: null, // 可以根据需要设置一个加载中的图标
      content: (
        <div className="generating-content">
          <p>文字动画正在生成中...</p> {/* 这里可以放置彩色流动效果的CSS动画 */}
        </div>
      ),
      okButtonProps: { disabled: true }, // 禁用模态框的确认按钮，避免用户操作
    });



    // 关闭生成中的模态框

    const formData = new FormData();
    formData.append('text', selectedText);
    // 调用接口函数
    const res = await aiFun.textCorrection(formData)
    generatingModal.destroy();

    // 显示生成中的模态框，使用CSS动画来模拟生成中的效果 
    if (res.code == 200) {
      const resultModal = modal.confirm({
        title: '校正结果',
        icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
        content: (
          <div className="result-content">
            {/* 使用状态来控制逐字显示 */}
            <p id="result-text"></p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(res.data).run();
        },
        onCancel() {
          clearInterval(timerUnique)

        }
      });

      // 开始逐字显示结果
      await startAnimation(resultModal, res.data);
    }
    // 显示结果模态框，并逐字输出结果


  };

  const continuationClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = modal.info({
      title: '生成中',
      icon: null, // 可以根据需要设置一个加载中的图标
      content: (
        <div className="generating-content">
          <p>文字动画正在生成中...</p> {/* 这里可以放置彩色流动效果的CSS动画 */}
        </div>
      ),
      okButtonProps: { disabled: true }, // 禁用模态框的确认按钮，避免用户操作
    });



    const formData = new FormData();
    formData.append('text', selectedText);
    formData.append('passage', selectedText);
    const res = await aiFun.textContinuation(formData)
    // 关闭生成中的模态框
    generatingModal.destroy();
    if (res.code == 200) {
      // 显示结果模态框，并逐字输出结果
      const resultModal = modal.confirm({
        title: '续写结果',
        icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
        content: (
          <div className="result-content">
            {/* 使用状态来控制逐字显示 */}
            <p id="result-text"></p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(res.data).run();
        },
        onCancel() {
          clearInterval(timerUnique)

        }
      });

      // 开始逐字显示结果
      await startAnimation(resultModal, res.data);
    }



  };
  const expansionClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

    // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = modal.info({
      title: '生成中',
      icon: null, // 可以根据需要设置一个加载中的图标
      content: (
        <div className="generating-content">
          <p>文字动画正在生成中...</p> {/* 这里可以放置彩色流动效果的CSS动画 */}
        </div>
      ),
      okButtonProps: { disabled: true }, // 禁用模态框的确认按钮，避免用户操作
    });

    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.expansion(formData)
    // console.log(res.data);

    // 关闭生成中的模态框
    generatingModal.destroy();
    if (res.code == 200) {
      // 显示结果模态框，并逐字输出结果
      const resultModal = modal.confirm({
        title: '扩写结果',
        icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
        content: (
          <div className="result-content">
            {/* 使用状态来控制逐字显示 */}
            <p id="result-text"></p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(res.data).run();
        },
        onCancel() {
          clearInterval(timerUnique)

        }
      });

      // 开始逐字显示结果
      await startAnimation(resultModal, res.data);
    }
  

};
const summarizationClick = async () => {
  const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

  // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
  const generatingModal = modal.info({
    title: '生成中',
    icon: null, // 可以根据需要设置一个加载中的图标
    content: (
      <div className="generating-content">
        <p>文字动画正在生成中...</p> {/* 这里可以放置彩色流动效果的CSS动画 */}
      </div>
    ),
    okButtonProps: { disabled: true }, // 禁用模态框的确认按钮，避免用户操作
  });

  const formData = new FormData();
  formData.append('text', selectedText);
  const res = await aiFun.textSummarization(formData)
  // 关闭生成中的模态框
  generatingModal.destroy();
  if (red.code == 200) {
    // 显示结果模态框，并逐字输出结果
    const resultModal = modal.confirm({
      title: '总结结果',
      icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
      content: (
        <div className="result-content">
          {/* 使用状态来控制逐字显示 */}
          <p id="result-text"></p>
        </div>
      ),
      okText: '替换',
      cancelText: '弃用',
      onOk() {
        // 替换编辑器中的选中内容为生成的结果
        editor.chain().focus().deleteSelection().insertContent(res.data).run();
      },
      onCancel() {
        clearInterval(timerUnique)

      }
    });

    // 开始逐字显示结果
    await startAnimation(resultModal, res.data);
  }


};

// 异步函数，用于逐字逐字显示动画
async function startAnimation(resultModal, text) {
  return new Promise(resolve => {
    let currentIndex = 0;
    const timerCopy = setInterval(() => {
      // console.log("定时器执行")
      if (currentIndex < text.length) {
        const resultTextElement = document.getElementById('result-text');
        resultTextElement.textContent += text[currentIndex]; // 逐字添加到显示元素中
        currentIndex++;
      } else {
        clearInterval(timerCopy);
        // 可选：显示一个“完成”或者其他提示
        resultModal.update({
          okButtonProps: { disabled: false } // 可以启用确认按钮
        });
        resolve();
      }
    }, 100); // 控制文字输出的速度，可以根据需要调整
    timerUnique = timerCopy
  });
}

const createChartClick = async () => {
  const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
  // 创建FormData对象
  const formData = new FormData();
  formData.append('text', selectedText);
  const res = await aiFun.createChart(formData)
  console.log(res.data + "8888");
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

const formatClick = async () => {
  const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
  const formData = new FormData();
  formData.append('text', selectedText);
  const res = await aiFun.fixFormat(formData)
  console.log(res.data + "9999");
}


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
    setCurrentFamily($from.parent.attrs.fontFamily)
    setCurrentSize($from.parent.attrs.fontSize)
    setLineCurrentHeight($from.parent.attrs.lineHeight)
    console.log($from.parent)
    const allMarks = marks.map(mark => ({
      type: mark.type.name,
      attrs: mark.attrs,
    }));
    setFormatToApply(allMarks);
    setIsFormatBrushActive(true);
  }
};
const saveFormatCopy = () => {
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
    setCurrentFamily($from.parent.attrs.fontFamily)
    setCurrentSize($from.parent.attrs.fontSize)
    setLineCurrentHeight($from.parent.attrs.lineHeight)
    console.log($from.parent)
    const allMarks = marks.map(mark => ({
      type: mark.type.name,
      attrs: mark.attrs,
    }));
    setFormatToApplyCopy(allMarks);
    setIsFormatBrushActive(true);
  }
};
const emptyFormat = () => {
  saveFormatCopy()
  if (editor) {
    const { from, to } = editor.state.selection;
    console.log("哈哈哈" + from, to)

    formatToApplyCopy.forEach(mark => {
      if (!mark.attrs == {}) {
        editor.chain().focus().setTextSelection({ from: from, to: to }).toggleMark(mark.type, {}).run();
      } else {
        editor.chain().focus().setTextSelection({ from: from, to: to }).toggleMark(mark.type).run();
      }
    });

    if (level != '') {
      console.log("nihao")
      editor.chain().focus().toggleNode("heading", "paragraph").run();
    }
    editor.chain().focus().setTextAlign("left").run();
    editor.chain().focus().setFontFamily(currentFamily).run();
    editor.chain().focus().setFontSize(currentSize).run();
    editor.chain().focus().setLineCurrentHeight(lineCurrentHeight).run();
    setFormatToApplyCopy(null);
  }

}
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
    editor.chain().focus().setFontFamily(currentFamily).run();
    editor.chain().focus().setFontSize(currentSize).run();
    editor.chain().focus().setLineHeight(lineCurrentHeight).run();

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
  if (index == 0) {
    editor.chain().focus().toggleNode("heading", "paragraph").run()

  } else editor.chain().focus().toggleHeading({ level: 1 }).run()
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
const itemThrees = [

  {
    key: 1,
    icon: <RadarChartOutlined />,
    title: '信息提取'
  },
  {
    key: 2,
    icon: <TranslationOutlined />,
    title: '编写边搜'
  },
  {
    key: 3,
    icon: <IconFont type='icon-lishijilu' className='font-size-lg'></IconFont>,
    title: '历史记录'
  },
  {
    key: 4,
    icon: <IconFont type='icon-zhinengpaibansel' className='font-size-lg'></IconFont>,
    title: '智能排版'
  },
  {
    key: 5,
    icon: <IconFont type='icon-wodesucai' className='font-size-lg'></IconFont>,
    title: '我的素材'
  },
  {
    key: 6,
    icon: <IconFont type='icon-AIzhushou' className='font-size-lg'></IconFont>,
    title: 'ai助手'
  },
  {
    key: 7,
    icon: <IconFont type='icon-pingzhujiao' className='font-size-mlg'></IconFont>,
    title: '论文评审'
  },
  {
    key: 8,
    icon: <IconFont type='icon-fanganzhiding' className='font-size-lg'></IconFont>,
    title: '思维导图生成'
  },
]
const selectColorComplete = (colorO) => {
  console.log("选择颜色开关")
  console.log("我现在选择的颜色是" + colorO.metaColor.originalInput)
  setColorS((colorS) => { colorS = colorO.metaColor.originalInput; editor.chain().focus().setColor(colorS).run(); return colorS });
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
  {
    uid: '1',
    name: 'tip.png',
    status: 'done',
    url: 'http://www.baidu.com/xxx.png',
  },
]);
const pictureClick = (data) => {
  setUCopy()
  // 显示生成中的模态框
  const generatingModal = modal.info({
    title: '生成中',
    icon: null,
    content: (
      <div className="generating-content">
        <p>文字动画正在生成中...</p>
      </div>
    ),
    okButtonProps: { disabled: true },
  });

  // 设置定时器，1秒后销毁模态框并插入内容
  const timer = setTimeout(() => {
    generatingModal.destroy(); // 销毁模态框

    // 在编辑器中插入内容
    editor.chain().focus().insertContent({
      type: 'echartsNode',
      attrs: { data },
    }).run();
  }, 1000);

  // 清除定时器应该在插入内容后执行
  editor.on('chain', () => {
    clearTimeout(timer); // 清除定时器
  });
};

const translateClick = async () => {
  const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;

  // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
  const generatingModal = modal.info({
    title: '生成中',
    icon: null, // 可以根据需要设置一个加载中的图标
    content: (
      <div className="generating-content">
        <p>文字动画正在生成中...</p> {/* 这里可以放置彩色流动效果的CSS动画 */}
      </div>
    ),
    okButtonProps: { disabled: true }, // 禁用模态框的确认按钮，避免用户操作
  });

 
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.translate(formData)
    console.log(res.data);

    // 关闭生成中的模态框
    generatingModal.destroy();
if(res.code===200){
   // 显示结果模态框，并逐字输出结果
    const resultModal = modal.confirm({
      title: '翻译结果',
      icon: <IconFont type='icon-jihebiaoshi21'></IconFont>,
      content: (
        <div className="result-content">
          {/* 使用状态来控制逐字显示 */}
          <p id="result-text"></p>
        </div>
      ),
      okText: '替换',
      cancelText: '弃用',
      onOk() {
        // 替换编辑器中的选中内容为生成的结果
        editor.chain().focus().deleteSelection().insertContent(res.data).run();
      },
      onCancel() {
        clearInterval(timerUnique)
        console.log("我这是在清空")

      }
    });

    // 开始逐字显示结果
    await startAnimation(resultModal, res.data);
}
   
  
};


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
const setU = (newOpen) => {
  setUniqueOpen(newOpen)
}
const setUCopy = (newOpenCopy) => {
  setUniqueOpenCopy(newOpenCopy)

}
const handleApplyStylesOften = () => {


  // if (!editor) return;

  // // 获取编辑器当前状态
  const { state, chain } = editor;

  // 创建一个数组，用于存储所有级别为 1 的标题节点的位置
  const headingPositions0 = [];
  const headingPositions1 = [];
  const headingPositions2 = [];
  const headingPositions3 = [];


  state.doc.descendants((node, pos) => {
    let level = node.attrs.level;
    let name = node.type.name;
    if (name == 'heading') {
      if (level == 1) {
        headingPositions1.push({ from: pos, to: pos + node.nodeSize });
      } else if (level == 2) {
        headingPositions2.push({ from: pos, to: pos + node.nodeSize });
      } else if (level == 3)
        headingPositions3.push({ from: pos, to: pos + node.nodeSize });

    } {

      headingPositions0.push({ from: pos, to: pos + node.nodeSize });
    }
  });



  // 添加 mark 来设置字体大小
  headingPositions0.forEach(({ from, to }) => {
    editor.chain().setTextSelection({ from: from, to: to }).setFontFamily(fontFamilyH4Value).run()
    editor.chain().setTextSelection({ from: from, to: to }).setFontSize(fontSizeH4Value).run()
    editor.chain().setTextSelection({ from: from, to: to }).setLineHeight(lineHeightH4Value).run();
  });
  headingPositions1.forEach(({ from, to }) => {
    editor.chain().setTextSelection({ from: from, to: to }).setFontFamily(fontFamilyH1Value).run()
    editor.chain().setTextSelection({ from: from, to: to }).setFontSize(fontSizeH1Value).run()
    editor.chain().setTextSelection({ from: from, to: to }).setLineHeight(lineHeightH1Value).run();
  });
  headingPositions2.forEach(({ from, to }) => {
    editor.chain().setTextSelection({ from: from, to: to }).setFontFamily(fontFamilyH2Value).run()
    editor.chain().setTextSelection({ from: from, to: to }).setFontSize(fontSizeH2Value).run()
    editor.chain().setTextSelection({ from: from, to: to }).setLineHeight(lineHeightH2Value).run();
  });
  headingPositions3.forEach(({ from, to }) => {
    editor.chain().setTextSelection({ from: from, to: to }).setFontFamily(fontFamilyH3Value).run()
    editor.chain().setTextSelection({ from: from, to: to }).setFontSize(fontSizeH3Value).run()
    editor.chain().setTextSelection({ from: from, to: to }).setLineHeight(lineHeightH3Value).run();
  });



};

const handleApplyStyles = () => {

  handleApplyStylesOften()

}

const handleResetStyles = () => {
  handleApplyStylesOften(fontSizeH4Value, fontFamilyH4Value, lineHeightH4Value, 1)
  handleApplyStylesOften(fontSizeH4Value, fontFamilyH4Value, lineHeightH4Value, 2)
  handleApplyStylesOften(fontSizeH4Value, fontFamilyH4Value, lineHeightH4Value, 3)
  handleApplyStylesOften(fontSizeH4Value, fontFamilyH4Value, lineHeightH4Value, 0)

}
const handleFontChange = (value) => {
  console.log(value)
  editor.chain().focus().setFontFamily(value).run()
};
const handleSizeChange = (value) => {
  console.log(value + "---------")
  editor.chain().focus().setFontSize(value).run();
};
const changeShrink = () => {
  setShrink(!shrink)
}

return (<>{spin ? (<Spin size="large" style={{ margin: '300px 520px' }} />) : (<div style={{ height: '100%' }}>

  <MenuBar
    shrink={shrink}
    isFormatBrushActive={isFormatBrushActive}
    emptyFormat={emptyFormat}
    changeShrink={changeShrink}
    handleFontChange={handleFontChange}
    handleSizeChange={handleSizeChange}
    editor={editor}
    selectColorComplete={selectColorComplete}
    currentIcon={currentIcon}
    currentTextAlign={currentTextAlign}
    fontFamily={fontFamily}
    fontSize={fontSize}
    colorS={colorS}
    open={open}
    contentPop={contentPop}
    contentPopCopy={contentPopCopy}
    contentPopThree={contentPopThree}

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
  <div className='flex' style={{ height: '84%', }} > {!content ? (
    <Spin size="large" style={{ margin: '290px 500px' }} />
  ) : (<>  <div style={{ width: `${shrink ? 100 : 65}%`, overflowY: 'auto' }}>
    <EditorContent className={`p-24 ${classes.codeBlock}`} editor={editor} />
  </div>
    <div className={`position-relative ${shrink ? 'show-no' : ''}`} style={{ width: '35%', backgroundColor: 'red', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px' }}>

      <Content className='flex  h-full w-full '>
        <Menu
          mode="inline"
          items={itemThrees}
          style={{ height: '100%', width: '15%' }}
          selectedKeys={[current]}
          inlineCollapsed={true}
          className=' flex-c-start-center p-y-20'
          onClick={onClickMenu}
        >
        </Menu>
        <div className="bg-color-white flex-1">

          {current == 1 ? (<Extraction editor={editor} />) : (current == 2 ? (<Dictionary />) : (current == 3 ? (<Generation />) : (current == 4 ? (<Polishing editor={editor} fontFamilyH1Value={fontFamilyH1Value}
            handleApplyStyles={handleApplyStyles}
            handleResetStyles={handleResetStyles}
            setFontFamilyH1Value={setFontFamilyH1Value}
            fontFamilyH2Value={fontFamilyH2Value}
            setFontFamilyH2Value={setFontFamilyH2Value}
            fontFamilyH3Value={fontFamilyH3Value}
            setFontFamilyH3Value={setFontFamilyH3Value}
            fontFamilyH4Value={fontFamilyH4Value}
            setFontFamilyH4Value={setFontFamilyH4Value}
            fontSizeH1Value={fontSizeH1Value}
            setFontSizeH1Value={setFontSizeH1Value}
            fontSizeH2Value={fontSizeH2Value}
            setFontSizeH2Value={setFontSizeH2Value}
            fontSizeH3Value={fontSizeH3Value}
            setFontSizeH3Value={setFontSizeH3Value}
            fontSizeH4Value={fontSizeH4Value}
            setFontSizeH4Value={setFontSizeH4Value}
            lineHeightH1Value={lineHeightH1Value}
            setLineHeightH1Value={setLineHeightH1Value}
            lineHeightH2Value={lineHeightH2Value}
            setLineHeightH2Value={setLineHeightH2Value}
            lineHeightH3Value={lineHeightH3Value}
            setLineHeightH3Value={setLineHeightH3Value}
            lineHeightH4Value={lineHeightH4Value}
            setLineHeightH4Value={setLineHeightH4Value} />) : (current == 5 ? (<MyExample editor={editor} />) : (current == 6 ? (<AiHelper />) : (current == 7 ? (<PassageComment editor={editor} />) : (<Picture editor={editor} />)))))))}
        </div>
      </Content>
    </div>
  </>
  )}
  </div>
  <div className="footer shadow flex-r-center-center p-x-10" style={{ height: '8%', justifyContent: 'space-between' }}>
    <Tooltip placement="topLeft" title='文档权限'>
      <Select
        value={power}
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
    <div className='flex-r-center-center'>
      <div className='text-color-grey m-r-10'>已保存:12:29:00</div>
      <Popover
        trigger="click"
        open={openFive}
        content={contentFive}
        onOpenChange={handleOpenChangeFive}
      ><Button className='b-rd-6 m-r-10 ' type="primary" >
          导出
        </Button>
      </Popover>
      <Button onClick={saveContentCopy} className='b-rd-6 bg-color-black text-color-white'>
        保存
      </Button>
    </div>
  </div>
  <BubbleMenu editor={editor}>
    <div className='shadow-primary flex-c-center-start' style={{
      background: "white",
      width: '85px',
      height: '370px'
    }}>
      <div className='flex-r-center-center m-4 b-rd-6 hover-effect' onClick={rewriteClick} style={{ justifyContent: 'space-between' }}>
        <IconFont type="icon-zhongxiex" className='m-10 font-size-lg' />
        <div className='font-size-sm m-r-14'>重写</div>
      </div>
      <div className='flex-r-center-center m-4 b-rd-6 hover-effect' onClick={expansionClick} style={{ justifyContent: 'space-between' }}>
        <IconFont type="icon-kuoxie" className='m-10 font-size-lg' />
        <div className='font-size-sm m-r-14'>扩写</div>
      </div>
      <div className='flex-r-center-center m-4 b-rd-6 hover-effect' onClick={summarizationClick} style={{ justifyContent: 'space-between' }}>
        <IconFont type="icon-neirongshengchengqi" className='m-10 font-size-lg' />
        <div className='font-size-sm m-r-14'>总结</div>
      </div>
      <div className='flex-r-center-center m-4 b-rd-6 hover-effect' onClick={correctionClick} style={{ justifyContent: 'space-between' }}>
        <IconFont type="icon-a-nav_AImanagement" className='m-10 font-size-lg' />
        <div className='font-size-sm m-r-14'>校正</div>
      </div>
      <div className='flex-r-center-center m-4 b-rd-6 hover-effect' onClick={continuationClick} style={{ justifyContent: 'space-between' }}>
        <IconFont type="icon-xuxie" className='m-10 font-size-lg' />
        <div className='font-size-sm m-r-14'>续写</div>
      </div>
      <div className='flex-r-center-center m-4 b-rd-6 hover-effect' onClick={translateClick} style={{ justifyContent: 'space-between' }}>
        <IconFont type="icon-yuyanfanyi" className='m-10 font-size-lg' />
        <div className='font-size-sm m-r-14'>翻译</div>
      </div>
      <div className='flex-r-center-center m-4 b-rd-6 hover-effect' style={{ justifyContent: 'space-between' }}>
        <Popover
          trigger="click"
          // open={popoverOpenStates[index]}
          open={uniqueOpenCopy}
          placement='left'
          content={(
            <div>
              <div className='p-6 hover-effect b-rd-6' onClick={() => pictureClick("pie")}> 饼图</div>
              <div className='p-6 hover-effect b-rd-6' onClick={() => pictureClick("tangle")}>柱状图</div>
              <div className='p-6 hover-effect b-rd-6' onClick={() => pictureClick("solid")}>折线图</div>
            </div>
          )}
          onOpenChange={setUCopy}
        >
          <IconFont type="icon-jurassic_chart" className='m-10 font-size-lg' />
        </Popover>
        <div className='font-size-sm m-r-2' style={{ fontSize: '9px' }}>可视化</div>
      </div>
      <div className={`flex-r-center-center m-4 b-rd-6 hover-effect`} style={{ justifyContent: 'space-between' }}>
        <Popover
          trigger="click"
          // open={popoverOpenStates[index]}
          open={uniqueOpen}
          placement='left'
          content={(
            <div>
              <div className='p-6 hover-effect b-rd-6' onClick={() => polishClick("更学术")}>更学术</div>
              <div className='p-6 hover-effect b-rd-6' onClick={() => polishClick("更正式")}>更正式</div>

              <div className='p-6 hover-effect b-rd-6' onClick={() => polishClick("更口语")}>更口语</div>
            </div>
          )}
          onOpenChange={setU}
        >
          <IconFont type="icon-runse" className={` p-10 font-size-lg`} />
        </Popover>
        <div className='font-size-sm m-r-14'>润色</div>
      </div>
    </div>
  </BubbleMenu >
  {contextHolder}
</div >)}</>)
}
export default Tiptap;


//    <Modal title="可视化图表-曲线图" open={false} footer={null} width={400} >
//    <div style={{ height: '270px' }}>
//    </div>
//    <div className='flex-r-center-center w-full'>
//      <Button className='  b-rd-8 m-r-16 m-b-10' type='primary' >使用</Button>
//      <Button className='  b-rd-8 m-b-10 bg-color-grey text-color-white' >取消</Button>
//    </div>
//  </Modal >


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