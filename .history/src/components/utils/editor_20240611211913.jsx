

import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import React from 'react'
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import * as docx from 'docx-preview';

import {  createFromIconfontCN } from '@ant-design/icons';
const IconFont = createFromIconfontCN({
  scriptUrl: [
    '//at.alicdn.com/t/c/font_4248113_40bmlkg84c5.js'
  ],
});

import { Button, ConfigProvider, Space } from 'antd';


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
const Tiptap = () => {

  const editor = useEditor({
    extensions,
    content,

  })


  const MenuBar = () => {


    if (!editor) {
      console.log("根本没有")
      return null
    }

    return (
      <>
        <div className="upper-frame bg-color-blue flex-center-center shadow" style={{ height: '50px'  }}>
          <IconFont type="icon-bold"
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={
              !editor.can()
                .chain()
                .focus()
                .toggleBold()
                .run()
            }
            className={editor.isActive('bold') ? 'is-active m-10 font-size-lg' : 'm-10 font-size-lg'} />
          <IconFont type="icon-font-color" className='m-10 font-size-lg' />
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

      
        </div>
      </>
    )
  }

  return <>

    <MenuBar />

    <EditorContent className='p-24 h-full' editor={editor} />
    <div className="footer shadow flex-r-center-center" style={{height:'50px'}}>
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