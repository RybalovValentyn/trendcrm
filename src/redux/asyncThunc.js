import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// import { alert } from '@pnotify/core';
// axios.defaults.baseURL = 'https://react.trendcrm.biz';
// axios.defaults.baseURL = 'http://localhost:5000/api';


// const testUrl = 'https://react.trendcrm.biz/api/menu/list';
const login = "/login";
const auth = '/authenticate'

const REBASE_URL = 'https://immense-basin-96488.herokuapp.com/api';

// const REBASE_URL= 'http://localhost:5000/api';

const novaposhta = '/novaposhta/cities/list';
const adress = '/novaposhta/warehouses/list';
const addOrder = '/order';
const orders = '/orders';
const getStatus = '/count_status_orders';

// https://whispering-thicket-39688.herokuapp.com/ | https://git.heroku.com/whispering-thicket-39688.git

// https://react.trendcrm.biz/api/menu/list
// https://react.trendcrm.biz/api/tariff/0
// https://react.trendcrm.biz/api/select_items/access
// https://react.trendcrm.biz/api/novaposhta/status_list
// https://react.trendcrm.biz/api/justin/list_statuse

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

          try {
        const response = await axios({
          method: "get",
           url:  REBASE_URL+auth,
           params: {
            id: state.auth.id,
            hashKey: state.auth.hashKey,
            role: state.auth.role
          },
          })
          const data = await response
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

        return data.suggestions.flatMap(sity=> sity.value).filter((sity, index, array) => array.indexOf(sity) === index);
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

export const getAllStatuses = createAsyncThunk(
  'statuses/all',
  async (_, { rejectWithValue, getState }) => {
    const state = getState(); 
    const cookie = state.auth.id

        try {
        const { data } = await axios({
          method: "get",
           url:  REBASE_URL+getStatus,
           params:{ cookie: 'user_id=1'}
          })
         
         return data.orders_status_count
      } catch (error) {
        return rejectWithValue({
         error: error.message
        });
      }
    
  },
);

export const getAllOrders = createAsyncThunk(
  'orders/all',
  async (_, { rejectWithValue, getState }) => { 
          let columns ={ draw: '1',
          start:0,
          length: 50,
          // status: 4,
          create_date_from: '',
          create_date_to: '',
          update_date_from: '',
          update_date_to: '' ,
          datetime_sent_from: '',
          datetime_sent_to: '',
          columns:[{data: 'id'}, {data: 'status_name'}, {data: 'client'}, {data: 'client_phone'},
           {data: 'client_groups'}, {data: 'ig_username'}, {data: 'comment'}, {data: 'supplier'},
           {data: 'total'},{data: 'storage_income_price_sum'},{data: 'products_names'},{data: 'responsible'},
           {data: 'group_name'},{data: 'packer_name'},{data: 'counterparty'},{data: 'delivery_type'},
           {data: 'ttn'},{data: 'backward_delivery_summ'},{data: 'ttn_cost'},{data: 'payment_name'},
           {data: 'ttn_status'},{data: 'ttn_update_at'},{data: 'datetime'},{data: 'update_at'},
           {data: 'datetime_sent'},{data: 'store_url'},{data: 'name_store_resp'},{data: 'store_title'},
           {data: 'utm_source'},{data: 'utm_medium'},{data: 'utm_term'},{data: 'utm_content'},
           {data: 'utm_campaign'},{data: 'marketing'},{data: 'client_ip'}
          ] ,
           }

        try {
        const { data } = await axios({
          method: "post",
           url:  REBASE_URL+orders,
           data: columns
          })
          // console.log(data.data);
         return data.data
      } catch (error) {
        return rejectWithValue({
         error: error.message
        });
      }
    
  },
);
export const getRowsAfterAdd = createAsyncThunk(
  'rows/post',
  async (_, { rejectWithValue, getState }) => {
    const state = getState();
   
    console.log(state.ordersAll.createRows.id);
          try {
        const { data } = await axios({
          method: "get",
           url:  REBASE_URL+addOrder,
           params: {
            id: state.ordersAll.createRows.id
          },
          });
        console.log(data);
        return data;
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);
export const postRowsFromForm = createAsyncThunk(
  'rows/create',
  async (_, { rejectWithValue, getState }) => {    
    console.log('postRowsFromForm');
    const state = getState();
const rows = state.ordersAll.createRows
const clientData = {
      fio: rows.fio,
      phone: rows.phone,
      email: rows.email,
      ig_username :rows.ig_username,
      comment: rows.comment,
      additional_field: rows.additional_field,
      group_name: rows.group_name,
    }  
const deliveryData = {
    client_comment: rows.client_comment,
    additional_field: rows.additional_field,
    delivery_type: 12,
    responsible_packer: rows.responsible_packer,
    payment_type: rows.payment_type,
    delivery_service_type: Number(rows.delivery_service_type)+1,
    warehouse_city: rows.warehouse_city,
    warehouse_address:rows.warehouse_address,
    doors_city: rows.doors_city.Present,
    doors_address:rows.doors_address.Present,
    doors_house:rows.doors_house,
    doors_flat: rows.doors_flat,
    delivery_payers: "Recipient",
    delivery_payers_redelivery:"Recipient",
    weight: rows.weight,
    volume_general: rows.volume_general,
    seats_amount: rows.seats_amount,
    tnn: rows.tnn,
    status: '',
    cost: rows.cost,
    datetime_sent: rows.datetime_sent,
    novaposhta_comment: rows.novaposhta_comment
    }
    const utm ={
      utm_source:"",
      utm_medium:"",
      utm_term:"",
      utm_content:"",
    utm_campaign:""
      }
const dataSend ={client: {...clientData},
  delivery: {...deliveryData},
  utm: {...utm},
   discount:"",
   discount_type:"0",
   order_products:[],
   responsible:"1",
   responsible_group:"0",
  date_create: rows.datetime,
  status: rows.status,
  store_url: rows.store_url,
  }
  console.log(dataSend);
       try {
        const { data } = await axios({
          method: "post", 
           url:  REBASE_URL+addOrder,
           data: {...dataSend},  
  
          })
          console.log(data);
         return data
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