
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
toolFun.updateStatus= (UpdateTodoListsStatusDTO) => {
    return api.post(`/todoLists/updateStatus`,UpdateTodoListsStatusDTO);
};
toolFun.update= (TodoListsDTO) => {
    return api.post("/todoLists/update",TodoListsDTO);
};
export default toolFun;