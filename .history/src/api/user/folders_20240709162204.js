
import api from "../request";

let foldersFun = {

};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};

fileFun.deleteFolder = (FolderDTO,folderId) => {
    return api.post(`/folder/deleteFolder/${folderId}`,FolderDTO);
};
fileFun.updateFolder = (FolderUpdateDTO) => {
    return api.post("/folder/updateFolder",FolderUpdateDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/setFolderPermission",FolderDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};


export default foldersFun;