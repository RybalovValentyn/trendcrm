import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// import { alert } from '@pnotify/core';
// axios.defaults.baseURL = 'https://react.trendcrm.biz';
// axios.defaults.baseURL = 'http://localhost:5000/api';


const login = "/auth";
const auth = '/auth';

const REBASE_URL = 'https://q096k1qoxe.execute-api.eu-central-1.amazonaws.com/beta/function';

// const REBASE_URL= 'http://localhost:5000/api';


const syties = '/sityes';
const adress = '/adress';
const addOrder = '/order';
const orders = '/orders';
const getStatus = '/count_status_orders';

// https://whispering-thicket-39688.herokuapp.com/ | https://git.heroku.com/whispering-thicket-39688.git
// throw new Error('Неможливо викликати обробник події під час рендерингу.');


// https://react.trendcrm.biz/api/order/27/comment

export const loginThunk = createAsyncThunk(
  'users/login',  
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'post',
        url: REBASE_URL+login,
         data: user});      
      const data = await response
      // console.log('loginThunk', data.data);
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
        console.log('currentThunk',data);
        return data.status;
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
          method: "post",
           url:  REBASE_URL+syties,
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
          });
         return data.suggestions.flatMap(street=> street.value).filter((street, index, array) => array.indexOf(street) === index);
         
      } catch (error) {
        return rejectWithValue({
         error: error.message
        });
      }
    
  },
);
// method.request.querystring.params
export const getAllStatuses = createAsyncThunk(
  'statuses/all',
  async (_, { rejectWithValue, getState }) => {
    const state = getState(); 
    const cookie = state.auth.id

        try {
        const { data } = await axios({
          method: "get",
          url:  REBASE_URL,
          // url: 'https://q096k1qoxe.execute-api.eu-central-1.amazonaws.com/beta/function',
          // url: 'https://q096k1qoxe.execute-api.eu-central-1.amazonaws.com/trend/function',
           params:{ cookie: document.cookie}
          })
        //  console.log(data);
         return data.orders_status_count
      } catch (error) {
        // console.log(error.message);
        return rejectWithValue({
          
         error: error.message
        });
      }
    
  },
);

// export const getAllStatuses = createAsyncThunk(
//   'statuses/all',
//   async (_, { rejectWithValue, getState }) => {
//     const state = getState(); 
//     const cookie = state.auth.id

//         try {
//         const { data } = await axios({
//           method: "get",
//            url:  REBASE_URL+getStatus,
//            params:{ cookie: 'user_id=1'}
//           })
         
//          return data.orders_status_count
//       } catch (error) {
//         return rejectWithValue({
//          error: error.message
//         });
//       }
    
