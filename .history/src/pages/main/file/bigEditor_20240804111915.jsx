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
import { useMemo } from 'react';
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

const getRandomName = () => {
  const names = ['廖梓行', '刘洋', '张培灵']
  return names[Math.floor(Math.random() * names.length)]
}
const getRandomColor = () => {
  const colors = ['#ff5733', '#33ff57', '#3357ff']
  return colors[Math.floor(Math.random() * colors.length)]
}

function BigEditor() {
  const location = useLocation()
  const scrollContainerRef = useRef();
  const [user, setUser] = useState({})
  const [room, setRoom] = useState(191)
  const [items, setItems] = useState([])
  const [editorExtensions, setEditorExtensions] = useState([]);

  // null
  const [contentCopy, setContentCopy] = useState(null)
  // const props = {
  //   action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  //   onChange: handleChange,
  //   multiple: true,
  // };
  const ydoc = useMemo(() => new Y.Doc(), []);   // 使用 useMemo 保证只创建一次 provider
  // console.log("连接")
  let provider;
  
  useEffect(() => {
    const fetchData = async () => {
      const storage = useStorage();
      const queryParams = location.search.slice(1); // 获取查询参数（去掉开头的问号）
      const documentId = decrypt(queryParams); // 假设你有一个解密函数
      storage.setItem("documentId", documentId)
      console.log(location.search)
      console.log('Document ID:', documentId);
      const userId = storage.getItem("openid");
      if (userId) {
        const res = await userFun.shareCollaboration({ userId, documentId });
        // console.log(JSON.stringify(res.data) + "-------------->");
        // setRoom(res.data.document.id);
        storage.setItem("documentName", res.data.document.name)
        setUser(res.data.user);
        setContentCopy(res.data.document.content); // 获取内容
        // console.log("content:", res.data.document.content + "------------------------------")
        // console.log("用户：", res.data.user)

      }
    };
    fetchData();
  }, [])
  const editor = useEditor({
    extensions: [
      TableOfContents.configure({
      getIndex: getHierarchicalIndexes,
      onUpdate(content) {
        setItems(content);
      },
    }),
      Image,
      FontSize,
      EchartsNode,
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
        keepAttributes: false,
      },
      orderedList: {
        keepMarks: true,
        keepAttributes: false,
      },
      history: false,
      heading: {
        levels: [1, 2, 3],
      },
    }),
  ],
    content: contentCopy,
  });
  useEffect(() => {
    if (room!=0) {
      provider=new WebsocketProvider(`ws://192.168.50.41:8081/ws/${room}`, 'tttt', ydoc)
      setEditorExtensions([
        ...editor.options.extensions,
        Collaboration.configure({
          document: ydoc,
        }),
        CollaborationCursor.configure({
          provider: provider,
          user: {
            name: getRandomName(),
            color: getRandomColor(),
          },
        })
      ]);
    }
    return () => {
      provider.disconnect(); // 断开 WebSocket 连接
      ydoc.destroy(); // 销毁 Yjs 文档
    };
  }, [room]);

  useEffect(() => {
    if (editor && contentCopy) {
      editor.commands.setContent(contentCopy)
      // console.log("插入了", contentCopy)
      editor.commands.insertContent(",")

    }
  }, [contentCopy])
  if(editorExtensions){
    editor.options.extensions = editorExtensions;

  }

  return <div className="flex h-full shadow-primary">
    <div className="shadow-primary p-20" style={{ height: '100%', width: '16%', overflowY: 'auto' }} ref={scrollContainerRef}>
      <h3 className="m-y-10">目录</h3>
      <div className="p-t-10">
        <MemorizedToC items={items} scrollContainerRef={scrollContainerRef} />
      </div>
    </div>
    <div className="" style={{ height: '100%', width: '84%' }}><Tiptap editor={editor} content={contentCopy} /></div>
    {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
  </div>
}
export default BigEditor