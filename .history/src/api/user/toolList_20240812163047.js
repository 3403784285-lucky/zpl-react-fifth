
import api from "../request";
let toolFun = {
};
toolFun.getList= () => {
    return api.get(`/todoLists/list`);
};
toolFun.add= (TodoListsAddDTO) => {
    return api.post("/todoLists/add",TodoListsAddDTO);
};
toolFun.delete= (id) => {
    return api.delete(`/todoLists/delete/${id}`);
};
toolFun.addStyle= (StyleEditDTO) => {
    return api.post("/style/addStyle",StyleEditDTO);
};
export default toolFun;