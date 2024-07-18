
import { useStorage } from "web-localstorage-plus";
import fileFun from "../../../api/user/file";
import TableMy from "../../../components/utils/main/tableMy";
import { useEffect } from "react";
    function File() {
    const storage=useStorage()
    const isFolder=storage.getItem("isFolder")??false
    useEffect(()=>{
        return ()=>{
            storage.setItem("isFolder",false)
        }
    })

    return <div className="p-t-20 p-l-20">
        <h3 className="p-10">{isFolder?`${storage.getItem("folder").name}`:'我的文件' }</h3>
        <TableMy getFun={fileFun.getAllUserDocument} deleteFun={fileFun.delete} deleteBatchFun={fileFun.deleteDocumentBatch} dataContent={2} uniqueText="文档" />
    </div>
}
export default File;