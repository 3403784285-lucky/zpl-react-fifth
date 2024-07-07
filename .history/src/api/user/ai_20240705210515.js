
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

aiFun.paperContentGeneration = (data) => {
    return api.upload(`/ai/paperContentGeneration`,data);
};

aiFun.textSummarization = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};

aiFun.textSummarization = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};

aiFun.textSummarization = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};


export default aiFun;