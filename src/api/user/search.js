
import api from "../request";

let searchFun = {

};
searchFun.byName= (keyword) => {
    return api.getParam("/search/byName",null,{keyword:keyword});
};
searchFun.byCreator= (keyword) => {
    return api.getParam("/search/byCreator",null,{keyword:keyword});
};
searchFun.byContent= (keyword) => {
    return api.getParam("/search/byContent",null,{keyword:keyword});
};


export default searchFun;