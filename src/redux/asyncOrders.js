import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {validationForm} from './statusReduser';



export const getValidationForm = createAsyncThunk(
  'orders/valid',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
         const error = {message: 'Потрібно заповнити обовязкові поля'}
      try {
        if (state.addStatus.name.trim().length === 0) {
          throw  error.message= 'Name is required'
        }  
        if (state.addStatus.statusId.trim().length === 0) {
          throw error.message= 'Number is required'
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
  
    try {
      const data = await {
        name: state.addStatus.name,
        statusId: state.addStatus.statusId,
        color: state.addStatus.color,
        group:state.addStatus.group,
        runInStore: state.addStatus.runInStore,
        accepted: state.addStatus.accepted,
        deliveryStatus:state.addStatus.deliveryStatus,
        infoStatus: state.addStatus.infoStatus,
        checked:  state.addStatus.checked,
      }
        return data;
    }catch (error) {
       return rejectWithValue({        
        error
      });
    }
  },
);

export const orderStatusUpdate = createAsyncThunk(
  'update/status',
  async ({name, check}, { rejectWithValue, getState }) => {
    const state = getState();
    let ind = state.ordersAll.getStatuses.findIndex(str=>str.name === name)
    let el = state.ordersAll.getStatuses[ind]
 
    try {
      const data = await { 
        name: el.name,
        statusId: el.statusId,
        color: el.color,
        group:el.group,
        runInStore: el.runInStore,
        accepted: el.accepted,
        deliveryStatus:el.deliveryStatus,
        infoStatus: el.infoStatus,
        checked:  check,
      }
      const copyStatus = [...state.ordersAll.getStatuses]
      copyStatus.splice(ind,1, data)
      const result = copyStatus
        return result
    }catch (error) {
       return rejectWithValue({        
        error
      });
    }
  },
);