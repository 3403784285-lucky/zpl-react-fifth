import { createSlice } from '@reduxjs/toolkit'
import { useStorage } from 'web-localstorage-plus'
export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    value: useStorage().getItem("avatar"),
    
  },
  reducers: {
    
    setItemsState: (state,action) => {
        state.value =action.payload
      },
  }
})

export const { setItemsState} = itemsSlice.actions

export default itemsSlice.reducer