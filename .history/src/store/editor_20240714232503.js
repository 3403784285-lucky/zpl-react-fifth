import { createSlice } from '@reduxjs/toolkit'
export const editorSlice = createSlice({
  name: 'editor',
  initialState: {
    value: null,
    items:[],
  },
  reducers: {
    setEditor: (state,action) => {
      state.value =action.payload
    },
    setItemsState: (state,action) => {
        state.items =action.payload
      },
  }
})

export const { setEditor,setItemsState} = editorSlice.actions

export default editorSlice.reducer