
import { useStorage } from "web-localstorage-plus";
import fileFun from "../../../api/user/file";
import TableMy from "../../../components/utils/main/tableMy";
function File() {
 
    return <>
        <h4>{isFolder?'':'我的文件' }</h4>
        <TableMy getFun={fileFun.getAllUserDocument} deleteFun={fileFun.delete} deleteBatchFun={fileFun.deleteDocumentBatch} dataContent={2} uniqueText="文档" />
    </>
}
export default File;