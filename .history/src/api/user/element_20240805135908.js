
import api from "../request";

let elementFun = {
    
};
elementFun.index = () => {
    return api.get("/element/index");
};
elementFun.upload = (ElementDTO) => {
    return api.post("/element/upload",ElementDTO);
};
elementFun.edit = (ElementDTO) => {
    return api.post("/element/edit",ElementDTO);
};

elementFun.add = (id) => {
    return api.get(`/element/add/${id}`);
};
elementFun.delete = (id) => {
    return api.get(`/element/delete/${id}`);
};
elementFun.getAll = (userId) => {
    return api.get(`/element/user/${userId}`);
};

export default elementFun;