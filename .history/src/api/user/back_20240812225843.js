
import api from "../request";
let backFun = {
};
backFun.updateApiInfo= () => {
    return api.post(`/admin/updateApiInfo`);
};
backFun.getScoreAndSales= () => {
    return api.get("/admin/getScoreAndSales");
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