
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
fileFun.createDocument = (DocumentFolderDTO) => {
    return api.post("/folder/createDocument",DocumentFolderDTO);
};
fileFun.createFolder = (FolderDTO) => {
    return api.post("/folder/deleteFolder/{documentId}",FolderDTO);
};


export default foldersFun;