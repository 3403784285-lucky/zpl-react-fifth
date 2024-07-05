
let userFun = {
    
};
userFun.login = (userLoginDTO) => {
    return http.get("/user/login", userLoginDTO);
};
export default userFun;