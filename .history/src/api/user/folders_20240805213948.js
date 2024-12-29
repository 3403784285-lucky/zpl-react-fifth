
import api from "../request";

let foldersFun = {

};
foldersFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};

foldersFun.deleteFolders = (folderId) => {
    return api.post(`/folder/deleteFolder/${folderId}`);
};
foldersFun.updateFolder = (FolderUpdateDTO) => {
    return api.post("/folder/updateFolder",FolderUpdateDTO);
};
foldersFun.setFolderPermission = (FolderPermissionUpdateDTO) => {
    return api.post("/folder/setFolderPermission",FolderPermissionUpdateDTO);
};
foldersFun.createDocument = (DocumentFolderDTO) => {
    return api.post("/folder/createDocument",DocumentFolderDTO);
};
foldersFun.deleteFolderCopy = (documentId) => {
    return api.post(`/folder/deleteFolder/${documentId}`);
};
foldersFun.moveDocument = (MoveDocumentDTO) => {
    return api.post(`/folder/moveDocument`,MoveDocumentDTO);
};

foldersFun.moveDocumentToFolder = (MoveDocumentToFolderDTO) => {
    return api.post(`/folder/moveDocumentToFolder`,MoveDocumentToFolderDTO);
};
foldersFun.getFolderDocument = () => {
    return api.get(`/folder/getFolderDocument`);
};
foldersFun.moveDocumentToDefault = (MoveDocumentToFolderDTO) => {
    return api.post(`/folder/moveDocumentToDefault`,MoveDocumentToFolderDTO    );
};
foldersFun.getDocumentByFolderId = (folderId) => {
    return api.get(`/folder/getDocumentByFolderId`,null,{params:{
        folderId:folderId
    }});
};
foldersFun.deleteRecentDocument = (documentId) => {
    return api.get(`/folder/deleteRecentDocument/${documentId}`);
};


export default foldersFun;