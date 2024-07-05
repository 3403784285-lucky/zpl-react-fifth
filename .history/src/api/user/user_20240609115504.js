
import api from "../request";

let userFun = {
    
};
userFun.login = (userLoginDTO) => {
    return api.post("/dev-api/user/login", userLoginDTO);
};

userFun.searchUser = (userId) => {
    return api.get(`/user/${userId}`);
};
export default userFun;