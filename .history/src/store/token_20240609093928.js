import { createSlice } from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
  name: 'token',
  initialState: {
    value: ''
  },
  reducers: {
    setToken: (state,newToken) => {
      state.value =newToken
    },
  }
})

export const { setToken} = tokenSlice.actions

export default tokenSlice.reducer