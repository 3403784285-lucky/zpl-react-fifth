
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
    return api.getParam("/style/deleteStyle",StyleEditDTO);
};
export default styleFun;