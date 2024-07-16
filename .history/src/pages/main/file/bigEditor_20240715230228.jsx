import Tiptap from "../../../components/utils/edit/editor"
import { ToC } from '../../../components/utils/edit/ToC'
const MemorizedToC = memo(ToC)

import { Menu } from "antd";
import { decrypt } from '../../../utils/code';
import { useEffect, useState } from "react";
function BigEditor() {
   
    const [items, setItems] = useState([])
    const [editor, setEditor] = useState(null)
    const receiveChild = (items, editor,num) => {
        console.log("我来咯--------------")
        console.log(num)
        setEditor(editor)
        setItems(items)
    }
    const scrollContainerRef = useRef();
  
    return <div className="flex h-full shadow">
        <div className="shadow p-20" style={{ height: '100%', width: '16%' }} ref={scrollContainerRef}>
            <h3 className="m-y-10">目录</h3>
            <div className="p-10">
                <MemorizedToC items={items} scrollContainerRef={scrollContainerRef} editor={editor} />
            </div>
        </div>
        <div className="" style={{ height: '100%', width: '84%' }}><Tiptap user={user} receiveChild={receiveChild} /></div>
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
    </div>
}
export default BigEditor