
import api from "../request";

let orderFun = {

};
orderFun.getUserAllOrder= () => {
    return api.get("/order/getUserAllOrder");
};


export default orderFun;