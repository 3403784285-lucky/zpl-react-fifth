
import api from "../request";
let styleFun = {
};
styleFun.getStyleByUserId= (userId) => {
    return api.getParam("/style/getStyleByUserId",null,{userId:userId});
};
styleFun.editStyle= (keyword) => {
    return api.getParam("/style/editStyle",null,{keyword:keyword});
};
styleFun.deleteStyle= (keyword) => {
    return api.getParam("/style/deleteStyle",null,{keyword:keyword});
};
export default styleFun;