
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
fileFun.setFolderPermission = (FolderPermissionUpdateDTO) => {
    return api.post("/folder/setFolderPermission",FolderPermissionUpdateDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createDocument",FolderDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};


export default foldersFun;