
import api from "../request";

let userFun = {
    
};
userFun.login = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};

userFun.searchUser = () => {
    return api.get(`/user/${userId}`);
};
export default userFun;