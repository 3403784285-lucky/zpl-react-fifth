
import api from "../request";

let userFun = {
    
};
userFun.login = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};

userFun.register = (userLoginDTO) => {
    return api.post("/user/register", userLoginDTO);
};

userFun.searchUser = (userId) => {
    return api.get(`/user/${userId}`);
};
//分页查询所有数据

userFun.searchUsers = () => {
    return api.get(`/user`);
};

userFun.getFolders = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default userFun;