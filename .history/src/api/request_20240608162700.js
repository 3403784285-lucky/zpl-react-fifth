import Request,{stringifyWithTrim} from "./index.js";


const api={
    post(url, params){
      return Request(url,{   
        method: "POST",
        data:params,
      })
    },
    get(url,query){
      return Request(`url?${stringifyWithTrim(query)}`)
    }
}

export default api;