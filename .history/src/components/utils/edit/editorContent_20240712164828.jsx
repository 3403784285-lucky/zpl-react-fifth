
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { Table } from '@tiptap/extension-table'
import { Markdown } from 'tiptap-markdown'
import { TableRow } from '@tiptap/extension-table-row'
import { TableHeader } from '@tiptap/extension-table-header'
import { TableCell } from '@tiptap/extension-table-cell'
import StarterKit from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/react'
import { TextAlign } from '@tiptap/extension-text-align'
import classes from "./editor.module.scss";
import { Highlight } from '@tiptap/extension-highlight'
import { LineHeight } from './lineHeight.jsx'
import { useEffect } from 'react'


const EditorContentCopy = ({loadingContent}) => {
    const editor = useEditor({
        extensions: [

            Color.configure({
                types: [TextStyle.name, ListItem.name], keepMarks: true,

            }),
            TextStyle.configure({ types: [ListItem.name], keepMarks: true, }),
            Highlight.configure({
                multicolor: true,
            }),

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
        content: ''
    });
    useEffect(()=>{
        editor.commands().setContent(loadingContent)
    },[loadingContent])
    return (
        <div className='p-10 m-y-14' style={{ height: '400px', overflowY: 'auto' }}><EditorContent className={`p-24 ${classes.codeBlock} `} editor={editor} />
        </div>
    )
}
export default EditorContentCopy;

