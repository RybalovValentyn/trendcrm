import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.withCredentials = true;

// const BASE_URL = 'http://localhost:8080/api';


const BASE_URL = 'http://react.trendcrm.win/api';
const login = "/login";
const auth = '/authenticate'; 
const REBASE_URL = 'https://q096k1qoxe.execute-api.eu-central-1.amazonaws.com/beta/function';


// const TREND_URL = 'https://q096k1qoxe.execute-api.eu-central-1.amazonaws.com/trend/function'

const syties = '/cities';
const adress = '/adress';
const addOrder = '/order';
const orders = '/orders';
const getStatus = '/count_status_orders';
const orderReturn = 'order_return';
const payment = 'payment_received';
const prepayStatus = '/update/prepay_status';
const excel = '/excel';
const imp = '/import';
const ttn = '/ttn';
const novaPochta = '/novaposhta';
const warehouses = '/warehouses';
const remove = '/delete';
const returnTtn = '/return';
const deletOrder = '/basket';
const products = '/products';
const name = '/name';
const autocomplete = '/autocomplete';
const list = '/list';
const attributes='/attributes';
const suppliers='/suppliers';
const category = '/category_list';
const description='/description_list_by_data'
const product = '/product';
const supplier = '/supplier';
const atrCategory = '/attribute_category';
const createProdCategory = '/create_product_category';
const addCategory ='/add_category';
const addAtribute = '/add_attribute';
const add = '/add'
const updateProductCategory = '/update_product_category'

// https://whispering-thicket-39688.herokuapp.com/ | https://git.heroku.com/whispering-thicket-39688.git
// throw new Error('Неможливо викликати обробник події під час рендерингу.');
// let config = {headers: {Authorization: `Bearer ${cookie_value}`}
// withCredentials: true
// }

// https://react.trendcrm.biz/api/order/27/comment


