
import api from "../request";

let elementFun = {
    
};
elementFun.index = () => {
    return api.get("/element/index");
};

elementFun.add = (id) => {
    return api.get(`/element/add/${id}`);
};
elementFun.add = (id) => {
    return api.get(`/element/user/${userId}`);
};

export default elementFun;