
import api from "./otherRequest";

let aiOtherFun = {
    
};

aiOtherFun.textContinuation= (data) => {
    return api.upload("/textContinuation",data);
};


export default aiFun;