import Tiptap from "../../../components/utils/edit/editor"
import {ToC} from '../../../components/utils/edit/ToC'
const MemorizedToC = memo(ToC)


import { decrypt } from '../../../utils/code';
import { useStorage } from 'web-localstorage-plus';
import userFun from "../../../api/user/user";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function BigEditor() {
    const [user, setUser] = useState({})
    const editor=useSelector(state=>state.editor.value)
if(editor){
  editor=JSON.parse(editor)
}
    const [room, setRoom] = useState(0)
    const [contentCopy, setContentCopy] = useState("?")
    const location = useLocation()
   const items=useSelector(state=>state.items.value)
 
    const scrollContainerRef = useRef();
     
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
    }, [editor])
    return <div className="flex h-full shadow">
        <div className="shadow p-20" style={{ height: '100%', width: '20%' }} ref={scrollContainerRef}>
            <h3 className="m-y-10">目录</h3>
            <div className="p-10">
                <MemorizedToC items={items} scrollContainerRef={scrollContainerRef} />
            </div>
        </div>
        <div className="" style={{ height: '100%', width: '80%' }}><Tiptap user={user} room={3}  content={contentCopy} /></div>
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
    </div>
}
export default BigEditor