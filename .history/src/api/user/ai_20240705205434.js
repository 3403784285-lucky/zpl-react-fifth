
import api from "../request";

let aiFun = {
    
};
aiFun.textContinuation= (data) => {
    return api.upload("/ai/textContinuation", data);
};

aiFun.textCorrection = (data) => {
    return api.upload(`/ai/textCorrection`,data);
};
aiFun.textCorrection = (data) => {
    return api.upload(`/ai/textCorrection`,data);
};

aiFun.searchUsers = () => {
    return api.get(`/ai`);
};

aiFun.getFolders = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default aiFun;