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

export const { setToken} = cSlice.actions

export default tokenSlice.reducer