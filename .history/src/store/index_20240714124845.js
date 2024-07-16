import { configureStore } from '@reduxjs/toolkit'
import calculateReducer from './calculate'
import tokenReducer from './token'
import searchReducer from './search'
const store = configureStore({
  reducer: {
    calculate:calculateReducer,
    token:tokenReducer,
    search:searchReducer
  }
})

export default store

export {setToken} from './token'
export {setSearch} from './search'
export { increment } from './calculate'