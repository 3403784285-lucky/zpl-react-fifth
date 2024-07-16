import { createSlice } from '@reduxjs/toolkit'
export const searchSlice = createSlice({
  name: 'searchText',
  initialState: {
    value: '1'
  },
  reducers: {
    setSearchText: (state,action) => {
      state.value =action.payload
    },
  }
})

export const { setSearchText} = searchSlice.actions
export default searchSlice.reducer