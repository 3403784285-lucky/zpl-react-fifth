import request,{stringifyWithTrim} from "./index.js";


const api={
    post(url,params){
      return request(url, {
        method: "POST",
        params,
      })
    },
    get(url,query){
      return request(`url?${stringifyWithTrim(query)}`)
    }
}

export default api;