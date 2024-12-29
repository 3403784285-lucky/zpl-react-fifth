
import api from "../request";
let toolFun = {
};
toolFun.getList= () => {
    return api.get(`/todoLists/list`);
};
toolFun.editStyle= (StyleEditDTO) => {
    return api.post("/todoLists/add",StyleEditDTO);
};
toolFun.deleteStyle= (StyleEditDTO) => {
    return api.post("/style/deleteStyle",StyleEditDTO);
};
toolFun.addStyle= (StyleEditDTO) => {
    return api.post("/style/addStyle",StyleEditDTO);
};
export default toolFun;