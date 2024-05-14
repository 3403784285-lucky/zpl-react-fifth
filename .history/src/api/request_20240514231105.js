import request,{stringifyWithTrim} from "./index.ts";

export default {
    post(params){
      return request(url, {
        method: "POST",
        params,
      })
    },
    get(query){
      return request(`url?${stringifyWithTrim(query)}`)
    }
}