

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import React, { useEffect } from 'react'
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import mammoth from 'mammoth';
import { createFromIconfontCN } from '@ant-design/icons';
import classes from "./editor.module.scss";
import { Popover } from 'antd'
import { cyan, grey, green, presetPalettes, red } from '@ant-design/colors';
import { Col, ColorPicker, Divider, Row, Space, theme } from 'antd';
const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map(([label, colors]) => ({
    label,
    colors,
  }));
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_vbgc7na4g3k.js'
  ],
});

import { Button, Upload } from 'antd';


const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure({ types: [ListItem.name] }),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
    },
  }),
]



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
`

const text = <span>Title</span>;
const Tiptap = () => {

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

  })

  const [pdfContent, setPdfContent] = useState('');
  const [color,setColor]=useState('');
  

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

  const handleBeforeUpload = (file) => {
    handleFileUpload(file);
    return false; // 阻止上传
  };
  useEffect(()=>{
    const selectColorComplete=(color)=>{
    console.log("我现在选择的颜色是"+JSON.stringify(color))

  


   }
  },[])



  const MenuBar = () => {


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
        <div className="upper-frame bg-color-blue flex-center-center shadow" style={{ height: '50px' }}>
          <div className='position-absolute' style={{opacity:0,left:192}}><ColorPicker
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

          <IconFont type="icon-undo" className='m-10 font-size-lg' />
          <IconFont type="icon-redo" className='m-10 font-size-lg' />
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

          <IconFont type="icon-font-color" className='m-10 font-size-lg font-color' />


          <IconFont type="icon-code-inline" className='m-10 font-size-lg' />
          <IconFont type="icon-list-order" className='m-10 font-size-lg' />
          <IconFont type="icon-strikethrough" className='m-10 font-size-lg' />
          <IconFont type="icon-table" className='m-10 font-size-lg' />
          <IconFont type="icon-text-align-left" className='m-10 font-size-lg' />


          <IconFont type="icon-painter" className='m-10 font-size-lg' />
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
            className={editor.isActive('italic') ? 'is-active m-10 font-size-lg' : 'm-10 font-size-lg'} />
          <IconFont type="icon-text-align-left" className='m-10 font-size-lg' />
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

    <EditorContent className='p-24 ' editor={editor} />
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