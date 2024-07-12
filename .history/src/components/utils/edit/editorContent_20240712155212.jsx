
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


const EditorContentCopy = () => {
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
        content: `<h2>
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


    });
    return (
        <div style={{ height: '40%', overflowY: 'auto' }}><EditorContent className={`p-24 ${classes.codeBlock} `} editor={editor} />
        </div>
    )
}
export default EditorContentCopy;

