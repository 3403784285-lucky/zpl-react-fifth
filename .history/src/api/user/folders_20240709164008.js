
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
fileFun.moveDocument = (MoveDocumentDTO) => {
    return api.post(`/folder/moveDocument`,MoveDocumentDTO);
};

fileFun.moveDocumentToFolder = (MoveDocumentToFolderDTO) => {
    return api.post(`/folder/moveDocumentToFolder`,MoveDocumentToFolderDTO);
};
fileFun.getFolderDocument = () => {
    return api.get(`/folder/getFolderDocument`);
};
fileFun.moveDocumentToDefault = (MoveDocumentToFolderDTO) => {
    return api.post(`/folder/moveDocumentToDefault`,MoveDocumentToFolderDTO    );
};
fileFun.getDocumentByFolderId = (folderId) => {
    return api.get(`/folder/getDocumentByFolderId`,null,{params:{
        folderId:folderId
    }});
};
fileFun.getFolderDocument = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default foldersFun;