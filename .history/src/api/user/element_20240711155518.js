
import api from "../request";

let elementFun = {
    
};
elementFun.index = () => {
    return api.post("/element/index");
};



export default elementFun;