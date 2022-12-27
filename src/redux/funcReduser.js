import { createSlice } from '@reduxjs/toolkit';




const functionReduser = createSlice({
    name: 'functions',
    initialState: {

  selectedRow: [],
  isLoading: true,
    },
      reducers: {
      
        getselected: (state, action) => {
            // console.log(action.payload);
            state.selectedRow = action.payload
        },
        getLoading: (state, action) => {
          state.isLoading = action.payload
      },


  },
  extraReducers: {},
});

export const { getselected, getLoading

    } = functionReduser.actions;
export default functionReduser.reducer;