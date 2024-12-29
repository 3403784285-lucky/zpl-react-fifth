
import api from "../request";
let backFun = {
};
backFun.getList= () => {
    return api.get(`/todoLists/list`);
};
backFun.add= (TodoListsAddDTO) => {
    return api.post("/todoLists/add",TodoListsAddDTO);
};
backFun.delete= (id) => {
    return api.delete(`/todoLists/delete/${id}`);
};
backFun.updateStatus= (UpdateTodoListsStatusDTO) => {
    return api.post(`/todoLists/updateStatus`,UpdateTodoListsStatusDTO);
};
backFun.update= (TodoListsDTO) => {
    return api.post("/todoLists/update",TodoListsDTO);
};
export default backFun;