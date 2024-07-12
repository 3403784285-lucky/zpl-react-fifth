
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
fileFun.userFavoriteDocuments = (userId) => {
    return api.get(`/document/userFavoriteDocuments/${userId}`);
};
fileFun.userFavoriteDocuments = (userId) => {
    return api.get(`/document/userFavoriteDocuments/${userId}`);
};

export default fileFun;