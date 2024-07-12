
import fileFun from "../../api/user/file";
import TableMy from "../../components/utils/tableMy";
function File() {
     

return<>
    <TableMy getFun={fileFun.getAllUserDocument} deleteFun={fileFun.delete} deleteBatchFun={fileFun.deleteDocumentBatch} dataContent={2}/>
</>
    
}

export default File;