
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
backFun.updateUserStatus= () => {
    return api.post("/admin/updateUserStatus");
};

backFun.getUserList= () => {
    return api.post("/admin/getUserList");
};

backFun.getUserList= () => {
    return api.post("/admin/getUserList");
};
backFun.getUserList= () => {
    return api.post("/admin/getUserList");
};
export default backFun;