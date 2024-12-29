
import api from "./otherRequest";

let aiOtherFun = {
    
};

aiOtherFun.textContinuation= () => {
    return api.post("/ai/hot");
};


export default aiFun;