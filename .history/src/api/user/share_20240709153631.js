
import api from "../request";

let shareFun = {

};
shareFun.document = () => {
    return api.post("/user/login");
};

export default shareFun;