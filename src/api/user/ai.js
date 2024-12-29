
import api from "../request";

let aiFun = {

};


aiFun.getHot= () => {
    return api.post("/ai/hot");
};

aiFun.textContinuation= (data) => {
    return api.upload("/ai/textContinuation", data);
};

aiFun.textCorrection = (data) => {
    return api.upload(`/ai/textCorrection`,data);
};
aiFun.mindMap = (data) => {
    return api.upload(`/ai/mindMap`,data);
};

aiFun.titleGeneration = (data) => {
    return api.upload(`/ai/titleGeneration`,data);
};

aiFun.textSummarization = (data) => {
    return api.upload(`/ai/textSummarization`,data);
};
aiFun.textBeautification = (data) => {
    return api.upload(`/ai/textBeautification`,data);
};
aiFun.expansion = (data) => {
    return api.upload(`/ai/expansion`,data);
};
aiFun.rewrite = (data) => {
    return api.upload(`/ai/rewrite`,data);
};
aiFun.fixFormat = (data) => {
    return api.upload(`/ai/fixFormat`,data);
};
aiFun.createChart = (data) => {
    return api.upload(`/ai/createChart`,data);
};
aiFun.paperOutlineGeneration = (data) => {
    return api.upload(`/ai/paperOutlineGeneration`,data);
};

aiFun.paperContentGeneration = (data) => {
    return api.upload(`/ai/paperContentGeneration`,data);
};

aiFun.visual = (data) => {
    const { userInput, chartType } = data;
    return api.postParam('/ai/echarts', null, { userInput, chartType });
};


aiFun.visual2 = (data) => {
    return api.upload1(`/ai/echarts`,data);
};


aiFun.paperReview = (PaperReviewRequestDTO) => {
    return api.post(`/ai/paperReview`,PaperReviewRequestDTO);
};

aiFun.deduct = (name) => {
    return api.postParam(`/ai/deduct`,null,{apiName:name});
};



aiFun.aiDocumentAssistant = (data) => {
    return api.post(`/ai/aiDocumentAssistant`,data);
};

aiFun.baidu = (data) => {
    return api.upload(`/ai/baidu`,data);
};
aiFun.translate = (data) => {
    return api.upload(`/ai/translate`,data);
};

aiFun.ocr = (data) => {
    return api.upload(`/ai/ocr`,data);
};
aiFun.asr = (data) => {
    return api.upload(`/ai/asr`,data);
};
aiFun.ocrTable = (data) => {
    return api.upload(`/ai/ocrTable`,data);
};
aiFun.fixFormat = (data) => {
    return api.post(`/ai/fixFormat`,data);
};


export default aiFun;
