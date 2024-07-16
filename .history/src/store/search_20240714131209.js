import { createSlice } from '@reduxjs/toolkit'
export const searchSlice = createSlice({
  name: 'searchText',
  initialState: {
    value: ''
  },
  reducers: {
    setSearch: (state,action) => {
      state.value =action.payload
    },
  }
})

export const { setSearch} = searchSlice.actions

export default searchSlice.reducer