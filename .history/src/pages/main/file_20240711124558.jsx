
import fileFun from "../../api/user/file";
import TableMy from "../../components/utils/tableMy";
function File() {
     

return<>
    <TableMy getFun={fileFun.getAllUserDocument} dataContent={2}/>
</>
    
}

export default File;