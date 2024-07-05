import Request,{stringifyWithTrim} from "./index.js";


const api={
    post(url, obj){
      return Request(url,{
        
        method: "POST",
        data:obj,
      })
    },
    get(url,query){
      return Request(`url?${stringifyWithTrim(query)}`)
    }
}

export default api;