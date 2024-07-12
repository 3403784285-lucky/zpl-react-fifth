
import api from "../request";

let orderFun = {
    
};
orderFun.index = () => {
    return api.post("/order/createOrderBuyPoints");
};



export default orderFun;