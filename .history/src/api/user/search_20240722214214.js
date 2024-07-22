
import api from "../request";

let orderFun = {

};
orderFun.getUserAllOrder= () => {
    return api.get("/order/getUserAllOrder",null,{keyword:keyword});
};


export default orderFun;