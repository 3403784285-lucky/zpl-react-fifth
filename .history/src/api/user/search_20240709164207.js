
import api from "../request";

let searchFun = {

};
searchFun.getFiles = () => {
    return api.get("/user/login");
};


export default searchFun;