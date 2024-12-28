
import api from "../request";

let styleFun = {

};
styleFun.byName= (keyword) => {
    return api.getParam("/style/getStyleByUserId",null,{keyword:keyword});
};
styleFun.byCreator= (keyword) => {
    return api.getParam("/search/byCreator",null,{keyword:keyword});
};
styleFun.byContent= (keyword) => {
    return api.getParam("/search/byContent",null,{keyword:keyword});
};


export default styleFun;