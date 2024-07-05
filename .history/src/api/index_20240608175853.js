import { extend } from "umi-request";
import { App } from 'antd';
// import { stringify } from "qs";

const errorHandler = (
    err
) => {
  const { message, notification, modal } = App.useApp();
  message.destroy();
  message.error(err.description || "接口请求失败，请稍后再试...");
  return {
    code: -1,
  };
};

const Request = extend({
  prefix:'http://192.168.50.41:8085',
  timeout: 30000,
  errorHandler,
});

Request.interceptors.request.use((url, options) => {
  return {
    url,
    options,
  };
});

Request.interceptors.response.use((response) => {
  return new Promise(function (resolve, reject) {
    response.text().then((res) => {
      let resData;
      try {
        resData = JSON.parse(res);
      } catch (err) {
        resData = { code: -1 };
      }
      if (resData.responseCode === 200) {
        resolve(resData);
      } else {
        reject(resData);
      }
    });
  });
});
export default Request;
export function stringifyWithTrim(params = {}) {
  function encoder(str, defaultEncoder) {
    // 前后去空格
    if (typeof str === "string") {
      return defaultEncoder(str.trim());
    }
    return defaultEncoder(str);
  }
  return stringify(params, { encoder });
}