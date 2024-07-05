
import api from "../request";

let aiFun = {
    
};
aiFun.login = (aiLoginDTO) => {
    return api.post("/ai/login", aiLoginDTO);
};

aiFun.searchUser = (aiId) => {
    return api.get(`/ai/${aiId}`);
};

aiFun.searchUsers = () => {
    return api.get(`/ai`);
};

aiFun.getFolders = () => {
    return api.get(`/folder/getFolderDocument`);
};


export default aiFun;