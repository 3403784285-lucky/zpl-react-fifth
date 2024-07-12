import Request from "./index.js";
// ,{stringifyWithTrim}

const api={
    post(url, params){
      return Request(url,{   
        method: "POST",
        data:params,
      })
    },
    put(url, params){
      return Request(url,{   
        method: "PUT",
        data:params,
      })
    },
    putParam(url, params,param){
      return Request(url,{   
        method: "PUT",
        data:params,
        params:param
      })
    },
    getParam(url, params,param){
      return Request(url,{   
        method: "GET",
        data:params,
        params:param
      })
    },

    delete(url, params){
      return Request(url,{   
        method: "DELETE",
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