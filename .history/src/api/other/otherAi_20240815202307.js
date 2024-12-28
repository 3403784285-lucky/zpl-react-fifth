
import api from "./otherRequest";

let aiOtherFun = {
    
};

aiOtherFun.textContinuation= () => {
    return api.upload("/ai/hot");
};


export default aiFun;