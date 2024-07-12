
import api from "../request";

let foldersFun = {

};
fileFun.getFiles = () => {
    return api.get("/folder/createFolder");
};


export default foldersFun;