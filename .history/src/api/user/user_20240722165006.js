
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
userFun.getUser = (userid) => {
    return api.get(`/user/${userid}`);
};

//分页查询所有数据
userFun.searchUsers = () => {
    return api.get(`/user`);
};
userFun.update= (nickname,avatar,id) => {
    return api.put(`/user/update`,{nickname,avatar,id});
};
userFun.delete = (userId) => {
    return api.delete(`/user/delete/${userId}`);
};
userFun.getUserByToken = () => {
    return api.get(`/user/getUserByToken`);
};
userFun.sign = () => {
    return api.post(`/user/sign`);
};
userFun.checkSign = () => {
    return api.get(`/user/checkSign`);
};
userFun.shareCollaboration = (collaborationDTO) => {
    return api.post(`/user/collaboration`,collaborationDTO);
};

userFun.getFolders = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default userFun;