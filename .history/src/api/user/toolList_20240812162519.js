
import api from "../request";
let toolFun = {
};
toolFun.getList= (userId) => {
    return api.get(`/todoLists/list`);
};
toolFun.editStyle= (StyleEditDTO) => {
    return api.post("/style/editStyle",StyleEditDTO);
};
toolFun.deleteStyle= (StyleEditDTO) => {
    return api.post("/style/deleteStyle",StyleEditDTO);
};
toolFun.addStyle= (StyleEditDTO) => {
    return api.post("/style/addStyle",StyleEditDTO);
};
export default toolFun;