
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
toolFun.update= (StyleEditDTO) => {
    return api.post("/todoLists/update",StyleEditDTO);
};
export default toolFun;