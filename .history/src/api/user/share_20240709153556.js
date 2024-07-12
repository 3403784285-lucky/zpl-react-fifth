
import api from "../request";

let shareFun = {

};
shareFun.document = () => {
    return api.get("/user/login");
};
    
export default shareFun;