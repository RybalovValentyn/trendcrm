import { createSlice } from '@reduxjs/toolkit';




const functionReduser = createSlice({
    name: 'functions',
    initialState: {

  selectedRow: [],

    },
      reducers: {
      
        getselected: (state, action) => {
            console.log(action.payload);
            state.selectedRow = action.payload
        },



  },
  extraReducers: {},
});

export const { getselected

    } = functionReduser.actions;
export default functionReduser.reducer;