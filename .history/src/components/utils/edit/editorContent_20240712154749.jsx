
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
import MenuBar from './menuBar.jsx'
import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
import { TextAlign } from '@tiptap/extension-text-align'
import classes from "./editor.module.scss";
import { Highlight } from '@tiptap/extension-highlight'
import { LineHeight } from './lineHeight.jsx'
import { Transformer } from 'markmap-lib';
import aiFun from '../../../api/user/ai.js'
import { Tooltip, Select, Popover, ColorPicker } from 'antd/lib/index.js'
import { useStorage } from "web-localstorage-plus";
const { Markmap, loadCSS, loadJS } = markmap;
import * as markmap from 'markmap-view';
import {TableOfContents,getHierarchicalIndexes} from '@tiptap-pro/extension-table-of-contents'
import { cyan, grey, green, presetPalettes, red } from '@ant-design/colors';
import { createFromIconfontCN } from '@ant-design/icons';

import Collaboration from '@tiptap/extension-collaboration';
import CollaborationCursor from '@tiptap/extension-collaboration-cursor';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';

const EditorContent = () => {
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
    
    
      });
  return (
    <EditorContent editor={editor} />
)
}
export default EditorContent;

