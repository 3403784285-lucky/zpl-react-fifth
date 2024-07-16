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
const MemorizedToC = memo(ToC)
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
function BigEditor() {
    const location=useLocation()
    const scrollContainerRef = useRef();
    const [user, setUser] = useState({})
    const [room, setRoom] = useState(0)
    const [items, setItems] = useState([])
    const [currentIcon, setCurrentIcon] = useState('heading1');
    const [spin, setSpin] = useState(false)
    const [contentCopy, setContentCopy] = useState("?")
    const editor = useEditor({
        extensions: [
          TableOfContents.configure({
            getIndex: getHierarchicalIndexes,
            onUpdate(content) {
                console.log("刷新")
    
              setItems(content)
            },
          }),
          Color.configure({
            types: [TextStyle.name, ListItem.name], keepMarks: true,
    
          }),
          TextStyle.configure({ types: [ListItem.name], keepMarks: true, }),
          Highlight.configure({
            multicolor: true,
          }),
          // Collaboration.configure({
          //     document: ydoc,
          // }),
          // CollaborationCursor.configure({
          //     provider,
          //     user: {
          //         name: user.nickname,
          //         color: '#f783ac'
          //     },
          // }),
          Markdown,
          Table,
          TableCell,
          TableHeader,
          TableRow,
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
            history: {
              depth: 10,
            },
            heading: {
    
              levels: [1, 2, 3],
            }
          }),
        ],
        contentCopy
      },[contentCopy]);
      useEffect(() => {
        const fetchData = async () => {
            const queryParams = location.search.slice(1); // 获取查询参数（去掉开头的问号）
            const documentId = decrypt(queryParams); // 假设你有一个解密函数
            console.log(location.search)
            console.log('Document ID:', documentId);
            const storage = useStorage();
            const userId = storage.getItem("openid");
            if (userId) {
                const res = await userFun.shareCollaboration({ userId, documentId });
                console.log(JSON.stringify(res.data) + "-------------->");
                setRoom(res.data.document.id);
                setUser(res.data.user);
                setContentCopy(res.data.document.content); // 获取内容
                console.log(editor + "}}}}}}}}}}}}}}}}}}]")
            }
        };
        fetchData();
    }, [])
      useEffect(() => {
        if (!editor) return;
        if (contentCopy == '?') {
          setSpin(true)
        } else {
          setSpin(false)
          
        }
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
      }, [editor, contentCopy]);
    return <div className="flex h-full shadow">
        <div className="shadow p-20" style={{ height: '100%', width: '16%' }} ref={scrollContainerRef}>
            <h3 className="m-y-10">目录</h3>
            <div className="p-10">
                <MemorizedToC items={items} scrollContainerRef={scrollContainerRef} />
            </div>
        </div>
        <div className="" style={{ height: '100%', width: '84%' }}><Tiptap editor={editor} currentIcon={currentIcon} spin={spin} room={room} user={user} /></div>
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
    </div>
}
export default BigEditor