export const loginThunk = createAsyncThunk(
  'users/login',  
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: 'post',
        url: BASE_URL+login,
         data: user});      
      const data = await response
      console.log('loginThunk', response );
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
// console.log('currentThunk');
          try {
        const response = await axios({
          method: "get",
           url:  BASE_URL+auth,
           params: {
            id: state.auth.id,
            hashKey: state.auth.hashKey,
            role: state.auth.role
          },
          })
          const data = await response
        console.log('currentThunk',response);
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
           url:  BASE_URL+novaPochta+syties+list,
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
           url:  BASE_URL+novaPochta+warehouses+list,
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

export const getAllStatuses = createAsyncThunk(
  'statuses/all',
  async (_, { rejectWithValue, getState }) => {
    const state = getState(); 
    const statuses = state.auth.order_statuses_access
        try {
        const resp = await axios({
          method: "get",
          url:  BASE_URL+getStatus,
          },
          
          )
         return {data: resp.data.orders_status_count, statuses: statuses}
      } catch (error) {
        return rejectWithValue({          
         error: error.message
        });
      }
    
  },
);


export const getFilteredOrders = createAsyncThunk(
  'filtered/all',
  async (_, { rejectWithValue, getState }) => { 
    const state = getState();  
    const params =  state.ordersAll.searchParams
const searchColumn = state.ordersAll.tHeadColumnFiltered
    const column =searchColumn.map((col, ind)=>{
      let newSearch = params[col.data]
      return {...col, search:{value: newSearch}} 
      })
          let columns ={ draw: '1',
          start: state.ordersAll.start?state.ordersAll.start:0,
          length: state.ordersAll.rowsPerPage,
          create_date_from: state.ordersAll.searchParams.create_date_from,
          create_date_to: state.ordersAll.searchParams.create_date_to,
          update_date_from: state.ordersAll.searchParams.update_date_from,
          update_date_to: state.ordersAll.searchParams.update_date_to ,
          datetime_sent_from: state.ordersAll.searchParams.datetime_sent_from,
          datetime_sent_to: state.ordersAll.searchParams.datetime_sent_to,
          status: state.ordersAll.searchParams.status_name?state.ordersAll.searchParams.status_name:state.ordersAll.statusName,
          order:[{column: state.ordersAll.sortColumn, dir: state.ordersAll.sortTable}],
          columns:[...column, {data: 'status_name', searchable: true, orderable: true, search:{value: params.status_name}},
          {data: 'id', searchable: true, orderable: true, search:{value: ''} },
        ] ,
           }

        try {
        const response = await axios({
          method: "post",
           url:  BASE_URL+orders,
           data: columns
          })
          // console.log('getFilteredOrders', Object.keys(response.data?.data[0])?.length);
          // console.log(response.data);
       return response.data
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
          status: state.ordersAll.searchParams.status_name?state.ordersAll.searchParams.status_name:state.ordersAll.statusName,
          order:[{column: state.ordersAll.sortColumn, dir: state.ordersAll.sortTable}],
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
        const response = await axios({
          method: "post",
           url:  BASE_URL+orders,
           data: columns
          })
console.log('all');
         return response.data
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
             try {
        const { data } = await axios({
          method: "get",
           url: BASE_URL+addOrder+`/${id}`,
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
  async (sendData , { rejectWithValue, getState }) => {    

    const state = getState();
    
const rows = state.ordersAll.createRows
const client = state.ordersAll.client

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
  order_products: sendData,
  utm: {...utm}, 
  date_create: '',
  discount: "",
  discount_type: "0",
  responsible: rows.responsible,
  responsible_group: rows.responsible_group,
  status:  rows.status?rows.status: '4',
  store_url: rows.store_url
  }
  console.log(dataSend);
       try {
        const { data } = await axios({
          method: "post", 
           url:  BASE_URL+addOrder,
           data: dataSend,  
  
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
  async ({idComent}, { rejectWithValue,  getState}) => {
    const state = getState(); 
    const coment = state.ordersAll.updatedComment
          try {
        const { data } = await axios({
          method: "post",
           url:  BASE_URL+addOrder+`/${idComent}/comment`,
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


export const setOrderReturn = createAsyncThunk(
  'return/post',
  async ({id, value }, { rejectWithValue}) => {
          try {
        const resp = await axios({
          method: "post",
           url:  BASE_URL+addOrder+`/${id}/${orderReturn}`,
           data: {order_return: value},
          });
          return {data: resp.data, id, status: resp.status}
      } catch (error) {
        console.log(error);
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setOrderPayment = createAsyncThunk(
  'payment/post',
  async ({id, value }, { rejectWithValue}) => {
          try {
        const resp = await axios({
          method: "post",
           url:  BASE_URL+addOrder+`/${id}/${payment}`,
           data: {payment_received: value},
          });
          return {data: resp.data, id, status: resp.status}
      } catch (error) {
        console.log(error);
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setOrderUpdatestatusPrepay = createAsyncThunk(
  'prepay/post',
  async ({selected, value }, { rejectWithValue}) => {
          try {
        const {data} = await axios({
          method: "post",
           url:  BASE_URL+orders+prepayStatus,
           data: {orders: selected, value: value},
          });
        return {data, selected}
       
      } catch (error) {
        console.log(error);
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setOrderStatusUpdate = createAsyncThunk(
  'status/post',
  async ({id, status, sent }, { rejectWithValue}) => {
          try {
        const {data} = await axios({
          method: "post",
           url:  BASE_URL+addOrder+`/${id}`,
           data: status?{status: status, sent: sent?sent:''}:{sent: sent?sent:''},
          });
         return {data, id}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);
// https://react.trendcrm.biz/api/select/orders/ttn/from/excel---------------------
export const setFileExcelSend = createAsyncThunk(
  'file/post',
  async (file, { rejectWithValue}) => {
    console.log(file);

          try {
        const {data} = await axios({
          method: "post",
           url:  BASE_URL+imp+orders+excel, 
           data: {file: file},
           headers: {"Content-Type": "multipart/form-data"}
          });
// console.log(data);
         return {data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

// https://react.trendcrm.biz/api/novaposhta/order/68/ttn---------------------
export const setNewPostTtnCreate = createAsyncThunk(
  'ttn/create',
  async ({id, weight, responsible_packer }, { rejectWithValue}) => {
          try {
        const {data} = await axios({
          method: "post",
           url:  BASE_URL+novaPochta+addOrder+`/${id}`+ttn,
           data: {weight: weight, responsible_packer: responsible_packer},
          });
         return {data, id}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const getPrintTtn = createAsyncThunk(
  'ttn/print',
  async ({ordersData, type}, { rejectWithValue}) => {
          try {
        const {data} = await axios({
          method: "post",
           url:  BASE_URL+orders+novaPochta+ttn,
           data: {orders: ordersData, type: type},
          });
         return {data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

// https://react.trendcrm.biz/api/novaposhta/order/69/ttn/delete----------------conflict-409

export const getNewPostTtnDelete = createAsyncThunk(
  'ttn/delete',
  async (id, { rejectWithValue}) => {
          try {
        const {data} = await axios({
          method: "post",
           url:  BASE_URL+novaPochta+addOrder+`/${id}`+ttn+remove,
           });
         return {data, id}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);
//react.trendcrm.biz/api/novaposhta/ttn/75/return -----------------conflict -409
export const getNewPostTtnReturn = createAsyncThunk(
  'ttn/return',
  async (id, { rejectWithValue}) => {
          try {
        const {data} = await axios({
          method: "post",
           url:  BASE_URL+novaPochta+addOrder+`/${id}`+ttn+returnTtn,
           });
         return {data, id}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const RemoveOrderFromId= createAsyncThunk(
  'order/delete',
  async (id, { rejectWithValue}) => {
          try {
        const resp = await axios({
          method: "post",
           url:  BASE_URL+addOrder+`/${id}`+deletOrder,
           data: {orders: [id], values: {status: 32}}
           });
           return {data: resp.status, id}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const getDataForAutocompliteList= createAsyncThunk(
  'products/list',
  async (query, { rejectWithValue}) => {
          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+products+name+autocomplete+list,
           data: {query: query?query:''}
           });
          //  console.log(resp.data.suggestions);
           return {data: resp.data.suggestions}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const getAtributesAutocompliteList= createAsyncThunk(
  'atributes/list',
  async (_,{ rejectWithValue}) => {
          try {
        const resp = await axios({
          method: "get",
           url:  BASE_URL+attributes,
           });
        
           return {data: resp.data.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setAtributesCreate= createAsyncThunk(
  'atributes/create',
  async (_,{ rejectWithValue, getState}) => {
    const state = getState();
          try {
        const resp = await axios({
          method: "post",
           url:  BASE_URL+attributes,
           data: state.ordersAll.newAtribute
           });
           return {data: resp.data ,text: state.ordersAll.newAtribute.name }       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const getSupliersList= createAsyncThunk(
  'supliers/list',
  async (query, { rejectWithValue}) => {
          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+suppliers,
           data: {query: query?query:''}
           });
          //  console.log(resp);
           return {data: resp.data.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const getCategoryList= createAsyncThunk(
  'category/list',
  async (_,{ rejectWithValue}) => {
          try {
        const resp = await axios({
          method: "get",
           url:  BASE_URL+category,
           });
          //  console.log(resp.data);
           return {data: resp.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);


export const getDescriptionList= createAsyncThunk(
  'description/list',
  async (query, { rejectWithValue}) => {
          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+novaPochta+description,
           data: {query: query?query:''}
           });
           return {data: resp.data.suggestions}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setNewProductCreate= createAsyncThunk(
  'product/create',
  async (_, { rejectWithValue, getState}) => {
    const state = getState(); 
          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+product,
           data: state.ordersAll.productCreate
           });
           console.log(state.ordersAll.productCreate);
           console.log(resp);
           return {data: resp.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setNewSupplierCreate= createAsyncThunk(
  'supplier/create',
  async (_, { rejectWithValue, getState}) => {
    const state = getState(); 
          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+supplier,
           data: state.ordersAll.newSuplplier
           });
           return {data: resp.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setAtributeCategoryList= createAsyncThunk(
  'atribute_category/list',
  async (_, { rejectWithValue}) => {
          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+atrCategory,
           });
          //  console.log(resp);
           return {data: resp.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);


export const setProductCategoryCreate= createAsyncThunk(
  'prod_category/create',
  async (_, { rejectWithValue, getState}) => {
    const state = getState(); 
 
          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+createProdCategory,
           data: state.ordersAll.newCategory
           });
           return {data: resp.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setAddCategoryAtribute= createAsyncThunk(
  'add_category/create',
  async (_, { rejectWithValue, getState}) => {
    const state = getState(); 

          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+addCategory,
           data: state.ordersAll.newCetegoryAtribute
           });
           console.log(resp);
           return {data: resp.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

// https://react.trendcrm.biz/api/add_attribute

export const setAddAtribute= createAsyncThunk(
  'add_atribute/create',
  async (_, { rejectWithValue, getState}) => {
    const state = getState(); 

          try {
         const resp = await axios({
          method: "post",
           url:  BASE_URL+addAtribute,
           data: state.ordersAll.newAtribute
           });
           console.log(resp);
           return {data: resp.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

// {category_id:"13"}  category

export const updateProductFromId= createAsyncThunk(
  'product/update',
  async (id, { rejectWithValue, getState}) => {
    const state = getState(); 
          try {
        const resp = await axios({
          method: "post",
           url:  BASE_URL+product+`/${id}`,
           data:  {category_id: state.ordersAll.newProduct.category}
           });
          //  console.log(resp);
           return {data: resp.data, id}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const addProductTooOrder= createAsyncThunk(
  'product_add/create',
  async ({id, data}, { rejectWithValue, getState}) => {
    const state = getState(); 
          try {
        const resp = await axios({
          method: "post",
           url:  BASE_URL+addOrder+`/${id}`+product+add,
           data:  data
           });
           return {data: resp.data, id: id }       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

// https://react.trendcrm.biz/api/product/20

// https://react.trendcrm.biz/api/order/product/17

export const getProductFromId= createAsyncThunk(
  'product/get',
  async (id, { rejectWithValue}) => { 
          try {
        const resp = await axios({
          method: "get",
           url:  BASE_URL+product+`/${id}`,
           });
        return {data: resp.data}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

// https://react.trendcrm.biz/api/order/product/40
export const setProductInOrderFromId= createAsyncThunk(
  'product/set',
  async ({id, data}, { rejectWithValue}) => { 
    console.log(id, data);
          try {
        const resp = await axios({
          method: "post",
           url:  BASE_URL+addOrder+product+`/${id}`,
           data: data   
          });
        return {data: resp.data, id: id}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);

export const setUpdateProductCategory= createAsyncThunk(
  'productCategory/update',
  async (data, { rejectWithValue}) => { 
            try {
        const resp = await axios({
          method: "post",
           url:  BASE_URL+updateProductCategory,
           data: data   
          });
          console.log(resp.data);
        return {data: resp.data, id: data.id}       
      } catch (error) {
        return rejectWithValue({
          error: error.message,
        });
      }
    
  },
);



