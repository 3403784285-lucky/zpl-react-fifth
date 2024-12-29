
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

backFun.deletePriceTable =() => {
    return api.delete("/admin/deletePriceTable");
};
backFun.getUserList= () => {
    return api.post("/admin/getUserList");
};
export default backFun;