
import api from "../request";

let fileFun = {

};
fileFun.getFiles = () => {
    return api.get("/user/login");
};
fileFun.add = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};
fileFun.modify = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};
fileFun.delete = (documentId) => {
    return api.post(`/document/delete/${documentId}`);
};
fileFun.search = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};
fileFun.favorite = (FavoriteDocumentDTO) => {
    return api.post("/document/favoriteDocument", FavoriteDocumentDTO);
};
fileFun.deleteDocumentBatch = (array) => {
    return api.post("/document/deleteDocumentBatch", array);
};
fileFun.upload = (file) => {
    return api.upload("/files/upload", file);
};
fileFun.getAllUserDocument = (userId) => {
    return api.get(`/documents/getAllUserDocument/${userId}`);
};
fileFun.getDocumentById = (documentId) => {
    return api.get(`/documents/getDocumentById/${documentId}`);
};
fileFun.getCategories = () => {
    return api.get(`/doc/getCategories`);
};
fileFun.searchDocument = (keyword) => {
    return api.getParam(`/doc/search`,null, {
        keyword: keyword
    });
};
fileFun.getArticles = () => {
    return api.get(`/doc/getArticles`);
};


fileFun.favoriteDocument = (FavoriteDocumentDTO) => {
    return api.post("/documents/favoriteDocument", FavoriteDocumentDTO);
};
fileFun.favoriteDocument = (documentId) => {
    return api.put(`/document/restoreDeletedDocument/${documentId}`);
};
fileFun.toggleFavoriteTemplate = (FavoriteTemplateDTO) => {
    return api.post("/documents/toggleFavoriteTemplate", FavoriteTemplateDTO);
};
fileFun.userFavoriteDocuments = (userId) => {
    return api.get(`/documents/userFavoriteDocuments/${userId}`);
};
fileFun.userFavoriteTemplates = (userId) => {
    return api.get(`/documents/userFavoriteTemplates/${userId}`);
};
fileFun.getDocumentLog = (documentId) => {
    return api.get(`/document/getDocumentLog/${documentId}`);
};
fileFun.likeDocument = (UserDocumentLikeDTO) => {
    return api.post(`/documents/likeDocument`, UserDocumentLikeDTO);
};
fileFun.create = (DocumentUploadDTO) => {
    return api.post(`/document/create`, DocumentUploadDTO);
};
fileFun.update = (documentId, DocumentUpdateDTO) => {
    return api.put(`/document/update/${documentId}`, DocumentUpdateDTO);
};
fileFun.delete = (documentId) => {
    return api.delete(`/document/delete/${documentId}`);
};
fileFun.setVisibility = (documentId) => {
    return api.put(`/document/setVisibility/${documentId}`);
};
fileFun.rename = (documentId, newName) => {
    return api.putParam(`/document/rename/${documentId}`, null, {
        newName: newName
    });
};
fileFun.getDocumentVersion = (documentId) => {
    return api.get(`/document/getDocumentVersion/${documentId}`);
};

fileFun.rollbackDocumentVersion = (documentId, versionId) => {
    return api.post(`/document/rollbackDocumentVersion/${documentId}/${versionId}`);
};

fileFun.setUserAbility = (DocumentPermissionsDTO) => {
    return api.post(`/document/setUserAbility`, DocumentPermissionsDTO);
};
fileFun.getTemplateShow = () => {
    return api.get(`/document/getTemplateShow`);
};
fileFun.getDeletedDocuments = (userId) => {
    return api.get(`/document/getDeletedDocuments/${userId}`);
};
fileFun.getParticipants = (documentId) => {
    return api.get(`/document/getParticipants/${documentId}`);
};
fileFun.getDocumentById = (documentId) => {
    return api.get(`/document/getDocumentById/${documentId}`);
};
fileFun.setDocumentAsTemplate = (documentId) => {
    return api.post(`/document/setDocumentAsTemplate/${documentId}`);
};
fileFun.saveTemplate = (Id) => {
    return api.post(`/document/saveTemplate/${Id}`);
};
fileFun.useTemplate = (Id) => {
    return api.post(`/document/useTemplate/${Id}`);
};
fileFun.getShare = (userId) => {
    return api.get(`/document/getShare/${userId}`);
};
fileFun.getTemplateDocument = () => {
    return api.get(`/document/getTemplateDocument`);
};
fileFun.getMyTemplateDocument = (userId) => {
    return api.get(`/document/getTemplateDocument/${userId}`);
};

export default fileFun;