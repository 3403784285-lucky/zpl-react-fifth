import createStorage from "web-localstorage-plus";
import {useStorage} from "web-localstorage-plus"
// 初始化根存储
createStorage({
  rootName:'spp-storage'
})

const storage=useStorage();
export default storage;