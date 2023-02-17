import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import { currentThunk, loginThunk} from './asyncThunc';
import { orderStatusThunk } from './asyncOrders';

// axios.defaults.baseURL = 'https://react.trendcrm.biz/';

// axios.defaults.baseURL = 'http://localhost:5000/';

const hashKey = Object.freeze({
  set(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${hashKey}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = '';
  },
});

export const userData = {
id : '',
login: '',
role:'',
name: '',
sip_login: '',
// menu_list_access: [],
// order_statuses_access: [],
payment_received: '0',
order_return: '0',
create_ttn: null,
admin: false,
marketer: null,
manager: null,
courier: null,
show_phone_number: null,
 port: null,
vers: null,
lang: 'ua',
tour: null,
group: null,
is_telephony: false,
is_c: false,
call_from_system:'0',
}

const authSlice = createSlice({
  name: 'user',
  initialState: {
   id : '',
   hashKey: null,
   login: '',
   role:'',
   name: '',
   sip_login: null,
    isLoading: false,
    isAuth: false,
    balance: '0',
    rebalancing: false,
    menu_list_access: [],
    order_statuses_access: [],
    payment_received: null,
    order_return: '0',
    create_ttn: null,
    admin: false,
    marketer: null,
    manager: null,
    courier: null,
    show_phone_number: null,
    port: null,
    vers: null,
    lang: 'ua',
    tour: null,
    group: null,
    taryf: 'SILVER',
    daysToEnd: '0',
    is_telephony: false,
    is_c: false,
    call_from_system:'0',


  },

  reducers: {
    // initUser: (state, action) => {
    //   hashKey.set(action.payload.user.hashKey);
    //   return { ...state, ...action.payload.user, isAuth: true };
    // },
    ExitUser: (state, action) => {
      hashKey.set('');
      return { ...state, ...action.payload, isAuth: false, name: '', login: '', hashKey: null };
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
      // console.log(JSON?.parse(action.payload?.menu_list_access));
      return {
        ...state,
        id : action.payload.id,
        hashKey: (action.payload.hashKey !== '' && action.payload.hashKey)?action.payload.hashKey: null,
       login: action.payload.login,
        role: action.payload.role,
        name: action.payload.name,
        sip_login: action.payload.sip_login,
         isLoading: false,
         menu_list_access: JSON?.parse(action.payload?.menu_list_access)?JSON?.parse(action.payload?.menu_list_access):[],
         order_statuses_access: JSON?.parse(action.payload?.order_statuses_access)? JSON?.parse(action.payload?.order_statuses_access):[],
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
         call_from_system: action.payload.call_from_system,
         is_c:  action.payload.is_c,
         is_telephony: action.payload.is_telephony

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

    
    [orderStatusThunk.pending](state, action) {
      return {
        ...state,
        isLoading: true,
        isError: false
       };
    },
    [orderStatusThunk.fulfilled](state, action) {
      let statuses = {...state.order_statuses_access}
      if (Number(action.payload?.data) && action.payload?.isUpdate) {        
        statuses = {...state.order_statuses_access, ...{[action.payload?.data]: '1'}}
      }
      return {
        ...state,
         isLoading: false,
         order_statuses_access: {...statuses}
        };
    },
    [orderStatusThunk.rejected](state, action) {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
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
         isAuth: action.payload === 200?true:false,
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
