import { configureStore } from '@reduxjs/toolkit'
import calculateReducer from './calculate'
import tokenReducer from './token'
const store = configureStore({
  reducer: {
    calculate:calculateReducer,
    token:tokenReducer
  }
})

export default store


export {setToken} from './token'
export { increment } from './calculate'