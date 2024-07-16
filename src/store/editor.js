import { createSlice } from '@reduxjs/toolkit'
export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    value: null,
  },
  reducers: {
    setEditor: (state,action) => {
      state.value =action.payload
    },
  
  }
})

export const { setEditor} = editorSlice.actions

export default editorSlice.reducer