
import api from "../request";

let styleFun = {

};
styleFun.getStyleByUserId= (userId) => {
    return api.getParam("/style/getStyleByUserId",null,{userId:userId});
};
styleFun.byCreator= (keyword) => {
    return api.getParam("/search/byCreator",null,{keyword:keyword});
};
styleFun.byContent= (keyword) => {
    return api.getParam("/search/byContent",null,{keyword:keyword});
};


export default styleFun;