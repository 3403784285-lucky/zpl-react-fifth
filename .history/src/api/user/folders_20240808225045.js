
import api from "../request";

let foldersFun = {

};
foldersFun.createFolder = (FolderDTO) => {
    return api.post("/folder/createFolder",FolderDTO);
};

foldersFun.deleteFolder = (folderId) => {
    return api.post(`/folder/deleteFolders/${folderId}`);
};
foldersFun.updateFolder = (FolderUpdateDTO) => {
    return api.post("/folder/updateFolder",FolderUpdateDTO);
};
foldersFun.setFolderPermission = (FolderPermissionUpdateDTO) => {
    return api.post("/folder/setFolderPermission",FolderPermissionUpdateDTO);
};
foldersFun.createDocument = (RecoverDocumentDTO) => {
    return api.post("/folder/createDocument",RecoverDocumentDTO);
};
foldersFun.recoverDocument = (DocumentFolderDTO) => {
    return api.post("/folder/recoverDocument",DocumentFolderDTO);
};

foldersFun.deleteFolderCopy = (folderId,documentId) => {
    return api.post(`/folder/deleteDocument/${folderId}/${documentId}`);
};

foldersFun.deleteRecentDocument = (documentId) => {
    return api.post(`/folder/deleteRecentDocument/${documentId}`);
};

foldersFun.moveDocument = (MoveDocumentDTO) => {
    return api.post(`/folder/moveDocument`,MoveDocumentDTO);
};
foldersFun.deleteDocumentByFolderId = (DeleteDocumentByFolderIdDTO) => {
    return api.post(`/folder/deleteDocumentByFolderId`,DeleteDocumentByFolderIdDTO);
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



export default foldersFun;