import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { orderStatusThunk } from './asyncOrders';

const ordersReduser = createSlice({
  name: 'orders',
  initialState: {
 getStatuses: [],
 isLoading: false,
 order: []
  },

   reducers: {
        getStatusUpdate: (state) => {        

          return { ...state, getStatuses: {
          name: 'state.name'
          } };
        },
        
  },


      extraReducers: {
    
        [orderStatusThunk.pending](state, action) {
          return {
            ...state,
            isLoading: true,
          }; 
        },
        [orderStatusThunk.fulfilled](state, action) {
    
          return{
           ...state,
            getStatuses: [...state.getStatuses,action.payload],
            isLoading: false,
          }
        },
        [orderStatusThunk.rejected](state, action) {
          return {
            ...state,
            isLoading: false,
            error: action.payload,
          };
        },
    
     
      },

  },
);

export const { getStatusUpdate} = ordersReduser.actions;
export default ordersReduser.reducer;

