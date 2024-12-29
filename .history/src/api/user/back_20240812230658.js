
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
backFun.getUserList= () => {
    return api.post("/admin/getUserList");
};
backFun.updateUserStatus= (userId) => {
    return api.postParam("/admin/updateUserStatus",null,{userId:userId});
};

backFun.getPriceTable= () => {
    return api.get("/admin/getPriceTable");
};

backFun.deletePriceTable =(id) => {
    return api.deleteParam("/admin/deletePriceTable",null,{id:id});
};
backFun.getDeletedPriceTable= (PriceUpdateDTO) => {
    return api.get("/admin/getDeletedPriceTable",PriceUpdateDTO);
};
backFun.managePriceTable= () => {
    return api.post("/admin/managePriceTable");
};
backFun.getDeletedPriceTable= () => {
    return api.get("/admin/getDeletedPriceTable");
};
export default backFun;