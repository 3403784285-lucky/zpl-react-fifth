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
        content:`Text editor

A text editor is a type of computer program that edits plain text. Such programs are sometimes known as "notepad" software (e.g. Windows Notepad). Text editors are provided with operating systems and software development packages, and can be used to change files such as configuration files, documentation files and programming language source code.

Plain text and rich text

There are important differences between plain text (created and edited by text editors) and rich text (such as that created by word processors or desktop publishing software).

Plain text exclusively consists of character representation. Each character is represented by a fixed-length sequence of one, two, or four bytes, or as a variable-length sequence of one to four bytes, in accordance to specific character encoding conventions, such as ASCII, ISO/IEC 2022, Shift JIS, UTF-8, or UTF-16. These conventions define many printable characters, but also non-printing characters that control the flow of the text, such as space, line break, and page break. Plain text contains no other information about the text itself, not even the character encoding convention employed. Plain text is stored in text files, although text files do not exclusively store plain text. Since the early days of computers, plain text was (once by necessity and now by convention) generally displayed using a monospace font, such that horizontal alignment and columnar formatting were sometimes done using whitespace characters.

Rich text, on the other hand, may contain metadata, character formatting data (e.g. typeface, size, weight and style), paragraph formatting data (e.g. indentation, alignment, letter and word distribution, and space between lines or other paragraphs), and page specification data (e.g. size, margin and reading direction). Rich text can be very complex. Rich text can be saved in binary format (e.g. DOC), text files adhering to a markup language (e.g. RTF or HTML), or in a hybrid form of both (e.g. Office Open XML).

Text editors are intended to open and save text files containing either plain text or anything that can be interpreted as plain text, including the markup for rich text or the markup for something else (e.g. SVG).

History

Before text editors existed, computer text was punched into cards with keypunch machines. Physical boxes of these thin cardboard cards were then inserted into a card reader. Magnetic tape, drum and disk card image files created from such card decks often had no line-separation characters at all, and assumed fixed-length 80- or 90-character records. An alternative to cards was Punched tape. It could be created by some teleprinters (such as the Teletype), which used special characters to indicate ends of records. Some early operating systems included batch text editors, either integrated with language processors or as separate utility programs; one early example was the ability to edit SQUOZE source files for SCAT in SHARE Operating System.

The first interactive text editors were "line editors" oriented to teleprinter- or typewriter-style terminals without displays. Commands (often a single keystroke) effected edits to a file at an imaginary insertion point called the "cursor". Edits were verified by typing a command to print a small section of the file, and periodically by printing the entire file. In some line editors, the cursor could be moved by commands that specified the line number in the file, text strings (context) for which to search, and eventually regular expressions. Line editors were major improvements over keypunching. Some line editors could be used by keypunch; editing commands could be taken from a deck of cards and applied to a specified file. Some common line editors supported a "verify" mode in which change commands displayed the altered lines.

Weird h5 headline

When computer terminals with video screens became available, screen-based text editors (sometimes called just "screen editors") became common. One of the earliest full-screen editors was O26, which was written for the operator console of the CDC 6000 series computers in 1967. Another early full-screen editor was vi. Written in the 1970s, it is still a standard editor on Unix and Linux operating systems. Also written in the 1970s was the UCSD Pascal Screen Oriented Editor, which was optimized both for indented source code and general text. Emacs, one of the first free and open-source software projects, is another early full-screen or real-time editor, one that was ported to many systems. A full-screen editor's ease-of-use and speed (compared to the line-based editors) motivated many early purchases of video terminals.

Types of text editors

Simple text editors

Some text editors are small and simple, while others offer broad and complex functions. For example, Unix and Unix-like operating systems have the pico editor (or a variant), but many also include the vi and Emacs editors. Microsoft Windows systems come with the simple Notepad, though many people—especially programmers—prefer other editors with more features. Under Apple Macintosh's classic Mac OS there was the native TeachText later replaced by SimpleText in 1994, which was replaced in Mac OS X by TextEdit, which combines features of a text editor with those typical of a word processor such as rulers, margins and multiple font selection. These features are not available simultaneously, but must be switched by user command, or through the program automatically determining the file type.

Word editors

Most word processors can read and write files in plain text format, allowing them to open files saved from text editors. Saving these files from a word processor, however, requires ensuring the file is written in plain text format, and that any text encoding or BOM settings won't obscure the file for its intended use. Non-WYSIWYG word processors, such as WordStar, are more easily pressed into service as text editors, and in fact were commonly used as such during the 1980s. The default file format of these word processors often resembles a markup language, with the basic format being plain text and visual formatting achieved using non-printing control characters or escape sequences. Later word processors like Microsoft Word store their files in a binary format and are almost never used to edit plain text files.`
    
    
      });
    
    return <div className="flex h-full shadow">
        <div className="shadow" style={{height:'100%',width:'20%'}}>
            <h3>目录</h3>
        <MemorizedToC editor={editor} items={items} />
        </div>
        <div style={{height:'100%',width:'80%'}}><Tiptap editor={editor}/></div>
        
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
        
    </div>
}
export default BigEditor