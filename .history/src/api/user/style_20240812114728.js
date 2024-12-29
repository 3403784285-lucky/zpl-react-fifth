
import api from "../request";
let styleFun = {
};
styleFun.getStyleByUserId= (userId) => {
    return api.getParam(`/style/getStyleByUserId/${userId}`);
};
styleFun.editStyle= (StyleEditDTO) => {
    return api.post("/style/editStyle",StyleEditDTO);
};
styleFun.deleteStyle= (StyleEditDTO) => {
    return api.post("/style/deleteStyle",StyleEditDTO);
};
styleFun.addStyle= (StyleEditDTO) => {
    return api.post("/style/addStyle",StyleEditDTO);
};
export default styleFun;