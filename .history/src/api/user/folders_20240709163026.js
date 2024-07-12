
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
fileFun.deleteFolderCopy = (documentId) => {
    return api.post(`/folder/deleteFolder/${documentId}`);
};
fileFun.moveDocument = (documentId) => {
    return api.post(`/folder/moveDocument`);
};

fileFun.createFolder = (documentId) => {
    return api.post(`/folder/deleteFolder/${documentId}`);
};
fileFun.createFolder = (documentId) => {
    return api.post(`/folder/deleteFolder/${documentId}`);
};

export default foldersFun;