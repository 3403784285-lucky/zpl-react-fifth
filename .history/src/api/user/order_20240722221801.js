
import api from "../request";

let orderFun = {
    
};
orderFun.createOrderBuyPoints = (OrderBuyPointsDTO) => {
    return api.post("/order/createOrderBuyPoints",OrderBuyPointsDTO);
};
orderFun.cancelOrder = (OrderBuyPointsDTO) => {
    return api.post("/order/cancelOrder/{orderId}",OrderBuyPointsDTO);
};
orderFun.getUserAllOrder= () => {
    return api.get("/order/getUserAllOrder");
};


export default orderFun;