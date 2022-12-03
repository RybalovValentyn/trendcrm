import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const REBASE_URL = 'https://immense-basin-96488.herokuapp.com/api';
const REBASE_URL= 'http://localhost:5000/api';
const postStatus = '/select_list/3/select_item/add'


export const getValidationForm = createAsyncThunk(
  'orders/valid',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const statuses = state.ordersAll.getStatuses
    let isInclusesStatus = statuses.find(str=>str.sort === state.addStatus.statusId.trim())
    let isNameIncludes = statuses.find(str=>str.name === state.addStatus.name.trim())

         const error = {message: 'Потрібно заповнити обовязкові поля'}
      try {
        if (state.addStatus.name.trim().length === 0) {
          throw  error.message= 'Name is required'
        }  
        if (isNameIncludes) {
          throw error.message= 'Таке імя вже існує'
         } 
        if (state.addStatus.statusId.trim().length === 0) {
          throw error.message= 'Number is required'
         } 
         if (isInclusesStatus) {
          throw error.message= 'Такий статус вже існує'
         } 
         if (state.addStatus.group.length === 0) {
             throw error.message= 'Groups is required'
         }         
return error
    }catch (error) {
      
           return rejectWithValue({        
        error
      });
    }
  },
);



export const orderStatusThunk = createAsyncThunk(
  'orders/status',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const status = {
      name: state.addStatus.name,
      sort: state.addStatus.statusId,
      style: state.addStatus.style,
      groups:state.addStatus.group,
      storage_edit: state.addStatus.runInStore,
      is_accepted: state.addStatus.accepted,
      delivery_edit:state.addStatus.deliveryStatus,
      order_edit: state.addStatus.infoStatus,
      status_ids:  state.addStatus.status_ids,
    }
   
     try {
      const { data } = await axios({
        method: "post",
         url:  REBASE_URL+postStatus,
         data: status
        })
      
       return data
      } catch (error) {
        return rejectWithValue({
         error: error.message
        });
      }
  },
);

