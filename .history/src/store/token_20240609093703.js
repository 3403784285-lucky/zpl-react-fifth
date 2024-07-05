import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: ''
  },
  reducers: {
    increment: state => {
      state.value += 1
    },
  }
})

export const { increment } = counterSlice.actions

export default counterSlice.reducer