
import api from "../request";

let searchFun = {

};
searchFun.byName= (keyword) => {
    return api.getParam("/search/byName",null,{keyword:keyword});
};
searchFun.byCreator= (keyword) => {
    return api.get("/search/byCreator",null,{params:{keyword:keyword}});
};
searchFun.byContent= (keyword) => {
    return api.get("/search/byContent",null,{params:{keyword:keyword}});
};


export default searchFun;