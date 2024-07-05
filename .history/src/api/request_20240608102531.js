import request,{stringifyWithTrim} from "./index.js";

export default {
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