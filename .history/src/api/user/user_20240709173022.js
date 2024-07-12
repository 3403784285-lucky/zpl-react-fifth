
import api from "../request";

let userFun = {
    
};
userFun.login = (userLoginDTO) => {
    return api.post("/user/login", userLoginDTO);
};

userFun.register = (User) => {
    return api.post("/user/register", User);
};

userFun.searchUser = (userId) => {
    return api.get(`/user/${userId}`);
};
//分页查询所有数据
userFun.searchUsers = () => {
    return api.get(`/user`);
};
userFun.update= () => {
    return api.put(`/user/update`);
};
userFun.delete = (userId) => {
    return api.delete(`/user/delete/${userId}`);
};
userFun.getUserByToken = () => {
    return api.get(`/user/getUserByToken`);
};
userFun.searchUsers = () => {
    return api.get(`/user`);
};


userFun.getFolders = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default userFun;