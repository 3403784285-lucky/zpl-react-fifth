
import api from "../request";

let shareFun = {

};
shareFun.document = (ShareDTO) => {
    return api.post("/share/document",);
};


shareFun.folder = (ShareDTO) => {
    return api.post("/share/folder",ShareDTO);
};
shareFun.document = (ShareDTO) => {
    return api.get("/share/document/",);
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
shareFun.document = (ShareDTO) => {
    return api.post("/share/document",);
};

export default shareFun;