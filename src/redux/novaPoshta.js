import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const BASE_URL = 'https://api.novaposhta.ua/v2.0/json/'


export const getSityNP = createAsyncThunk(
    'novaposhta/sitys',
    async (str, { rejectWithValue }) => {
       try {
        const response = await axios({
          method: 'post',
          url: BASE_URL,
          data: {system:"PA 3.0",
          modelName:"Address",
          calledMethod:"searchSettlements",
          methodProperties:{CityName:str,
                            Limit:100,
                            Page:1}}
        
        });      
        const data = await response.data.data[0].Addresses
        return data;
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    },
  );

  export const getAddressNP = createAsyncThunk(
    'novaposhta/address',
    async (str, { rejectWithValue, getState }) => {
        const state = getState();   
        let sity = state.ordersAll.createRows.doors_city.Ref
        try {
        const response = await axios({
          method: 'post',
          url: BASE_URL,
          data: {system:"PA 3.0",
          modelName:"Address",
          calledMethod:"searchSettlementStreets",
          methodProperties:{StreetName:str,
            SettlementRef : sity,
                            Limit:100,
                            Page:1}}
        
        });      
        const data = await response.data.data[0].Addresses
        return data;
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    },
  );