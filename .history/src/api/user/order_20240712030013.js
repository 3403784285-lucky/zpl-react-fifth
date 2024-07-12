
import api from "../request";

let orderFun = {
    
};
orderFun.index = () => {
    return api.get("/element/index");
};



export default orderFun;