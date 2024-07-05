import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: ''
  },
  reducers: {
    setToken: state => {
      state.value =''
    },
  }
})

export const { increment } = counterSlice.actions

export default counterSlice.reducer