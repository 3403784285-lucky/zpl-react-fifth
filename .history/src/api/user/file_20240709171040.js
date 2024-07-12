
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
    return api.post(`/document/likeDocument`);
};
fileFun.create = (DocumentUploadDTO) => {
    return api.post(`/document/create`,DocumentUploadDTO);
};
fileFun.likeDocument = (UserDocumentLikeDTO) => {
    return api.put(`/document/update/{documentId}`);
};
fileFun.likeDocument = (UserDocumentLikeDTO) => {
    return api.post(`/document/likeDocument`);
};
fileFun.likeDocument = (UserDocumentLikeDTO) => {
    return api.post(`/document/likeDocument`);
};
fileFun.likeDocument = (UserDocumentLikeDTO) => {
    return api.post(`/document/likeDocument`);
};
fileFun.likeDocument = (UserDocumentLikeDTO) => {
    return api.post(`/document/likeDocument`);
};
fileFun.likeDocument = (UserDocumentLikeDTO) => {
    return api.post(`/document/likeDocument`);
};


export default fileFun;