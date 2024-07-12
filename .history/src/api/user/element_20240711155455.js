
import api from "../request";

let elementFun = {
    
};
elementFun.login = (userLoginDTO) => {
    return api.post("/element/index", userLoginDTO);
};



export default elementFun;