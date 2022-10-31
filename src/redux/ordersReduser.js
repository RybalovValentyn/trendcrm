import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { orderStatusThunk, getValidationForm, orderStatusUpdate } from './asyncOrders';

const initStatus =[
  {
    name: '1111111111111',
    statusId: '1',
    color: '#b74343',
    group: [
      'Адміністратори',
      'Менеджери',
      'Маркетологи',
      'Курєри'
    ],
    runInStore: 'Бронювати',
    accepted: true,
    deliveryStatus: true,
    infoStatus: true,
    checked: true
  },
  {
    name: '222222222',
    statusId: '1',
    color: '#b74343',
    group: [
      'Адміністратори',
      'Менеджери',
      'Маркетологи',
      'Курєри'
    ],
    runInStore: 'Бронювати',
    accepted: true,
    deliveryStatus: true,
    infoStatus: true,
    checked: true
  },
  {
    name: '3333333',
    statusId: '1',
    color: '#b74343',
    group: [
      'Адміністратори',
      'Менеджери',
      'Маркетологи',
      'Курєри'
    ],
    runInStore: 'Бронювати',
    accepted: true,
    deliveryStatus: true,
    infoStatus: true,
    checked: false
  }
  
  
  
]

const ordersReduser = createSlice({
  name: 'orders',
  initialState: {
 getStatuses: [...initStatus],
 isLoading: false,
 order: [],
 isValid: false,
 error: '',
 isError: false,
  },

  //  reducers: {
  //       getStatusUpdate: (state, action) => {  
  
  //         return { ...state,
  //           // getStatuses: 
  //       };
  //       },        
  // },


      extraReducers: {
    
        [orderStatusThunk.pending](state, action) {
          return {
            ...state,
            isLoading: true,
            isError: false,
            isValid: false,
          }; 
        },
        [orderStatusThunk.fulfilled](state, action) {
    
          return{
           ...state,
            getStatuses: [...state.getStatuses,action.payload],
            isLoading: false,
            isError: false,
            isValid: false,
          }
        },
        [orderStatusThunk.rejected](state, action) {
          return {
            ...state,
            isLoading: false,
            error: action.payload,
            isError: true,
            isValid: false,
          };},

          [getValidationForm.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
              isValid: false,
            }; 
          },
          [getValidationForm.fulfilled](state, action) {      
            return{
             ...state, isValid: true,
             isError: false,
            }
          },
          [getValidationForm.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
              isValid: false,
            };      
          },
          [orderStatusUpdate.pending](state, action) {
            return {
              ...state,
              isLoading: true,
          
                }; 
          },
          [orderStatusUpdate.fulfilled](state, action) {    
              return{
             ...state,
             getStatuses: [...action.payload],

            }
          },
          [orderStatusUpdate.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
             
            };      
          },
     
      

        }}
);

export const { getStatusUpdate} = ordersReduser.actions;
export default ordersReduser.reducer;

