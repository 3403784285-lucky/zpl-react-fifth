import Tiptap from "../../../components/utils/edit/editor"
function BigEditor()
{
    return <div className="flex h-full">
        <div className="bg-color-red" style={{height:'100%',width:'20%'}}></div>
        <Tiptap/>
        <div className="bg-color-red" style={{height:'100%',width:'20%'}}></div>

        
    </div>
}
export default BigEditor