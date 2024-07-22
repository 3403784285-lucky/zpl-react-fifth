
import api from "../request";

let orderFun = {
    
};
orderFun.createOrderBuyPoints = (OrderBuyPointsDTO) => {
    return api.post("/order/createOrderBuyPoints",OrderBuyPointsDTO);
};
orderFun.cancelOrder = (orderId) => {
    return api.post(`/order/cancelOrder/${orderId}`);
};
orderFun.getUserAllOrder= () => {
    return api.get("/order/getUserAllOrder");
};
orderFun.deleteOrder= (orderId) => {
    return api.post(`/order/deleteOrder/${orderId}`);
};



export default orderFun;