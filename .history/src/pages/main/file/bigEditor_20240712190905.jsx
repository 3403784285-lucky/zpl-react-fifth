import Tiptap from "../../../components/utils/edit/editor"
import { useEditor } from "@tiptap/react";
function BigEditor()
{

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
        <div className="bg-color-red" style={{height:'100%',width:'20%'}}></div>
        <div style={{height:'100%',width:'80%'}}><Tiptap editor={editor}/></div>
        
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
        
    </div>
}
export default BigEditor