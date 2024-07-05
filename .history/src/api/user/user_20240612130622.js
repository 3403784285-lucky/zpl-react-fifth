
import api from "../request";

let userFun = {
    
};
userFun.login = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};

userFun.searchUser = (userId) => {
    return api.get(`/user/${userId}`);
};

userFun.searchUsers = () => {
    return api.get(`/user`);
};

userFun.getFolders = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default userFun;