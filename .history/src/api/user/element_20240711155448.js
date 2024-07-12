
import api from "../request";

let elementFun = {
    
};
elementFun.login = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};



export default elementFun;