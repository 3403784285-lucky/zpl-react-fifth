import createStorage from "web-localstorage-plus";
import 
// 初始化根存储
createStorage({
  rootName:'spp-storage'
})

const storage = new LocalStoragePlus({
    namespace: 'myAppNamespace'
});
export default storage;