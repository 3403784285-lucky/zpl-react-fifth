import Tiptap from "../../../components/utils/edit/editor"
import { useEditor } from "@tiptap/react";
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
import { ToC } from "../../../components/utils/edit/ToC";
const MemorizedToC = memo(ToC)
import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import { TableOfContents,getHierarchicalIndexes } from "@tiptap-pro/extension-table-of-contents";
function BigEditor()
{
    const [items, setItems] = useState([]);

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
          //   document: ydoc,
          // }),
          // CollaborationCursor.configure({
          //   provider,
          //   user: {
          //     name: user.nickname,
          //     color: '#f783ac'
          //   },
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
    
    
      });
    
    return <div className="flex h-full">
        <div className="" style={{height:'100%',width:'20%'}}>
        <MemorizedToC editor={editor} items={items} />
        </div>
        <div style={{height:'100%',width:'80%'}}><Tiptap editor={editor}/></div>
        
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
        
    </div>
}
export default BigEditor