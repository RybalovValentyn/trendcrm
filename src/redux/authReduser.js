// import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
      name: '',
      email: '',
      token: null,
      error: null,
      isLoading: false,
      isAuth: false,
      id: '',
      balance: '0',
      rebalancing: false,
    }
});

export default authSlice.reducer;