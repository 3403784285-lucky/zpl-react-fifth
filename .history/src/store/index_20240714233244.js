import { configureStore } from '@reduxjs/toolkit'
import calculateReducer from './calculate'
import tokenReducer from './token'
import searchReducer from './search'
import editorReducer from './editor'
import itemsReducer from './items'

const store = configureStore({
  reducer: {
    calculate:calculateReducer,
    token:tokenReducer,
    search:searchReducer,
    editor:editorReducer,
    items:itemsReducer


  }
})

export default store

export {setToken} from './token'
export {setSearchText} from './search'
export { increment } from './calculate'
export { setEditor } from './editor'
export {setItemsState} from './items'