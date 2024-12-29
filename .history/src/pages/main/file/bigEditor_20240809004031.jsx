import Tiptap from "../../../components/utils/edit/editor"
import { ToC } from '../../../components/utils/edit/ToC'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { TableOfContents, getHierarchicalIndexes } from "@tiptap-pro/extension-table-of-contents";
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Table } from '@tiptap/extension-table'
import { Markdown } from 'tiptap-markdown'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import StarterKit from '@tiptap/starter-kit'
import { Highlight } from '@tiptap/extension-highlight'
import { LineHeight } from "../../../components/utils/edit/lineHeight";
import { TextAlign } from '@tiptap/extension-text-align'
import { useEditor } from "@tiptap/react";
import { decrypt } from "../../../utils/code";
import { useStorage } from "web-localstorage-plus";
import userFun from "../../../api/user/user";
import FontFamily from "@tiptap/extension-font-family";
import { useInsertionEffect, useLayoutEffect, useMemo } from 'react';
import Collaboration from '@tiptap/extension-collaboration';
import { WebsocketProvider } from 'y-websocket';
import Image from "@tiptap/extension-image";
import * as Y from 'yjs';
const MemorizedToC = memo(ToC)
import Link from "@tiptap/extension-link";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FontSize } from "../../../components/utils/edit/fontSizeExtension";
import FileHandler from '@tiptap-pro/extension-file-handler'
import EchartsNode from '../../../components/utils/edit/EchartsNode'
import { color } from "echarts";
import CharacterCount from "@tiptap/extension-character-count";
import fileFun from "../../../api/user/file";
import MindMap from "simple-mind-map";


const getRandomColor = () => {
  const colors = [
    '#958DF1',
    '#F98181',
    '#FBBC88',
    '#FAF594',
    '#70CFF8',
    '#94FADB',
    '#B9F18D',
    '#C3E2C2',
    '#EAECCC',
    '#AFC8AD',
    '#EEC759',
    '#9BB8CD',
    '#FF90BC',
    '#FFC0D9',
    '#DC8686',
    '#7ED7C1',
    '#F3EEEA',
    '#89B9AD',
    '#D0BFFF',
    '#FFF8C9',
    '#CBFFA9',
    '#9BABB8',
    '#E3F4F4',]
  return colors[Math.floor(Math.random() * colors.length)]
}

function BigEditor() {
 
  const location = useLocation()
  const storage = useStorage();
  const scrollContainerRef = useRef();
  const [saveTimeInit, setSaveTimeInit] = useState('')
  const [connected, setConnected] = useState(false);
  const [items, setItems] = useState([])
  const [contentCopy, setContentCopy] = useState(null)
  let count = 0;
  const queryParams =useMemo(()=>location.search.slice(1)) ; // 获取查询参数（去掉开头的问号）
  const  documentId = useMemo(()=>decrypt(queryParams)); 
  const ydoc = useMemo(() => new Y.Doc(), []);   // 使用 useMemo 保证只创建一次 provider


  useEffect(() => {
    const fetchData = async () => {
      // 假设你有一个解密函数
      storage.setItem("documentId", documentId)
      const userId = storage.getItem("openid");
      if (userId) {
        const res = await userFun.shareCollaboration({ userId, documentId });
        console.log("执行")
        storage.setItem("documentName", res.data.document.name)
        setSaveTimeInit(res.data.document.updateTime)
        setContentCopy(res.data.document.content); // 获取内容
      }
    };
    fetchData();
  }, [])
  const provider = useMemo(() => {
    
      return new WebsocketProvider(`ws://192.168.50.41:8081/ws/${documentId}`, 'tttt', ydoc)

  }, [documentId,ydoc])
  console.log(ydoc)

  const editor = useEditor({
    extensions: [
      TableOfContents.configure({
        getIndex: getHierarchicalIndexes,
        onUpdate(content) {
          console.log("editor变了")
          setItems(content);
        },
      }),
      Image,
      FontSize,
      EchartsNode,
      CharacterCount,
      FontFamily,
      FileHandler.configure({
        allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
        onDrop: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            const formData = new FormData()
            console.log(file)
            formData.append("file", file)
            fileFun.upload(formData).then(res => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: res.data,
                },
              }).focus().run();
            });

          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            const formData = new FormData()
            console.log(file)
            formData.append("file", file)
            fileFun.upload(formData).then(res => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: res.data,
                },
              }).focus().run();
            });

          });
        },
      }),
      Color.configure({
        types: [TextStyle.name, ListItem.name],
        keepMarks: true,
      }),
      TextStyle.configure({ types: [ListItem.name], keepMarks: true }),
      Highlight.configure({
        multicolor: true,
      }),
      Markdown,
      Table.configure({
        resizable: true,
      }),
      TableCell,
      TableHeader,
      TableRow,
      Link,
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
          keepAttributes: true,
        },
        orderedList: {
          keepMarks: true,
          keepAttributes: true,
        },
        history: false,
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Collaboration.configure({
        document: ydoc, // 确保正确传递 ydoc
      }),
      provider && CollaborationCursor.configure({
        provider: provider, // 确保正确传递 provider
        user: {
          name: storage.getItem("user").nickname,
          color: getRandomColor(),
        },
      })
    ],
    content: contentCopy,
  });
  useEffect(() => {
    if (editor && contentCopy && count < 1) {
      editor.commands.setContent(contentCopy)
      editor.commands.insertContent(",")
      count++;
    }
  }, [contentCopy])


    useEffect(() => {
      const mindMap = new MindMap({
        el: document.getElementById('mindMapContainer'),
        data: {
          text: '', // 节点的文本，可以是富文本，也就是html格式的，此时richText要设为true
          richText: false, // 节点的文本是否是富文本模式
          expand: true, // 节点是否展开
          uid: '',// 节点唯一的id，可不传，内部会生成
          icon: [], // 图标，格式可参考教程里的【插入和扩展节点图标】章节
          image: '', // 图片的url
          imageTitle: '', // 图片的标题，可为空
          imageSize: { // 图片的尺寸
            width: 100, // 图片的宽度，必传
            height: 100, // 图片的高度，必传
            custom: false // 如果设为true，图片的显示大小不受主题控制，以imageSize.width和imageSize.height为准
          },
          "children": []
        }
      });
  
      // 在组件卸载时销毁MindMap实例
      return () => {
        mindMap.destroy();
      };
    }, []);
  return <div className="flex h-full shadow-primary" ref={scrollContainerRef}>
    <div className="shadow-primary p-20" style={{ height: '100%', width: '16%', overflowY: 'auto' }} >
    <div id="mindMapContainer" style={{width:100,height:200}}></div>
      <h3 className="m-y-10">目录</h3>

      <div className="p-t-10" style={{ fontSize: '14px' }}>
        <MemorizedToC items={items} editor={editor} scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
    <div className="" style={{ height: '100%', width: '84%' }}><Tiptap editor={editor} saveTimeInit={saveTimeInit} provider={provider} content={contentCopy} /></div>
  </div>
}
export default BigEditor;