
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
aiFun.textBeautification = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};
aiFun.expansion = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};
aiFun.rewrite = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};
aiFun.fixFormat = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};
aiFun.createChart = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};
aiFun.paperOutlineGeneration = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};

aiFun.paperContentGeneration = (data) => {
    return api.upload(`/ai/paperContentGeneration`,data);
};



aiFun.baidu = (data) => {
    return api.upload(`/ai/baidu`,data);
};

aiFun.ocr = (data) => {
    return api.upload(`/ai/ocr`,data);
};
aiFun.fixFormat = (data) => {
    return api.post(`/ai/fixFormat`,data);
};


export default aiFun;