import Request from "./index.js";
// ,{stringifyWithTrim}

const api={
    post(url, params){
      return Request(url,{   
        method: "POST",
        data:params,
      })
    },
    get(url,?query){
      return Request(`url?${query}`)
    }
}

export default api;