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
import Export from "@tiptap-pro/extension-export";
import Import from "@tiptap-pro/extension-import";
import { retrieveFile } from "../../../utils/code";
import FindReplace from "../../../components/findReplace";
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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [matches, setMatches] = useState([]);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(0);
  const [items, setItems] = useState([])
  const [contentCopy, setContentCopy] = useState(null)
  let count = 0;
  const queryParams = useMemo(() => location.search.slice(1)); // 获取查询参数（去掉开头的问号）
  const documentId = useMemo(() => decrypt(queryParams));
  const ydoc = useMemo(() => new Y.Doc(), []);   // 使用 useMemo 保证只创建一次 provider
  useEffect(() => {
    const fetchData = async () => {
      // 假设你有一个解密函数
      storage.setItem("documentId", documentId)
      const userId = storage.getItem("openid");
      if (userId) {
        const res = await userFun.shareCollaboration({ userId, documentId });
        console.log(JSON.stringify(res.data) + "------------==========")
        setSaveTimeInit(res.data.document.updateTime)
        const importFile = storage.getItem("importFile");
        if (!importFile) {
          setContentCopy(res.data.document.content); // 获取内容
          storage.setItem("documentName", res.data.document.name)
        }
        else {
          retrieveFile(storage.getItem("documentName") + '.docx').then((retrievedFile) => {
            console.log(retrievedFile)
            editor.chain().import({
              file: retrievedFile.result,
              onImport(context) {
                setContentCopy(context.content)
                setIsLoading(false)
              },
            }).run()
            storage.setItem("importFile", false)
          }).catch((error) => {
            console.error('Error retrieving file:', error);
          });



        }
      }
    };
    fetchData();
  }, [])
  const provider = useMemo(() => {
    return new WebsocketProvider(`ws://192.168.50.41:8081/ws/${documentId}`, 'tttt', ydoc)
  }, [documentId, ydoc])

  const handleFind = (text) => {
    if (!editor || !text) return;
  
    editor.chain().focus().unsetHighlight().run(); // 清除之前的高亮
  
    const regex = new RegExp(text, 'gi');
    const doc = editor.state.doc;
    let newMatches = [];
  
    doc.descendants((node, pos) => {
      if (node.isText) {
        let match;
        while ((match = regex.exec(node.text)) !== null) {
          const from = pos + match.index;
          const to = from + match[0].length;
          newMatches.push({ from, to });
          editor.commands.setTextSelection({ from, to });
          editor.commands.highlight({ color: '#FFFF00' }); // 普通匹配项高亮为黄色
        }
      }
    });
  
    setMatches(newMatches);
    setCurrentMatchIndex(newMatches.length > 0 ? 0 : -1);
  
    // 如果有匹配项，将第一个匹配项高亮为特殊颜色
    if (newMatches.length > 0) {
      editor.commands.setTextSelection(newMatches[0]);
      editor.commands.highlight({ color: '#FF0000' }); // 当前匹配项高亮为红色
    }
  };

  const goToNextMatch = () => {
    if (matches.length === 0) return;
  
    // 清除当前高亮颜色
    editor.commands.setTextSelection(matches[currentMatchIndex]);
    editor.commands.highlight({ color: '#FFFF00' }); // 重新设为普通高亮颜色
  
    const nextIndex = (currentMatchIndex + 1) % matches.length;
    setCurrentMatchIndex(nextIndex);
  
    // 设置新的当前匹配项的高亮颜色
    editor.commands.setTextSelection(matches[nextIndex]);
    editor.commands.highlight({ color: '#FF0000' }); // 当前匹配项高亮为红色
  };
  
  const goToPreviousMatch = () => {
    if (matches.length === 0) return;
  
    // 清除当前高亮颜色
    editor.commands.setTextSelection(matches[currentMatchIndex]);
    editor.commands.highlight({ color: '#FFFF00' }); // 重新设为普通高亮颜色
  
    const prevIndex = (currentMatchIndex - 1 + matches.length) % matches.length;
    setCurrentMatchIndex(prevIndex);
  
    // 设置新的当前匹配项的高亮颜色
    editor.commands.setTextSelection(matches[prevIndex]);
    editor.commands.highlight({ color: '#FF0000' }); // 当前匹配项高亮为红色
  };
  
  const handleReplaceAll = (findText, replaceText) => {
    if (!editor || !findText || !replaceText) return;
  
    editor.commands.setContent(
      editor.getHTML().replace(new RegExp(findText, 'g'), replaceText)
    );
  };

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
      Export.configure({
        appId: 'e97ooxlm',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjMxNjczOTUsImV4cCI6MTc1NDcwMzM5NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.ofXKcQv4r735G6ldmw9TfykWyoiCtw4vfus7XiwpyKA',
      }),
      Import.configure({
        appId: 'e97ooxlm',
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE3MjMxNjczOTUsImV4cCI6MTc1NDcwMzM5NSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG5ueSIsIlN1cm5hbWUiOiJSb2NrZXQiLCJFbWFpbCI6Impyb2NrZXRAZXhhbXBsZS5jb20iLCJSb2xlIjpbIk1hbmFnZXIiLCJQcm9qZWN0IEFkbWluaXN0cmF0b3IiXX0.ofXKcQv4r735G6ldmw9TfykWyoiCtw4vfus7XiwpyKA',
      }),
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




  return <div className="flex h-full shadow-primary" ref={scrollContainerRef}>
    <div className="shadow-primary p-20" style={{ height: '100%', width: '16%', overflowY: 'auto' }} >
      <h3 className="m-y-10">目录</h3>
      <div className="p-t-10" style={{ fontSize: '14px' }}>
        <MemorizedToC items={items} editor={editor} scrollContainerRef={scrollContainerRef} />
      </div>
    </div>

    <div className="" style={{ height: '100%', width: '84%' }}>
    <FindReplace
        visible={isModalVisible}
        onClose={() => setIsFloatingVisible(false)}
        onFind={handleFind}
        onReplace={() => {}}
        onReplaceAll={() => {}}
        onNext={goToNextMatch}
        onPrevious={goToPreviousMatch}
      />
      <Tiptap editor={editor} setIsModalVisible={setIsModalVisible} saveTimeInit={saveTimeInit} provider={provider} content={contentCopy} /></div>
  </div>
}
export default BigEditor;