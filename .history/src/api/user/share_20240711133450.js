
import api from "../request";

let shareCFun = {

};
shareCFun.document = (ShareDTO) => {
    return api.post("/share/document",ShareDTO);
};
shareCFun.folder = (ShareDTO) => {
    return api.post("/share/folder", ShareDTO);
};
shareCFun.documentLink = (ShareDTO, link) => {
    return api.get(`/share/document/${link}`, ShareDTO);
};
shareCFun.access = (userId, documentId) => {
    return api.post("/share/access", null, {
        params: {
            userId: userId,
            documentId: documentId
        }
    });
};
shareCFun.recent = (userId) => {
    return api.get(`/share/recent/${userId} `);
};




export default shareCFun;