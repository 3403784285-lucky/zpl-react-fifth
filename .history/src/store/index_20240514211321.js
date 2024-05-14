import { configureStore } from '@reduxjs/toolkit'
import calculateReducer from './calculate'
export default configureStore({
  reducer: {
     calculate:calculateReducer,
     
  }
})



export default configureStore({
  reducer: {
   
  }
})

export { increment } from './calculate'