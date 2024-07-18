
import { useStorage } from "web-localstorage-plus";
import fileFun from "../../../api/user/file";
import TableMy from "../../../components/utils/main/tableMy";
    function File() {
    const storage=useStorage()
 const isFolder=storage.getItem("isFolder")??false

    return <>
        <h4>{isFolder?`${stor.getItem("folder").title}`:'我的文件' }</h4>
        <TableMy getFun={fileFun.getAllUserDocument} deleteFun={fileFun.delete} deleteBatchFun={fileFun.deleteDocumentBatch} dataContent={2} uniqueText="文档" />
    </>
}
export default File;