
import api from "../request";

let orderFun = {

};
orderFun.byName= () => {
    return api.post("/order/getUserAllOrder",null,{keyword:keyword});
};


export default orderFun;