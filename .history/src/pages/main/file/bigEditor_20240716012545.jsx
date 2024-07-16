import Tiptap from "../../../components/utils/edit/editor"
import { ToC } from '../../../components/utils/edit/ToC'
const MemorizedToC = memo(ToC)
import { useEffect, useState } from "react";
function BigEditor() {
    const scrollContainerRef = useRef();
    const [user, setUser] = useState({})
    const [room, setRoom] = useState(0)
    const [contentCopy, setContentCopy] = useState("?")
    const editor = useEditor({
        extensions: [
          TableOfContents.configure({
            getIndex: getHierarchicalIndexes,
            onUpdate(content) {
    
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
      });
      useEffect(() => {
        if (!editor) return;
        if (content == '?') {
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
        receiveChild(items, editor)
        editor.on('transaction', handleTransaction);
        return () => {
          editor.off('transaction', handleTransaction);
        };
      }, [editor, content]);
    return <div className="flex h-full shadow">
        <div className="shadow p-20" style={{ height: '100%', width: '16%' }} ref={scrollContainerRef}>
            <h3 className="m-y-10">目录</h3>
            <div className="p-10">
                <MemorizedToC items={items} scrollContainerRef={scrollContainerRef} />
            </div>
        </div>
        <div className="" style={{ height: '100%', width: '84%' }}><Tiptap editor={editor} room={room} user={user} /></div>
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
    </div>
}
export default BigEditor