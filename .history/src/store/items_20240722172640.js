import { createSlice } from '@reduxjs/toolkit'
export const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    value: '',
    
  },
  reducers: {
    
    setItemsState: (state,action) => {
        state.value =action.payload
      },
  }
})

export const { setItemsState} = itemsSlice.actions
export default itemsSlice.reducer