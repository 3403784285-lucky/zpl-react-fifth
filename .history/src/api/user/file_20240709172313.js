
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
fileFun.delete = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};
fileFun.search = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};
fileFun.favorite = (FavoriteDocumentDTO) => {
    return api.post("/document/favoriteDocument", FavoriteDocumentDTO);
};
fileFun.upload = (file) => {
    return api.upload("/files/upload", file);
};
fileFun.getAllUserDocument = (userId) => {
    return api.get(`/document/getAllUserDocument/${userId}`);
};
fileFun.getDocumentById= (document) => {
    return api.get(`/document/getDocumentById/${documentId}`);
};
fileFun.favoriteDocument = (FavoriteDocumentDTO) => {
    return api.post("/document/favoriteDocument", FavoriteDocumentDTO);
};
fileFun.toggleFavoriteTemplate = (FavoriteTemplateDTO) => {
    return api.post("/document/toggleFavoriteTemplate", FavoriteTemplateDTO);
};
fileFun.userFavoriteDocuments = (userId) => {
    return api.get(`/document/userFavoriteDocuments/${userId}`);
};
fileFun.userFavoriteTemplates = (userId) => {
    return api.get(`/document/userFavoriteTemplates/${userId}`);
};
fileFun.likeDocument = (UserDocumentLikeDTO) => {
    return api.post(`/document/likeDocument`,UserDocumentLikeDTO);
};
fileFun.create = (DocumentUploadDTO) => {
    return api.post(`/document/create`,DocumentUploadDTO);
};
fileFun.update = (documentId,DocumentUpdateDTO) => {
    return api.put(`/document/update/${documentId}`,DocumentUpdateDTO);
};
fileFun.delete = (documentId) => {
    return api.delete(`/document/delete/${documentId}`);
};
fileFun.setVisibility = (documentId) => {
    return api.put(`/document/setVisibility/${documentId}`);
};
fileFun.setUserAbility = (DocumentPermissionsDTO) => {
    return api.post(`/document/setUserAbility`,DocumentPermissionsDTO);
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
fileFun.setDocumentAsTemplate = (documentId) => {
    return api.get(`/document/setDocumentAsTemplate/${documentId}`);
};

export default fileFun;