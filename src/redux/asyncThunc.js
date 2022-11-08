import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// import { alert } from '@pnotify/core';
// axios.defaults.baseURL = 'https://react.trendcrm.biz';
// axios.defaults.baseURL = 'http://localhost:5000/api';


// const testUrl = 'https://react.trendcrm.biz/api/menu/list';
const login = "/login";
const auth = '/authenticate'
// const REBASE_URL = 'https://react.trendcrm.biz';
const REBASE_URL= 'http://localhost:5000/api';
const APINP = '269d273b9f6c3d24a96414527df4f702';
const novaposhta = '/novaposhta/cities/list';
const adress = '/novaposhta/warehouses/list';

export const loginThunk = createAsyncThunk(
  'users/login',
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'post',
        url: REBASE_URL+login,
        data: user});      
      const data = await response
      console.log(data.data);
      return data.data;
    } catch (error) {
      return rejectWithValue({
        error: error.message,
      });
    }
  },
);

export const currentThunk = createAsyncThunk(
  'users/current',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
   
    console.log(state.auth.id);
          try {
        const { data } = await axios({
          method: "get",
           url:  REBASE_URL+auth,
           params: {
            id: state.auth.id,
            hashKey: state.auth.hashKey,
            role: state.auth.role
          },
          })

        console.log(data);
        return data.data;
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);


export const getSitysFromNp = createAsyncThunk(
  'order/DeliveryCity',
  async (_, { rejectWithValue, getState }) => {
          try {
        const { data } = await axios({
          method: "get",
           url:  REBASE_URL+novaposhta,

          })

        return data.suggestions.flatMap(sity=> sity.value).filter((sity, index, array) => array.indexOf(sity) === index)
        ;
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const getAdressFromNp = createAsyncThunk(
  'order/adress',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();   
    let sity = state.ordersAll.createRows.warehouse_city
    console.log(sity);
       try {
        const { data } = await axios({
          method: "post",
           url:  REBASE_URL+adress,
           data: {warehouse_city: sity}
          })
         return data.flatMap(street=> street.value).filter((street, index, array) => array.indexOf(street) === index)
      } catch (error) {
        return rejectWithValue({
         error: error.message
        });
      }
    
  },
);
// export const currentThunk = createAsyncThunk(
//   'users/current',
//   async (_, { rejectWithValue, getState }) => {
//           try {
//         const { data } = await axios.get(REBASE_URL+auth);
//         console.log(data);
//         return data.data;
//       } catch (error) {
//         return rejectWithValue({
//           error: error.message,
//         });
//       }
    
//   },
// );