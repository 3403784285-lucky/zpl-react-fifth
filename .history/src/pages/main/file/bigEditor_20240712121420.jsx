import Tiptap from "../../../components/utils/edit/editor"
function BigEditor()
{
    return <div className="flex h-full">
        <div className="bg-color-red" style={{height:'100%',width:'20%'}}></div>
        <div style={{height:'100%',width:'80%'}}><Tiptap/></div>
        
        {/* @tiptap-pro:registry=https://registry.tiptap.dev/
        >> >> //registry.tiptap.dev/:_authToken=89J50XK */}
        
    </div>
}
export default BigEditor