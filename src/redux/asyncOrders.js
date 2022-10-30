import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import {validationForm} from './statusReduser';



export const getValidationForm = createAsyncThunk(
  'orders/valid',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
    const valid = false;
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
      }
        return data;
    }catch (error) {
       return rejectWithValue({        
        error
      });
    }
  },
);