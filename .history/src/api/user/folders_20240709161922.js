
import api from "../request";

let foldersFun = {

};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};

fileFun.deleteFolder = (FolderDTO,folderId) => {
    return api.post(`/folder/deleteFolder/${folderId}`,FolderDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/updateFolder",FolderDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};


export default foldersFun;