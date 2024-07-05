
import api from "../request";

let fileFun = {
    
};
fileFun.login = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};
export default fileFun;