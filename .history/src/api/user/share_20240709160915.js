
import api from "../request";

let shareFun = {

};
shareFun.document = (ShareDTO) => {
    return api.post("/share/document",);
};
shareFun.folder = (ShareDTO) => {
    return api.post("/share/folder",ShareDTO);
};
shareFun.documentLink = (ShareDTO,link) => {
    return api.get(`/share/document/${link}`,ShareDTO);
};
shareFun.access = (userId,DocumentId) => {
    return api.post("/share/access",{});
};
shareFun.document = (ShareDTO) => {
    return api.post("/share/document",);
};
shareFun.document = (ShareDTO) => {
    return api.post("/share/document",);
};
shareFun.document = (ShareDTO) => {
    return api.post("/share/document",);
};

export default shareFun;