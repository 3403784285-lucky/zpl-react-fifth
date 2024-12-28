
import api from "../request";
let backFun = {
};
backFun.updateApiInfo= (ApiInfoDTO) => {
    return api.post(`/admin/updateApiInfo`,ApiInfoDTO);
};
backFun.getScoreAndSales= () => {
    return api.get("/admin/getScoreAndSales");
};
backFun.getUsersCount= () => {
    return api.get(`/admin/getUsersCount`);
};
backFun.getUnpaidOrders= () => {
    return api.post(`/admin/getUnpaidOrders`);
};
backFun.update= (TodoListsDTO) => {
    return api.post("/todoLists/update",TodoListsDTO);
};
export default backFun;