
import api from "../request";
let toolFun = {
};
toolFun.getStyleByUserId= (userId) => {
    return api.getParam(`/style/getStyleByUserId/${userId}`);
};
toolFun.editStyle= (StyleEditDTO) => {
    return api.post("/style/editStyle",StyleEditDTO);
};
toolFun.deleteStyle= (StyleEditDTO) => {
    return api.post("/style/deleteStyle",StyleEditDTO);
};
toolFun.addStyle= (StyleEditDTO) => {
    return api.post("/style/addStyle",StyleEditDTO);
};
export default toolFun;