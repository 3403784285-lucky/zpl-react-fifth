
import fileFun from "../../api/user/file";
import TableMy from "../../components/utils/tableMy";
function File() {
     

return<>
    <TableMy getFun={fileFun.getAllUserDocument}/>
</>
    
}

export default File;