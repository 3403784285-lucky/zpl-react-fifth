import Request from "./index.js";
// ,{stringifyWithTrim}

const api={
    post(url, params){
      return Request(url,{   
        method: "POST",
        data:params,
      })
    },
    upload(url, params){
      return Request(url,{   
        method: "POST",
        requestType:'form',
        data:params,
      })
    },
    get(url, query = '') {
      // 如果 query 存在且不为空字符串，拼接问号和查询参数
      const queryString = query ? `?${query}` : '';
      return Request(`${url}${queryString}`);
    }
}

export default api;