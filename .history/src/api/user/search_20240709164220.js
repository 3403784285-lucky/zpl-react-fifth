
import api from "../request";

let searchFun = {

};
searchFun.byName= () => {
    return api.get("/search/byName");
};


export default searchFun;