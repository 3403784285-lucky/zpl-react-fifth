
import api from "../request";

let orderFun = {
    
};
orderFun.createOrderBuyPoints = () => {
    return api.post("/order/createOrderBuyPoints");
};



export default orderFun;