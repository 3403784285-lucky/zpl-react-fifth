
import api from "../request";

let orderFun = {

};
orderFun.byName= (keyword) => {
    return api.post("/order/getUserAllOrder",null,{keyword:keyword});
};
orderFun.byCreator= (keyword) => {
    return api.getParam("/search/byCreator",null,{keyword:keyword});
};
orderFun.byContent= (keyword) => {
    return api.getParam("/search/byContent",null,{keyword:keyword});
};


export default orderFun;