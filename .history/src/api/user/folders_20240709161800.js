
import api from "../request";

let foldersFun = {

};
fileFun.createFolder = (FolderDTO) => {
    return api.get("/folder/createFolder",FolderDTO);
};


export default foldersFun;