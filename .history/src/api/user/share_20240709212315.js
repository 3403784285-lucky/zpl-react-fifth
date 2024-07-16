
import api from "../request";

let shareCFun = {

};
shareFun.document = (ShareDTO) => {
    return api.post("/share/document",ShareDTO);
};
shareFun.folder = (ShareDTO) => {
    return api.post("/share/folder", ShareDTO);
};
shareFun.documentLink = (ShareDTO, link) => {
    return api.get(`/share/document/${link}`, ShareDTO);
};
shareFun.access = (userId, documentId) => {
    return api.post("/share/access", null, {
        params: {
            userId: userId,
            documentId: documentId
        }
    });
};
shareFun.recent = (userId) => {
    return api.get("/share/recent",userId);
};


export default shareCFun;