
import api from "../request";
let styleFun = {
};
styleFun.getStyleByUserId= (userId) => {
    return api.getParam("/style/getStyleByUserId",null,{userId:userId});
};
styleFun.editStyle= (StyleEditDTO) => {
    return api.getParam("/style/editStyle",null,StyleEditDTO);
};
styleFun.deleteStyle= (keyword) => {
    return api.getParam("/style/deleteStyle",null,{keyword:keyword});
};
export default styleFun;