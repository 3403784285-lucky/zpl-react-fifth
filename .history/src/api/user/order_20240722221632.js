
import api from "../request";

let orderFun = {
    
};
orderFun.createOrderBuyPoints = (OrderBuyPointsDTO
) => {
    return api.post("/order/createOrderBuyPoints",OrderBuyPointsDTO);
};
orderFun.cancelOrder = (OrderBuyPointsDTO) => {
    return api.post("/order/cancelOrder/{orderId}",OrderBuyPointsDTO);
};
orderFun.createOrderBuyPoints = (OrderBuyPointsDTO
) => {
    return api.post("/order/createOrderBuyPoints",OrderBuyPointsDTO);
};


export default orderFun;