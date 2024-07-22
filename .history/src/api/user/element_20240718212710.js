
import api from "../request";

let elementFun = {
    
};
elementFun.index = () => {
    return api.get("/element/index");
};
elementFun.index = () => {
    return api.post("/element/upload");
};

elementFun.add = (id) => {
    return api.get(`/element/add/${id}`);
};
elementFun.getAll = (userId) => {
    return api.get(`/element/user/${userId}`);
};

export default elementFun;