
import api from "../request";

let aiFun = {
    
};
aiFun.textContinuation= (data) => {
    return api.upload("/ai/textContinuation", data);
};

aiFun.textCorrection = (aiId) => {
    return api.get(`/ai/${aiId}`);
};

aiFun.searchUsers = () => {
    return api.get(`/ai`);
};

aiFun.getFolders = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default aiFun;