
import api from "../request";
let backFun = {

};


backFun.getNotices = (currentPage, pageSize) => {
    const query = `page=${currentPage}&pageSize=${pageSize}`;
    return api.get(`/admin/getNoticePage`, query);
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
    return api.get(`/admin/getUnpaidOrders`);
};
backFun.getUserList= () => {
    return api.get("/admin/getUserList");
};
backFun.getApiInfoList= () => {
    return api.get("/admin/getApiInfoList");
};
backFun.getApiInfoCount= () => {
    return api.get("/admin/getApiInfoCount");
};

backFun.getPaidOrders= () => {
    return api.get("/admin/getPaidOrders");
};


// 获取积分数据
backFun.getPointsData = (type) => {
    return api.get("/admin/getPriceTableByType", `ItemType=${type}`).then((response) => {
        // 假设返回的数据结构是 { data: [...] }
        return response.data.map((item) => ({
            ...item,
            description: `增加${item.addPoints}积分到钱包`,
            productType: 'BUY_POINTS'
        }));
    });
};

// 获取会员数据
backFun.getPointsDataMember = (type) => {
    return api.get("/admin/getPriceTableByType", `ItemType=${type}`).then((response) => {
        return response.data.map((item) => ({
            ...item,
            description: `购买${item.addPoints}个月会员`,
            productType: 'BUY_MEMBER'
        }));
    });
};



/*backFun.addOrder = (order) => {
    return api.post("/admin/addOrder", order);
};
backFun.updateOrder = (order) => {
    return api.put("/admin/updateOrder", order);
};
backFun.deleteOrder = (id) => {
    return api.delete(`/admin/deleteOrder/${id}`);
};*/
backFun.getNotice= () => {
    return api.get("/admin/getNotice");
};

backFun.updateUserStatus= (userId) => {
    return api.postParam("/admin/updateUserStatus",null,{userId:userId});
};

backFun.getPriceTable = () => {
    return api.get("/admin/getPriceTable");
};
backFun.addPriceItem = (item) => {
    return api.post("/admin/addPriceItem", item);
};
backFun.updatePriceItem = (item) => {
    return api.post("/admin/managePriceTable", item);
};
backFun.togglePriceItemStatus = (item) => {
    return api.put("/admin/togglePriceItemStatus", item);
};
backFun.deletePriceItem =(id) => {
    return api.deleteParam("/admin/deletePriceTable",null,{id:id});
};
backFun.getDeletedPriceTable= (PriceUpdateDTO) => {
    return api.get("/admin/getDeletedPriceTable",PriceUpdateDTO);
};
backFun.getPriceTableLog= () => {
    return api.get("/admin/getPriceTableLog");
};
export default backFun;
