import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const orderStatusThunk = createAsyncThunk(
  'orders/status',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
   
    console.log(state);
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

        console.log(data);
        return data;
    }catch (error) {
      return rejectWithValue({
        error: error.message,
      });
    }
  },
);