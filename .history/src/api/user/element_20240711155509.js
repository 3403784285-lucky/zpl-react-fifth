
import api from "../request";

let elementFun = {
    
};
elementFun.login = () => {
    return api.post("/element/index");
};



export default elementFun;