//   },
// );
export const getFilteredOrders = createAsyncThunk(
  'filtered/all',
  async (_, { rejectWithValue, getState }) => { 
    const state = getState();  
    const patrams =  state.ordersAll.searchParams;
    const column = state.ordersAll.tHeadColumnFiltered;
console.log('getFilteredOrders',column);
          let columns ={ draw: '1',
          start: state.ordersAll.page?state.ordersAll.page:0,
          length: state.ordersAll.rowsPerPage,
          create_date_from: state.ordersAll.searchParams.create_date_from,
          create_date_to: state.ordersAll.searchParams.create_date_to,
          update_date_from: state.ordersAll.searchParams.update_date_from,
          update_date_to: state.ordersAll.searchParams.update_date_to ,
          datetime_sent_from: state.ordersAll.searchParams.datetime_sent_from,
          datetime_sent_to: state.ordersAll.searchParams.datetime_sent_to,
          status: state.ordersAll.searchParams.status_name,
          order:[{data:{dir:'desc'}}],
          columns:[...column, {data: 'status_name', searchable: true, orderable: true, search:{value: ''}},] ,
           }

        try {
        const { data } = await axios({
          method: "post",
           url:  REBASE_URL+orders,
           data: columns
          })
          console.log('getFilteredOrders', Object.keys(data?.data[0])?.length);
         return data
        // return columns
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
    const state = getState();  
    const patrams =  state.ordersAll.searchParams
let order = {order:[{dir:'desc'}]};
          let columns ={ draw: '1',
          start: state.ordersAll.start?state.ordersAll.start:0,
          length: state.ordersAll.rowsPerPage,
          // status: 4,
          create_date_from: state.ordersAll.searchParams.create_date_from,
          create_date_to: state.ordersAll.searchParams.create_date_to,
          update_date_from: state.ordersAll.searchParams.update_date_from,
          update_date_to: state.ordersAll.searchParams.update_date_to ,
          datetime_sent_from: state.ordersAll.searchParams.datetime_sent_from,
          datetime_sent_to: state.ordersAll.searchParams.datetime_sent_to,
          status: state.ordersAll.searchParams.status_name,
          order:{dir:'desc'},
          columns:[
            {data: 'id', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.id} },
             {data: 'status_name', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.status_name}}, 
             {data: 'client', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.client} }, 
             {data: 'client_phone' , searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.client_phone} },
           {data: 'client_groups', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.client_groups}}, 
           {data: 'ig_username', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.ig_username} }, 
           {data: 'comment', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.comment} },
            {data: 'supplier', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.supplier}},
           {data: 'total', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.total}},
           {data: 'storage_income_price_sum', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.storage_income_price_sum}},
           {data: 'products_names', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.products_names}},
           {data: 'responsible', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.responsible}},
           {data: 'group_name', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.group_name}},
           {data: 'packer_name', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.packer_name}},
           {data: 'counterparty', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.counterparty}},
           {data: 'delivery_type', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.delivery_type}},
           {data: 'ttn', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.ttn}},
           {data: 'backward_delivery_summ', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.backward_delivery_summ}},
           {data: 'ttn_cost', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.ttn_cost}},
           {data: 'payment_name', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.payment_name}},
           {data: 'ttn_status', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.ttn_status}},
           {data: 'ttn_update_at', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.ttn_update_at}},
           {data: 'datetime', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.datetime}},
           {data: 'update_at', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.update_at}},
           {data: 'datetime_sent', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.datetime_sent}},
           {data: 'store_url', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.store_url}},
           {data: 'name_store_resp', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.name_store_resp}},
           {data: 'store_title', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.store_title}},
           {data: 'utm_source', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.utm_source}},
           {data: 'utm_medium', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.utm_medium}},
           {data: 'utm_term', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.utm_term}},
           {data: 'utm_content', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.utm_content}},
           {data: 'utm_campaign', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.utm_campaign}},
           {data: 'marketing', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.marketing}},
           {data: 'client_ip', searchable: true, orderable: true, search:{value: state.ordersAll.searchParams.client_ip}},
           
          ] ,
           }

        try {
        const { data } = await axios({
          method: "post",
           url:  REBASE_URL+orders,
           data: columns
          })
          console.log(data);
          console.log('getAllOrders', Object.keys(data?.data[0])?.length);
         return data
      } catch (error) {
        return rejectWithValue({
         error: error.message
        });
      }
    
  },
);
export const getRowsAfterAdd = createAsyncThunk(
  'rows/post',
  async (id, { rejectWithValue, getState }) => {
  
    console.log(id);
            try {
        const { data } = await axios({
          method: "get",
           url:  REBASE_URL+addOrder+`/${id}`,
          });
        console.log(data);
        if (data.order) {
          return data;
        } else throw new Error('Неможливо, пусто');
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

    const state = getState();
    
const rows = state.ordersAll.createRows
const client = state.ordersAll.client
console.log('postRowsFromForm', rows);

   const utm ={
      utm_source:"",
      utm_medium:"",
      utm_term:"",
      utm_content:"",
      utm_campaign:""
      }
const dataSend ={
  client: {...client, phone: state.ordersAll.client.client_phone },
  delivery: {...rows},
  utm: {...utm}, 
  date_create: '',
  discount: "",
  discount_type: "0",
  responsible: rows.responsible,
  responsible_group: rows.responsible_group,
  status:  rows.status,
  store_url: rows.store_url
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

export const setCommentAdd = createAsyncThunk(
  'comment/post',
  async ({coment, idComent}, { rejectWithValue}) => {
          try {
        const { data } = await axios({
          method: "post",
           url:  REBASE_URL+addOrder+`/${idComent}/comment`,
           data: {comment: coment},
          });
        console.log(data);
        return {coment, idComent};
      } catch (error) {
        console.log(error);
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);
// {orders: ["33"], values: {status: 32}}
// orders
// : 
// ["33"]
// values
// : 
// {status: 32}

