
import api from "../request";

let orderFun = {

};
orderFun.byName= (keyword) => {
    return api.getParam("/search/byName",null,{keyword:keyword});
};
orderFun.byCreator= (keyword) => {
    return api.getParam("/search/byCreator",null,{keyword:keyword});
};
orderFun.byContent= (keyword) => {
    return api.getParam("/search/byContent",null,{keyword:keyword});
};


export default orderFun;