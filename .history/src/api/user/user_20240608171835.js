import api from "./request";
//文件上传
let userFun = {
    
};
fileFun.login = (userLoginDTO) => {
    return http.get("/user/login", userLoginDTO);
};
export default userFun;