
import api from "../request";

let elementFun = {
    
};
elementFun.index = () => {
    return api.get("/element/index");
};

elementFun.add = (id) => {
    return api.get(`/element/add/${id}`);
};

export default elementFun;