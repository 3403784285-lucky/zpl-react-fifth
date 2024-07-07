
import api from "../request";

let aiFun = {
    
};
aiFun.textContinuation= (data) => {
    return api.upload("/ai/textContinuation", data);
};

aiFun.textCorrection = (data) => {
    return api.upload(`/ai/textCorrection`,data);
};
aiFun.titleGeneration = (data) => {
    return api.upload(`/ai/titleGeneration`,data);
};

aiFun.textSummarization = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};

aiFun.getFolders = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default aiFun;