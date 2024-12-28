import { extend } from "umi-request";
import { message } from 'antd';
// import store from '../store';//引入sto
// import { stringify } from "qs";
import { useStorage } from "web-localstorage-plus";
const errorHandler = (
  err
) => {
  message.destroy();
  message.error(err.msg || "接口请求失败，请稍后再试...");
  console.log(err)
  return {
    err
  };
};
const Request = extend({
  prefix: 'http://192.168.50.150:5000',
  timeout: 300000,
  errorHandler,
});
Request.interceptors.request.use((url, options) => {
  // const token = store.getState().token.value;
  // storage.setItem("token","")
  const storage = useStorage();
  const token = storage.getItem?.("token")
  const userId = storage.getItem?.("openid")
  const documentId = storage.getItem?.("documentId")
  if (!token || !userId) {
    return {
      url,
      options
    }
  }

  const headers = {
    Authorization: token,
    userId: userId,
    documentId: documentId ?? ""
  }
  return {
    url,
    options: { ...options, headers }
  }


});



export default Request;
// export function stringifyWithTrim(params = {}) {
//   function encoder(str, defaultEncoder) {
//     // 前后去空格
//     if (typeof str === "string") {
//       return defaultEncoder(str.trim());
//     }
//     return defaultEncoder(str);
//   }
//   return stringify(params, { encoder });
// }