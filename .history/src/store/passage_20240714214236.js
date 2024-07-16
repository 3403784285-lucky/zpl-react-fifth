import { createSlice } from '@reduxjs/toolkit'

export const passageSlice = createSlice({
  name: 'passage',
  initialState: {
    value: ''
  },
  reducers: {
    setPassage: (state,action) => {
      state.value =action.payload
    },
  }
})

export const { setPassage} = tokenSlice.actions
export default tokenSlice.reducer