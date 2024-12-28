
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
import Style from '../../../pages/ai/style.jsx'
import { head } from 'lodash';
import { time } from 'echarts';
import { extend } from 'umi-request';
import Hot from '../../../pages/ai/hot.jsx';
const { Header, Footer, Sider, Content } = Layout;
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_o1tzykmllrg.js'
  ],
});

const icons = ['text', 'heading1', 'heading2', 'heading3']
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
    icon: <IconFont type='icon-pingzhujiao' className='font-size-lg'></IconFont>,
    title: '论文评审'
  },
  {
    key: 8,
    icon: <IconFont type='icon-fanganzhiding' className='font-size-lg'></IconFont>,
    title: '思维导图生成'
  },
  {
    key: 9,
    icon: <IconFont type='icon-a-2424yangshiku' className='font-size-lg'></IconFont>,
    title: '样式库'
  },
  {
    key: 10,
    icon: <IconFont type='icon-a-065_redian' className='font-size-lg'></IconFont>,
    title: '热点链接'
  },
]


const Tiptap = ({ setIsModalVisible,content, editor = {}, provider, saveTimeInit }) => {
  const [current, setCurrent] = useState(1);
  const [lineHeight, setLineHeight] = useState(1)
  const [lineCurrentHeight, setLineCurrentHeight] = useState(1)
  // const [pdfContent, setPdfContent] = useState('');
  const [level, setLevel] = useState('0');
  const [textAlign, setTextAlign] = useState('');
  const [bulletList, setBulletList] = useState(false);
  const [wait, setWait] = useState(false);
  const [orderedList, setOrderedList] = useState(false);
  const [isFormatBrushActive, setIsFormatBrushActive] = useState(false);
  const [formatToApply, setFormatToApply] = useState(null);
  const [formatToApplyCopy, setFormatToApplyCopy] = useState(null);
  const [colorS, setColorS] = useState('black');
  const [currentIcon, setCurrentIcon] = useState('heading1');
  const [open, setOpen] = useState(false);
  const [currentTextAlign, setCurrentTextAlign] = useState('left');
  const [openCopy, setOpenCopy] = useState(false);
  const [openThree, setOpenThree] = useState(false);
  const [cursorClick, setCursorClick] = useState(false);
  const [openFour, setOpenFour] = useState(false);
  const [openFive, setOpenFive] = useState(false);
  const [uniqueOpen, setUniqueOpen] = useState(false)
  const [shrink, setShrink] = useState(false)
  const [saveTime, setSaveTime] = useState(saveTimeInit)
  let timerUnique = null
  const [fontSize, setFontSize] = useState("16")
  const [currentFamily, setCurrentFamily] = useState("")
  const [power, setPower] = useState("person")
  const [fontFamily, setFontFamily] = useState("Inter")
  const [currentSize, setCurrentSize] = useState("")
  const [timer, setTimer] = useState(null);
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
  const [lineHeightIcon, setLineHeightIcon] = useState('1');
  const [lineHeightH3Value, setLineHeightH3Value] = useState('1.5');
  const [lineHeightH4Value, setLineHeightH4Value] = useState('1.5');
  const [clicked, setClicked] = useState(false);
  const [spin, setSpin] = useState(false)
  const [result,setResult]=useState('')
  const [modal, contextHolder] = Modal.useModal();
  const [chartType, setChartType] = useState(null); // 用于存储当前选中的图表类型
  const [uniqueOpenCopy, setUniqueOpenCopy] = useState(false)
  const [fileList, setFileList] = useState([
    {
      uid: '1',
      name: 'tip.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    },
  ]);
  const [isLoading, setIsLoading] = useState(false)
  const storage = useStorage();
  let isSaving = false;
  let noSave = true;
  const onClickMenu = (e) => {
    setCurrent(e.key)
  }
  //导出文档
  const createExport = useCallback(format => () => {
    setIsLoading(true)
    editor.chain().export({
      format,
      onExport(context) {
        const filename = storage.getItem("documentName"); // 使用保存的文件名
        const { blob, error, download } = context;
  
        if (error) {
          showErrorToast({ message: error.message });
          setIsLoading(false);
          return;
        }

        const t3 = URL.createObjectURL(blob), a2 = document.createElement("a");
        a2.href = t3, a2.download = filename, a2.click(), window.requestAnimationFrame(() => {
          a2.remove(), URL.revokeObjectURL(t3);
        });
      },
    }).run();
  }, [editor])


  const contentFive = (<div >
    <div className='p-6 hover-effect b-rd-6' disabled={editor.isEmpty} onClick={createExport('docx')}>导出为word格式文档</div>
    <div className='p-6 hover-effect b-rd-6' disabled={editor.isEmpty} onClick={createExport('gfm')}>导出为md格式文档</div>
  </div>)

  const toggleSize = () => {
    setShrink(true)
  }
  

  // 格式刷点击处理
  const handleFormatBrushClick = () => {
    if (!clicked) {
      setClicked(true);
      let newTimer = setTimeout(() => {

        // 处理单击事件
        console.log("点击处理")

        if (isFormatBrushActive) {
          applyFormat();
        } else {
          saveFormat();
        }
        setClicked(false);
      }, 300); // 这里的时间可以根据需要调整
      setTimer(newTimer)
    }
  };

  // 双击格式刷处理
  const handleFormatBrushDoubleClick = () => {
    setClicked(false);
    clearTimeout(timer);
    console.log("双击处理")
    if (!isFormatBrushActive) {
      console.log("变成了正确")
      setCursorClick(true)

      saveFormat();
    } else {
      console.log("变成了错误")
      setCursorClick(false)
      setIsFormatBrushActive(false)
    }
  };

  const saveContent = async () => {
    const content = editor.getHTML(); // 获取编辑器内容
    console.log(content)
    const res = await fileFun.update(storage.getItem("documentId"), { content: content, userId: storage.getItem("openid") })
    if (res.code == 200) {
      if (isSaving) {
        // message.success("保存成功")
        isSaving = false;
      } else {
        // message.success("已自动保存")
      }
      setSaveTime(res.data.updateTime)
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
      }else if(event.ctrlKey && event.key === 'f'){
        event.preventDefault();
        setIsModalVisible(true);

      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [editor]);

  useEffect(() => {
    return function live() {
      console.log("销毁了")
      saveContent()

    }
  }, [])

  //导出文档
 

  useEffect(() => {
    const saveInterval = setInterval(saveContent, 300000); // 每五分钟保存一次
    return () => clearInterval(saveInterval);
  }, [editor]);

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
        const { from, to } = selection;
        // console.log(cursorClick+"这是现在的值")
        if (to - from > 0 && cursorClick) {
          if (!wait) {
            let t = setTimeout(() => {
              console.log("格式化双击")
              applyFormat()
              setWait(false)
              clearTimeout(t)
            }, 500)
          }

        }
        // 检查选区的颜色
        const marks = $from.marks();
        console.log(marks)
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
          let l = line.attrs.lineHeight
          if (l == 2) {
            setLineHeightIcon('xx'); // 默认颜色


          } else if (l == 1.5) {
            setLineHeightIcon('xox'); // 默认颜色

          } else {
            setLineHeightIcon('x'); // 默认颜色

          }

        } else {
          setLineHeightIcon('x'); // 默认颜色
        }
      }
    };
    editor.on('transaction', handleTransaction);
    return () => {
      editor.off('transaction', handleTransaction);
    };
  }, [editor, content, cursorClick, wait]);
  //到时候好好学习一下这里
  useEffect(() => {
    setSaveTime(saveTimeInit)
  }, [saveTimeInit])
  const polishClick = async (value) => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const res=await aiFun.deduct("文本润色")
    if(res.code==200){
       // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = Modal.info({
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
    formData.append('requirement', value);
    try {
      const response = await fetch('http://192.168.50.150:5000/textBeautification', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'your-authorization-token',
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      // 关闭生成中的模态框
      generatingModal.destroy();

      // 显示结果的模态框
      const resultModal = Modal.confirm({
        title: '润色结果',
        icon: <IconFont type='icon-jihebiaoshi21' />,
        content: (
          <div className="result-content">
            {/* 动态显示逐字生成的文本 */}
            <p id="result-text">{result}</p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(result1).run();
          setResult('')

        },
        onCancel() {
          // 用户取消操作
          setResult('')

        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result1 += decoder.decode(value, { stream: true });
        setResult(result1); // 逐步更新状态，以动态显示在模态框中

        // 实时更新模态框内容
        resultModal.update({
          content: (
            <div className="result-content">
              <p id="result-text">{result1}</p>
            </div>
          ),
        });
      }

    } catch (error) {
      console.error('Error fetching stream:', error);
      generatingModal.destroy(); // 确保在发生错误时关闭模态框
    }
    }
    // 显示结果模态框，并逐字输出结果


  }
  const rewriteClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const res=await aiFun.deduct("重写")
    if(res.code==200){
       // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = Modal.info({
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

    try {
      const response = await fetch('http://192.168.50.150:5000/rewrite', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'your-authorization-token',
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      // 关闭生成中的模态框
      generatingModal.destroy();

      // 显示结果的模态框
      const resultModal = Modal.confirm({
        title: '重写结果',
        icon: <IconFont type='icon-jihebiaoshi21' />,
        content: (
          <div className="result-content">
            {/* 动态显示逐字生成的文本 */}
            <p id="result-text">{result}</p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(result1).run();
          setResult('')

        },
        onCancel() {
          // 用户取消操作
          setResult('')

        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result1 += decoder.decode(value, { stream: true });
        setResult(result1); // 逐步更新状态，以动态显示在模态框中

        // 实时更新模态框内容
        resultModal.update({
          content: (
            <div className="result-content">
              <p id="result-text">{result1}</p>
            </div>
          ),
        });
      }

    } catch (error) {
      console.error('Error fetching stream:', error);
      generatingModal.destroy(); // 确保在发生错误时关闭模态框
    }
    }
   
  };


  const correctionClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const res=await aiFun.deduct("文本纠错")
    if(res.code==200){
       // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = Modal.info({
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

    try {
      const response = await fetch('http://192.168.50.150:5000/textErrorCorrection', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'your-authorization-token',
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      // 关闭生成中的模态框
      generatingModal.destroy();

      // 显示结果的模态框
      const resultModal = Modal.confirm({
        title: '校正结果',
        icon: <IconFont type='icon-jihebiaoshi21' />,
        content: (
          <div className="result-content">
            {/* 动态显示逐字生成的文本 */}
            <p id="result-text">{result}</p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(result1).run();
          setResult('')

        },
        onCancel() {
          // 用户取消操作
          setResult('')

        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result1 += decoder.decode(value, { stream: true });
        setResult(result1); // 逐步更新状态，以动态显示在模态框中

        // 实时更新模态框内容
        resultModal.update({
          content: (
            <div className="result-content">
              <p id="result-text">{result1}</p>
            </div>
          ),
        });
      }

    } catch (error) {
      console.error('Error fetching stream:', error);
      generatingModal.destroy(); // 确保在发生错误时关闭模态框
    }
    }
    // 显示结果模态框，并逐字输出结果
  };


  const continuationClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const res=await aiFun.deduct("续写")
    if(res.code==200){
       // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = Modal.info({
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

    try {
      const response = await fetch('http://192.168.50.150:5000/textContinuation', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'your-authorization-token',
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      // 关闭生成中的模态框
      generatingModal.destroy();

      // 显示结果的模态框
      const resultModal = Modal.confirm({
        title: '续写结果',
        icon: <IconFont type='icon-jihebiaoshi21' />,
        content: (
          <div className="result-content">
            {/* 动态显示逐字生成的文本 */}
            <p id="result-text">{result}</p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(result1).run();
          setResult('')

        },
        onCancel() {
          // 用户取消操作
          setResult('')
        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result1 += decoder.decode(value, { stream: true });
        setResult(result1); // 逐步更新状态，以动态显示在模态框中

        // 实时更新模态框内容
        resultModal.update({
          content: (
            <div className="result-content">
              <p id="result-text">{result1}</p>
            </div>
          ),
        });
      }

    } catch (error) {
      console.error('Error fetching stream:', error);
      generatingModal.destroy(); // 确保在发生错误时关闭模态框
    }
    }
   
  };


  const expansionClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const res=await aiFun.deduct("扩写")
    if(res.code==200){
       // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = Modal.info({
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

    try {
      const response = await fetch('http://192.168.50.150:5000/expansion', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'your-authorization-token',
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      // 关闭生成中的模态框
      generatingModal.destroy();

      // 显示结果的模态框
      const resultModal = Modal.confirm({
        title: '扩写结果',
        icon: <IconFont type='icon-jihebiaoshi21' />,
        content: (
          <div className="result-content">
            {/* 动态显示逐字生成的文本 */}
            <p id="result-text">{result}</p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(result1).run();
          setResult('')

        },
        onCancel() {
          // 用户取消操作
          setResult('')
          
        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result1 += decoder.decode(value, { stream: true });
        setResult(result1); // 逐步更新状态，以动态显示在模态框中

        // 实时更新模态框内容
        resultModal.update({
          content: (
            <div className="result-content">
              <p id="result-text">{result1}</p>
            </div>
          ),
        });
      }

    } catch (error) {
      console.error('Error fetching stream:', error);
      generatingModal.destroy(); // 确保在发生错误时关闭模态框
    }
    }
  };


  const summarizationClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const res=await aiFun.deduct("文本摘要")
    if(res.code==200){
       // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = Modal.info({
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

    try {
      const response = await fetch('http://192.168.50.150:5000/abbreviation', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'your-authorization-token',
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      // 关闭生成中的模态框
      generatingModal.destroy();

      // 显示结果的模态框
      const resultModal = Modal.confirm({
        title: '总结结果',
        icon: <IconFont type='icon-jihebiaoshi21' />,
        content: (
          <div className="result-content">
            {/* 动态显示逐字生成的文本 */}
            <p id="result-text">{result}</p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(result1).run();
          setResult('')

        },
        onCancel() {
          // 用户取消操作
          setResult('')

        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result1 += decoder.decode(value, { stream: true });
        setResult(result1); // 逐步更新状态，以动态显示在模态框中

        // 实时更新模态框内容
        resultModal.update({
          content: (
            <div className="result-content">
              <p id="result-text">{result1}</p>
            </div>
          ),
        });
      }

    } catch (error) {
      console.error('Error fetching stream:', error);
      generatingModal.destroy(); // 确保在发生错误时关闭模态框
    }
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
      }, 30); // 控制文字输出的速度，可以根据需要调整
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

  const formatClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const formData = new FormData();
    formData.append('text', selectedText);
    const res = await aiFun.fixFormat(formData)
    console.log(res.data + "9999");
  }


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
      setBulletList($from.toString().includes('bulletList'))
      setOrderedList($from.toString().includes('orderedList'))

      if ($from.parent.type.name == 'heading') {
        console.log($from.parent.attrs.level)
        setLevel($from.parent.attrs.level)
      }

      console.log($from.parent.attrs.textAlign)
      setTextAlign($from.parent.attrs.textAlign);
      setCurrentFamily($from.parent.attrs.fontFamily ?? 'Inter')
      setCurrentSize($from.parent.attrs.fontSize ?? 16)
      setLineCurrentHeight($from.parent.attrs.lineHeight ?? 1)
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
      const { $from } = editor.state.selection;
      console.log(JSON.stringify(formatToApply))
      if (formatToApply.length==0) {
        console.log("空数组");
        editor.chain().focus().setTextAlign(textAlign).run();
        editor.chain().focus().setFontFamily(currentFamily).run();
        editor.chain().focus().setFontSize(currentSize).run();
        editor.chain().focus().setLineHeight(lineCurrentHeight).run();
        editor.chain().focus().unsetBold().run()
        editor.chain().focus().unsetBlockquote().run()
        editor.chain().focus().unsetCode().run()
        editor.chain().focus().unsetItalic().run()
        editor.chain().focus().unsetStrike().run()

        // editor.chain().focus().clearNodes().run();

      } else {
        formatToApply.forEach(mark => {
          if (!mark.attrs == {}) {
            editor.chain().focus().setTextSelection({ from: from, to: to }).toggleMark(mark.type, mark.attrs).run();
          } else {
            editor.chain().focus().setTextSelection({ from: from, to: to }).toggleMark(mark.type).run();
          }
        });
      }
      if (level != '') {
        editor.chain().focus().toggleHeading({ level: level }).run();
      }
      const isH=$from.toString();
      if ((bulletList&&!isH.includes('bulletList'))||(!bulletList&&isH.includes('bulletList')))
        editor.chain().focus().toggleBulletList().run();
     
      if ((orderedList&&!isH.includes('orderedList'))||(!orderedList&&isH.includes('orderedList')))
        editor.chain().focus().toggleOrderedList().run();
     
      if (!cursorClick) {
        setIsFormatBrushActive(false);
        setFormatToApply(null);
      }

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
    } else editor.chain().focus().toggleHeading({ level: index }).run()
    setCurrentIcon(icons[index])
    setOpen(false);
  };
  const hideCopy = () => {
    console.log("选择开关2")
    setOpen(false);
  };


  const selectColorComplete = (colorO) => {
    console.log("选择颜色开关")
    console.log("我现在选择的颜色是" + colorO.metaColor.originalInput)
    setColorS((colorS) => { colorS = colorO.metaColor.originalInput; editor.chain().focus().setColor(colorS).run(); return colorS });
    // console.log(editor.storage.markdown.getMarkdown())
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

  
  

 
  const pictureClick = async(data) => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    setUCopy()
    console.log(JSON.parse(`
  {
    "tooltip": {
        "trigger": "item"
    },
    "legend": {
        "orient": "vertical",
        "left": "left",
        "data": ["类别1", "类别2", "类别3"]
    },
    "series": [
        {
            "name": "访问来源",
            "type": "pie",
            "radius": "55%",
            "center": ["50%", "60%"],
            "data": [
                {"value": 1048, "name": "类别1"},
                {"value": 735, "name": "类别2"},
                {"value": 580, "name": "类别3"}
            ],
            "emphasis": {
                "itemStyle": {
                    "shadowBlur": 10,
                    "shadowOffsetX": 0,
                    "shadowColor": "rgba(0, 0, 0, 0.5)"
                }
            }
        }
    ]
  }
`))
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

    const formData = new FormData();
    formData.append('text', selectedText);
    console.log(data)
    formData.append('image_type', data);
    const res=await aiFun.visual(formData)
    generatingModal.destroy();
    if (res.code === 200) {
      console.log(res.data)
      editor.chain().focus().insertContent({
        type: 'echartsNode',
        attrs: { 
          data: res.data
        },
      }).run();
    }
   
  };

  const translateClick = async () => {
    const selectedText = editor.state.doc.cut(editor.state.selection.from, editor.state.selection.to).textContent;
    const res=await aiFun.deduct("翻译")
    if(res.code==200){
       // 显示生成中的模态框，使用CSS动画来模拟生成中的效果
    const generatingModal = Modal.info({
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

    try {
      const response = await fetch('http://192.168.50.150:5000/textTranslation', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': 'your-authorization-token',
          'Accept': 'text/event-stream',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let result1 = '';

      // 关闭生成中的模态框
      generatingModal.destroy();

      // 显示结果的模态框
      const resultModal = Modal.confirm({
        title: '翻译结果',
        icon: <IconFont type='icon-jihebiaoshi21' />,
        content: (
          <div className="result-content">
            {/* 动态显示逐字生成的文本 */}
            <p id="result-text">{result}</p>
          </div>
        ),
        okText: '替换',
        cancelText: '弃用',
        onOk() {
          // 替换编辑器中的选中内容为生成的结果
          editor.chain().focus().deleteSelection().insertContent(result1).run();
          setResult('')

        },
        onCancel() {
          // 用户取消操作
          setResult('')

        }
      });

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        result1 += decoder.decode(value, { stream: true });
        setResult(result1); // 逐步更新状态，以动态显示在模态框中

        // 实时更新模态框内容
        resultModal.update({
          content: (
            <div className="result-content">
              <p id="result-text">{result1}</p>
            </div>
          ),
        });
      }

    } catch (error) {
      console.error('Error fetching stream:', error);
      generatingModal.destroy(); // 确保在发生错误时关闭模态框
    }
    }
    // 显示结果模态框，并逐字输出结果


  };

  const setU = (newOpen) => {
    setUniqueOpen(newOpen)
  }
  const setUCopy = (newOpenCopy) => {
    setUniqueOpenCopy(newOpenCopy)

  }
  const handleApplyStylesOften = () => {

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
  const handleCancelStyle = () => {
    setVisibleCopy(false);
};

  return (<>{spin ? (<Spin size="large" style={{ margin: '300px 520px' }} />) : (<div style={{ height: '100%' }}>
    <MenuBar
      provider={provider}
      shrink={shrink}
      isFormatBrushActive={isFormatBrushActive}
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
      lineHeightIcon={lineHeightIcon}
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
      <EditorContent className={`p-24 ${classes.codeBlock} `} editor={editor} />
    </div>
    <Modal
            title="新样式"
            open={visibleStyle}
            icon={<IconFont type='icon-jihebiaoshi21'></IconFont>}
            closable={true}
            okText="确定"
            cancelText="取消"
            onCancel={handleCancelStyle}
            onOk={handleOkStyle}
        >
            <Form className='m-20'>
                <Form.Item
                    label="样式名称"
                    rules={[{ required: true, message: '请输入样式名称' }]}
                >
                    <Input
                        value={styleName}
                        onChange={(e) => setStyleName(e.target.value)}
                        count={{
                            show: true,
                            max: 5,
                        }}
                        maxLength={5}
                        placeholder="最多输入五个字"
                    />
                </Form.Item>
            </Form>
            <div className='m-b-30 m-t-20'>
            {selectedStyle.map((item, index) => (
                <Row className='m-10' key={index} gutter={[16, 16]}>
                    <Col span={6}>{item.name}</Col>
                    <Col span={6}>
                        <Select
                            defaultValue={item.fontFamily}
                            onChange={(value) => handleChange(index, 'fontFamily', value)}
                        >
                            <Option value="Inter">Inter</Option>
                            <Option value="Comic Sans MS">Comic Sans MS</Option>
                            <Option value="Comic Sans">Comic Sans</Option>
                            <Option value="serif">serif</Option>
                            <Option value="monospace">monospace</Option>
                            <Option value="cursive">cursive</Option>
                            {/* Add more font options if needed */}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            defaultValue={item.fontSize.toString()}
                            onChange={(value) => handleChange(index, 'fontSize', parseInt(value, 10))}
                        >
                            <Option value="12">12</Option>
                            <Option value="14">14</Option>
                            <Option value="16">16</Option>
                            <Option value="18">18</Option>
                            <Option value="20">20</Option>
                            <Option value="24">24</Option>
                            <Option value="28">28</Option>
                            <Option value="32">32</Option>
                            <Option value="36">36</Option>
                            <Option value="40">40</Option>
                            {/* Add more size options if needed */}
                        </Select>
                    </Col>
                    <Col span={6}>
                        <Select
                            defaultValue={item.lineHeight.toString()}
                            onChange={(value) => handleChange(index, 'lineHeight', parseFloat(value))}
                        >
                            <Option value="1">1</Option>
                            <Option value="1.5">1.5</Option>
                            <Option value="2">2</Option>
                            <Option value="3">3</Option>
                            {/* Add more line height options if needed */}
                        </Select>
                    </Col>
                </Row>
            ))}
        </div>
        </Modal>
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
              setLineHeightH4Value={setLineHeightH4Value} />) : (current == 5 ? (<MyExample editor={editor} />) : (current == 6 ? (<AiHelper />) : (current == 7 ? (<PassageComment editor={editor} />) : (current==8?(<Picture editor={editor}/>):(current==9?<Style/>:<Hot/>))))))))}
          </div>
        </Content>
      </div>
    </>
    )}
    </div>
    <div className="footer shadow flex-r-center-center p-x-10" style={{ height: '8%', justifyContent: 'space-between' }}>
      <div className="flex-r-center-center"><Tooltip placement="topLeft" title='文档权限'>
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
        <div className=' text-color-grey font-size-sm m-l-10'>字数：{editor.storage.characterCount.characters()}</div></div>

      <div className='flex-r-center-center'>
        <div className='text-color-grey m-r-10 font-size-sm'>已保存：{saveTime}</div>
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
                <div className='p-6 hover-effect b-rd-6' onClick={() => pictureClick("饼图")}> 饼图</div>
                <div className='p-6 hover-effect b-rd-6' onClick={() => pictureClick("柱状图")}>柱状图</div>
                <div className='p-6 hover-effect b-rd-6' onClick={() => pictureClick("折线图")}>折线图</div>
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


// const handleFileUpload = async (file) => {
//   const reader = new FileReader();
//   reader.onload = async () => {
//     const buffer = reader.result;
//     const data = new Uint8Array(buffer);
//     const pdfText = await pdfParser(data);

     // 获取 PDF 内容 
//     const content = pdfText.text;
//     setPdfContent(content);

     // 将内容插入到编辑器中
//     editor.chain().insertContent(content).run();
//   };
//   reader.readAsArrayBuffer(file);
// };

