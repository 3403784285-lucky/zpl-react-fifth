
import api from "../request";

let elementFun = {
    
};
elementFun.index = () => {
    return api.get("/element/index");
};



export default elementFun;