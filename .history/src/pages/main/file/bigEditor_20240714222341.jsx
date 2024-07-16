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
import { TableOfContents, getHierarchicalIndexes } from "@tiptap-pro/extension-table-of-contents";
import * as Y from 'yjs';
import { decrypt } from '../../../utils/code';
import { useStorage } from 'web-localstorage-plus';
import userFun from "../../../api/user/user";
import { WebsocketProvider } from 'y-websocket';
import { random } from "lodash";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEditor } from "../../../store";
function BigEditor() {
    const [user, setUser] = useState({})
    const [room, setRoom] = useState(0)
    const [contentCopy, setContentCopy] = useState("?")
    const ydoc = useMemo(() => new Y.Doc(), []);   // 使用 useMemo 保证只创建一次 provider
    const location = useLocation()
    const provider = useMemo(() => {
        console.log(3 + "hhhhhhhh")
        return new WebsocketProvider(`ws: http://smjzgu.natappfree.cc/ws/${room}`, 'tttt', ydoc)
    }, [ydoc, 3]);
    const scrollContainerRef = useRef();
    const [items, setItems] = useState([]);
    const dispatch = useDispatch()
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
            Collaboration.configure({
                document: ydoc,
            }),
            CollaborationCursor.configure({
                provider,
                user: {
                    name: user.nickname,
                    color: '#f783ac'
                },
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
    dispatch(setEditor(editor))
    useEffect(() => {
        const fetchData = async () => {
        await editor.isActive.ready;

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
       if(!editor){
        console.log("baoluo")
       }
        
    }, [editor.isActive.ready])
    @Override
    public List<DocumentInfoVO> getUserAllDocumentInfo(String userId) {
        String cacheKey = "user:" + userId + ":documents";

        List<DocumentInfoVO> documents = (List<DocumentInfoVO>) redisTemplate.opsForValue().get(cacheKey);

        if (documents == null) {
            QueryWrapper<Document> queryWrapper = new QueryWrapper<>();
            queryWrapper.eq("user_id", userId);
            List<Document> documentsFromDb = documentMapper.selectList(queryWrapper);

            if (documentsFromDb != null && !documentsFromDb.isEmpty()) {
                documents = new ArrayList<>();
                for (Document document : documentsFromDb) {
                    String nickname = userDubboService.getUserInfoByUserId(Long.valueOf(userId)).getNickname();
                    boolean isFavorited = checkIfDocumentIsFavorited(userId, document.getId());


                    DocumentInfoVO infoVO = new DocumentInfoVO();
                    BeanUtils.copyProperties(document, infoVO);
                    infoVO.setCreateUserNickname(nickname);
                    infoVO.setIsFavorite(isFavorited);
                    documents.add(infoVO);
                }
                redisTemplate.opsForValue().set(cacheKey, documents);
                redisTemplate.expire(cacheKey, 2, TimeUnit.HOURS);
            }
        }

        return documents;
    }

请你帮我把返回的数据以时间(document.getUpdateTime())排序 最新的放在最前面
    return <div className="flex h-full shadow">
        <div className="shadow p-20" style={{ height: '100%', width: '20%' }} ref={scrollContainerRef}>
            <h3 className="m-y-10">目录</h3>
            <div className="p-10">
                <MemorizedToC items={items} scrollContainerRef={scrollContainerRef} />
            </div>
        </div>
        <div className="" style={{ height: '100%', width: '80%' }}><Tiptap user={user} room={3} ydoc={ydoc} content={contentCopy} /></div>
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
    </div>
}
export default BigEditor