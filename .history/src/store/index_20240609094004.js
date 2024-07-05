import { configureStore } from '@reduxjs/toolkit'
import calculateReducer from './calculate'
import tokenReducer from './token'
const store = configureStore({
  reducer: {
    calculate:calculateReducer
  }
})

export default store



export { increment } from './calculate'