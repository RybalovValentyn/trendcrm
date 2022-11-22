import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { currentThunk, loginThunk} from './asyncThunc';

// axios.defaults.baseURL = 'https://react.trendcrm.biz/';

axios.defaults.baseURL = 'http://localhost:5000/';

const hashKey = Object.freeze({
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${hashKey}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
});

const authSlice = createSlice({
  name: 'user',
  initialState: {
   id : '',
   hashKey: '',
   login: '',
   role: null,
   name: 'Admin',
   sip_login: null,
    isLoading: false,
    isAuth: false,
    balance: '0',
    rebalancing: false,
    menu_list_access: [],
    order_statuses_access: [],
    payment_received: null,
    order_return: null,
    create_ttn: null,
    admin: null,
    marketer: null,
    manager: null,
    courier: null,
    show_phone_number: null,
    port: null,
    vers: null,
    lang: null,
    tour: null,
    group: null,
    taryf: 'SILVER',
    daysToEnd: '0'
  },

  reducers: {
    initUser: (state, action) => {
      hashKey.set(action.payload.user.hashKey);
      return { ...state, ...action.payload.user, isAuth: true };
    },
    ExitUser: (state, action) => {
      hashKey.set('');
      return { ...state, ...action.payload, isAuth: false, name: '', login: '' };
    },
  },
  extraReducers: {

    [loginThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        isError: false,
      };
    },
    [loginThunk.fulfilled](state, action) {

      return {
        ...state,
        id : action.payload.id,
        hashKey: action.payload.hashKey,
        login: action.payload.login,
        role: action.payload.role,
        name: action.payload.name,
        sip_login: action.payload.sip_login,
         isLoading: false,
         isAuth: true,
         menu_list_access: action.payload.menu_list_access,
         order_statuses_access: action.payload.order_statuses_access,
         payment_received: action.payload.payment_received,
         order_return: action.payload.order_return,
         create_ttn: action.payload.create_ttn,
         admin: action.payload.admin,
         marketer: action.payload.marketer,
         manager: action.payload.manager,
         courier: action.payload.courier,
         show_phone_number: action.payload.show_phone_number,
         port: action.payload.port,
         vers: action.payload.vers,
         lang: action.payload.lang,
         tour: action.payload.is_tour,
         group: action.payload.group,
      };
    },
    [loginThunk.rejected](state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuth: false,
      };
    },
    [currentThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
        isAuth: false,
        isError: false
       };
    },
    [currentThunk.fulfilled](state, action) {

      return {
        ...state,
         isLoading: false,
         isAuth: true,
        };
    },
    [currentThunk.rejected](state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isAuth: false,
      };
    },
 
  },
});

export const { initUser, ExitUser } = authSlice.actions;
export default authSlice.reducer;
