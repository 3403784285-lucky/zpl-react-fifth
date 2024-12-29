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
import { useLayoutEffect, useMemo } from 'react';
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
  const [room, setRoom] = useState(190)
  const [saveTimeInit, setSaveTimeInit] = useState('')
  const [connected, setConnected] = useState(false);
  const [items, setItems] = useState([])
  // null
  const [contentCopy, setContentCopy] = useState(null)
  // const props = {
  //   action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  //   onChange: handleChange,
  //   multiple: true,
  // };

  useEffect(() => {
    const fetchData = async () => {
      const queryParams = location.search.slice(1); // 获取查询参数（去掉开头的问号）
      const documentId = decrypt(queryParams); // 假设你有一个解密函数
      storage.setItem("documentId", documentId)
      console.log(location.search)
      console.log('Document ID:', documentId);
      const userId = storage.getItem("openid");
      if (userId) {
        const res = await userFun.shareCollaboration({ userId, documentId });
        setRoom(res.data.document.id);
        console.log("执行")
        storage.setItem("documentName", res.data.document.name)
        setSaveTimeInit(res.data.document.updateTime)
        setContentCopy(res.data.document.content); // 获取内容
      }
    };
    fetchData();
  }, [])
  const ydoc = useMemo(() => new Y.Doc(), []);   // 使用 useMemo 保证只创建一次 provider
  // console.log("连接")
  const provider = useMemo(() => {
    if (room != 0) {
      console.log("此时的room", room)
      return new WebsocketProvider(`ws://192.168.50.41:8081/ws/${room}`, 'tttt', ydoc)
    }
    return null
  }, [room, ydoc])
  if (provider)
    console.log("在线用户" + JSON.stringify(ydoc))
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
        onDrop: (currentEditor, files, pos) => {
          files.forEach(file => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(pos, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run();
            };
          });
        },
        onPaste: (currentEditor, files, htmlContent) => {
          files.forEach(file => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
              currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
                type: 'image',
                attrs: {
                  src: fileReader.result,
                },
              }).focus().run();
            };
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
      Table,
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

      provider && Collaboration.configure({
        document: ydoc, // 确保正确传递 ydoc
      }),
      provider && CollaborationCursor.configure({
        provider: provider, // 确保正确传递 provider
        user: {
          name: storage.getItem("user").nickname,
          color: getRandomColor(),
        },
      }),
    ],
    content: contentCopy,
  });


  useEffect(() => {
    if (editor && contentCopy) {
      editor.commands.setContent(contentCopy)
      // console.log("插入了", contentCopy)
      editor.commands.insertContent(",")

    }
  }, [contentCopy])


  return <div className="flex h-full shadow-primary" ref={scrollContainerRef}>
    <div className="shadow-primary p-20" style={{ height: '100%', width: '16%', overflowY: 'auto' }} >
      <h3 className="m-y-10">目录</h3>
      <div className="p-t-10" style={{fontSize:'14px'}}>
        <MemorizedToC items={items} editor={editor} scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
    <div className="" style={{ height: '100%', width: '84%' }}><Tiptap editor={editor} saveTimeInit={saveTimeInit} provider={provider} content={contentCopy} /></div>
    {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
  </div>
}
export default BigEditor