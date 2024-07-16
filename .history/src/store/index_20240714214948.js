import { configureStore } from '@reduxjs/toolkit'
import calculateReducer from './calculate'
import tokenReducer from './token'
import searchReducer from './search'
import editorReducer from './editor'

const store = configureStore({
  reducer: {
    calculate:calculateReducer,
    token:tokenReducer,
    search:searchReducer,
    editor:editorReducer

  }
})

export default store

export {setToken} from './token'
export {setSearchText} from './search'
export { increment } from './calculate'
export { setEditor } from './editor'