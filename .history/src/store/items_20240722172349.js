import { createSlice } from '@reduxjs/toolkit'
export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    value: localStorage.getItem("user").avatar,
    
  },
  reducers: {
    
    setItemsState: (state,action) => {
        state.value =action.payload
      },
  }
})

export const { setItemsState} = itemsSlice.actions
export default itemsSlice.reducer