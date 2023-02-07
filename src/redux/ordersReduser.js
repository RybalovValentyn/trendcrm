import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { orderStatusThunk, getValidationForm, orderStatusUpdate } from './asyncOrders';
import { getSitysFromNp, getAdressFromNp, postRowsFromForm, getRowsAfterAdd,
         getAllOrders, getAllStatuses, getFilteredOrders, setCommentAdd, setOrderReturn,
          setOrderPayment, setOrderUpdatestatusPrepay,setOrderStatusUpdate, setFileExcelSend,
          setNewPostTtnCreate, getPrintTtn,getNewPostTtnDelete, getNewPostTtnReturn, RemoveOrderFromId,
          getDataForAutocompliteList, getAtributesAutocompliteList, getSupliersList, getCategoryList,
          getDescriptionList, setNewProductCreate, setNewSupplierCreate, setAtributeCategoryList,
          setProductCategoryCreate, setAddCategoryAtribute, setAddAtribute, setAtributesCreate,
          updateProductFromId, addProductTooOrder, getProductFromId} from './asyncThunc';
import { getSityNP, getAddressNP } from './novaPoshta';
import { tableParse } from '../components/tableBody/pages/order/tableParse';
import { translater, messages, typeMessage } from '../components/tableBody/pages/order/translate';

const table = tableParse.data


const rows=  { 
  delivery_type: '0',
  responsible_packer: '0',
  packer_name:'0',
  payment_type: '0',
  backward_delivery_summ: '0.00',
  prepay_amount: '0.00',
  datetime: '',
  datetime_sent: '',
  delivery_service_type: '0',
  payment_status: '0',
  warehouse_city: '',
  warehouse_address: '',
  delivery_payers: '0',
  delivery_payers_redelivery: '0',
  weight: '0',
  volume_general: "0.0000",
  seats_amount: "1",
  cost: "",
  novaposhta_comment: "",
  tnn: '',
  sent: "0",
  status: "0",
  doors_address: "",
  doors_city: "",
  doors_house: "",
  doors_flat: "",
  responsible: '0',
  // group_name: '',
  responsible_group: "4",
  store_url:'',
  // ttn_cost: '',
  client_comment: '',

  discount: "",
discount_type: "0",
order_products: [],


date_create:'',
};

const client={
  fio: '',
  // id: null,
  client_phone: '+38(0__)___-__-__',
  email: '',
  ig_username: '',
  comment: '',
  additional_field: '',
  // group_name: '',
}

const searchRefParams = {

  create_date_from: '',
  create_date_to: '',
  update_date_from: '',
  update_date_to: '' ,
  datetime_sent_from: '',
  datetime_sent_to: '',

  id: '',
  client: '',
  client_phone: '', 
  ig_username: '',
  comment: '',
  supplier: '',
  total: '',
  storage_income_price_sum: '',
  products_names: '',
  client_ip: '',
  ttn_cost: '',
  store_url: '',
  utm_source: '',
  utm_medium: '',
  utm_term: '',
  utm_content: '',
  utm_campaign: '',
  marketing: '',
  client_comment: '',
  responsible: '',
  group_name: '',
  ttn: '',
  store_id: '',
  client_groups: '',
  єcounterparty: '',
  delivery_type: '',
status_name: '',
backward_delivery_summ: '',
payment_type: '',
ttn_status_code: '',
ttn_update_at: '',
name_store_resp: '',
store_title: '',

packer_name: '',
payment_name: '',
ttn_status: '',
searchId: '',
prevalue: ''

}
const handlePending = state => {
  state.isLoading = true;
  state.isError= false;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.isError = true;
};

const requestFulfilled=(state, action) => {
  state.isError = false;
  state.isLoading = false;
};

// const getOpenMessage=(state, action) => {
//   if (!state.openMessage) {
//     state.openMessage = true;
//   }
 
// };


const colorUpdate=(str)=>{
  let color = '';
  if (str?.order_return === '1' && str?.payment_received === '0') {              
   return color = "rgba(255, 0, 0, 0.5)"
    } else if (str?.payment_received === '1') {
     return color = "rgba(28, 173, 34, 0.5)"
  } else return color = str.status_style

}
// const ProductDataRef={
// discount: 0,

// };
const newProductRef ={
  attribute_id: "",
category: "0",
cost: '',
data: "1",
icon: null,
name: "",
parent_id: "0",
price: '',
supplier_id: [],
value: "",
count: '',
discount: '',
typeDiscount: '%',
atrCategoryIds: [],
atributeIds: [],
}

const calcVolumeRef={length: 1, width: 1, heigth: 1, value: ''}

const productCreateRef={
    attribute_category: [],
    booked: 1,
    category_id: "",
    cost: "",
    description_novaposhta: "",
    name: "",
    price: "",
    sell_in_the_red: 1,
    sku: "",
    status: 1,
    supplier: [],
    volume_general: "",
    weight: "",
}
const newSuppliersRef={  name: "",   phone: "",  email: "",   comment: ""}

const newCategoryRef = {name: "", parent_id: "", attributes: []}

const newCategoryAtributeRef = {name: "newCategoryAtr-1", prod_categ: []}

const newAtributesRef = {name: '', category: ''}

const ordersReduser = createSlice({
    name: 'orders',
    initialState: {

    // columns: [...table],
    columns: [],
    getStatuses: [],
    // getStatuses: [...initStatus],
    searchParamCount : 0,
    sortColumn: 0,
    sortTable: 'desc',
    tHeadColumn: [],
    tHeadColumnFiltered: [],
    bodyTableRows: [],
    rowsToUpdate: {}, 
    nextStatus: 0,
    isLoading: false,
    order: [],
    isValid: false,
    error: '',
    isError: false,
    widthOfColumn:{},
    modalControl:{
      opendownload: false,
      columnSettings: false,
      comentSettings: false,
      send_sms: false,
      justin_create: false,
      prepay_update: false,
      status_update: false,
      date_send_update: false,
      open_modal_component: false,
      ttnNewPostCreate: false,
      productCreate: false,
      newProductCreate: false,
      newAtribute: false,
      newSuppliers: false,
      newCategory: false,
      volumeCalc: false,
      atributeCategory: false,
   newCreateAtribute: false,

  },
productData:[],
productsTooSend: [],
newProduct: {...newProductRef},
productCreate: {...productCreateRef},
newSuplplier: {...newSuppliersRef},
newCategory: {...newCategoryRef},
newCetegoryAtribute: {...newCategoryAtributeRef},
newAtribute: {...newAtributesRef},
ttn_status: {},
client: {...client},
 createRows:{...rows},
 searchParams: {...searchRefParams},
 delivery_type: [{name: 'Нова пошта', id: '12'},
                  {name: 'justin', id: '1'}, 
                  {name: 'delivery', id: '0'},
                  {name: 'Курєр', id: '17'},
                 { name: 'УкрПошта', id: '13'},
                { name: 'Самовивіз', id: '14'}],
 payment_type: [{name: 'Не Вибрано', id: '0', prepay_status: '' },
                {name: 'Оплачено', id: '86', prepay_status: '' },
                 {name: 'Наложений', id: '15', prepay_status: '' }, 
                {name: 'Передплата (оплачено)', id: '16', prepay_status: '1' } ,
                 {name: 'Передплата (не оплачено)', id: '16',  prepay_status: '0'},
                 {name: 'Оплачено ?', id: '95', prepay_status: '' },
                {name: 'operator', id: '2', prepay_status: '' }],
  delivery_service_type: [{name: 'Відділення', id: '0'},
                          {name:'Адреса', id: '1'}],
  sityNewPost:[],
  adressNewPost: [],
  delivery_payers: [{name: 'Отримувач', value: 'Recipient', id: '0'},
                    {name: 'Відправник', value: 'Sender', id: '1' }],
  delivery_payers_redelivery: [{name: 'Отримувач', value: 'Recipient',  id: '0'},
                               {name: 'Відправник', value: 'Sender',  id: '1'}],
  packer_name: [{name: 'Нічого не вибрано', id: '0'},
                {name: 'admin', id:'1'}],
  responsible: [{name: 'Admins', id: '1'}, {name: 'Admin', id: '0'}],
  payment_status: [{name: 'Ні', id: '0'}, {name:'Так', id: '1'}],
  sms_templates: [{name: 'Не вибрано', id: '0', value: ''},{name: 'Доставлено', id: '1', value: 'Shanovnij klient! Vidpravlennya pribulo. TTN №{ttn}'},
                  {name: 'Відправлено', id: '2', value: 'Уважаемый клиент! Ваш товар успешно отправлен. ТТН №{ttn}'}],
  group_name:[  {id: "4", name: "Администраторы", disabled: "0"},
                    {id: "5", name: "Менеджер КЦ", disabled: "0"},
                    {id: "6", name: "Маркетологи", disabled: "0"},
                    {id: "7", name: "Курьер", disabled: "0"}
  ],
  // products:[{id: 1, name: 'Название товара 1', data: 'Название товара 1'},
  //          {id: 2, name: 'Название товара 2', data: 'Название товара 2'}],
  products: [],
  atributes: [],
  suppliers: [],
  category: [],
  atributeCategory: [],
  calcVolume:{...calcVolumeRef},
  descriptionList: [],
  doors_city: [],
  doors_address:[],
  doors_flat: [],
  doors_house: [],
  updatedComment: '',
  autoupdate: 30,
  isAutoUpdate: false,
  isGrabAll: false,
  isUpdateRows: false,
  isAllListProducts: false,
  rowsPerPage: 100,
  page: 0,
  start: 0,
  tableLength: null,
  statusName: null,
  selectedRows: [],
  ttnWeigth: '',
  ttnResponsible: '',
  translater: {...translater},
  message: [],
  // openMessage: false,
  messageSendFile: '',
  typeMessage: '',
  isStatusUpdated: false,
  sneckBarMessage: null,
  },

   reducers: {

    autoUpdateAllReducer:(state, action) => {  
      // console.log(action.payload);
if (action.payload.str === 'clear' && action.payload.state ) {
 state[action.payload.state]= action.payload.ref
} else
        state[action.payload.state]= {...state[action.payload.state],[action.payload.id]: action.payload.str}
  },

    newProductCreate:(state, action) => {  
      console.log({[action.payload.id]: action.payload.str}, 'newProductCreate');
if (action.payload.str === 'clear') {
 state.productCreate = {...productCreateRef}
} else if (action.payload.id === 'all') {
  state.productCreate = {...action.payload.str,}
}else  state.productCreate= {...state.productCreate,[action.payload.id]: action.payload.str}
  },
  newProductUpdate:(state, action) => {  
        // console.log({[action.payload.id]: action.payload.str});
  if (action.payload.str === 'clear') {
    state.newProduct = {...newProductRef}
  } else if (action.payload.id === 'all') {
    state.newProduct = {...action.payload.str,count: 1, discount: '', cost: action.payload.str.price, typeDiscount: '%'}
  }  else state.newProduct= {...state.newProduct,[action.payload.id]: action.payload.str}
    },

    alertMessageUpdate: (state, action) => {  
      return { ...state,
        message: [messages[action.payload.message]] ,
        typeMessage: typeMessage[action.payload.type]
    };},
    autoUpdate: (state, action) => {  
         return { ...state, [action.payload.id]: action.payload.str}
    },
        tHeadFilteredColumnUpdate: (state, action) => {  
          return { ...state,
            tHeadColumnFiltered: [...action.payload ] 
        };},
    CountUpdate: (state, action)=>{
      return { ...state,
        searchParams:{...searchRefParams}
      }},
    getSortDate: (state, action) => { 
    // console.log(action.payload);
      switch (action.id) {
        case ('create_date_from'):
          return { ...state,
            searchParams:{ ...state.searchParams, create_date_from: action.payload.str}
        }
        case ('create_date_to'):
          return { ...state,
            searchParams:{ ...state.searchParams, create_date_to: action.payload.str}
        }
        default:
          return { ...state,
            searchParams:{ ...state.searchParams, [action.payload.id]: action.payload.str},
            rowsPerPage: state.rowsPerPage,
            start: 0
        }
      }
;},
    getStatusesUpdate: (state, action) => {  
      return { ...state,
        getStatuses: [...state.getStatuses,action.payload ] 
    };},
        getWidthUpdate: (state, action) => {  
          return { ...state,
            widthOfColumn: [...action.payload ] 
        };
        },  
        setWidthColumn: (state, action) => {  
          console.log(action.payload);
          return { ...state,
            widthOfColumn: {...state.widthOfColumn, [action.payload.id]: action.payload.width}
        };
        }, 
        getOpenTableCreate:  (state, action) => {  
          // console.log(action.payload, 'getOpenTableCreate' );
          return { ...state  ,
            modalControl:{...state.modalControl, [action.payload.id]: action.payload.str}
        };
        },  
        getClouseTableCreate:  (state, action) => {  
          return { ...state,
            createRows: {...rows},
            client: {...client},
            isUpdateRows: false,
        };
        },
        setClientForm:  (state, action) => {  
          // console.log(action.payload);
          return { ...state,
            client: { ...state.client, [action.payload.id]: action.payload.str}
        };
        },

        getFormTable: (state, action) => { 
          console.log(action.payload);
          switch (action.payload.id) {
        case ('warehouse_city'):               
        return { ...state,
          createRows:{ ...state.createRows, warehouse_city:action.payload.str,warehouse_address: '' }
      };

         default:
          return { ...state,
            createRows:{ ...state.createRows, [action.payload.id]: action.payload.str}
        };
          } 
  
        }, 
  },

  

      extraReducers: {
        
        [getProductFromId.pending]:handlePending,
        [getProductFromId.fulfilled](state, action) { 
          const func = ({category_id, attribute_id, attribute_name, parent_id, id, name})=>{
            let category = category_id
            let value = `${state.newProduct.name}-${attribute_name }`    
            name = `${id} - ${name}`
            return (
              {category, attribute_id, value, parent_id, name}
            )
          }
        const data = func(action.payload?.data)          
          state.newProduct = {...state.newProduct,...data}
          state.productData = [state.newProduct,...state.productData]
            requestFulfilled(state, action)
          // state.newProduct = {...newProductRef}
        },
        [getProductFromId.rejected]:handleRejected,
        
        [addProductTooOrder.pending]:handlePending,
        [addProductTooOrder.fulfilled](state, action) { 
          const func = ({amount, cost, discount, name, discount_type, price, product_id,supplier_id, icon})=>{
            let count = amount
             let  data = product_id
             let typeDiscount = discount_type === '0'? '%':'ua'
             let d = []
             d.push(supplier_id)
            supplier_id =[...d]
            return (
              {count, cost, discount, data, typeDiscount, price, icon, supplier_id, name  }
            )
          }
    if (action.payload?.data) {
            state.typeMessage= typeMessage.success;
             state.message = ['Товар додано', `замовлення ${action.payload?.id}`]
          }  
        const data = func(action.payload?.data)

          state.productData = [...state.productData]
          state.newProduct = {...data}
            requestFulfilled(state, action)
        },
        [addProductTooOrder.rejected]:handleRejected,
        
        [updateProductFromId.pending]:handlePending,
        [updateProductFromId.fulfilled](state, action) { 
            if (String(action.payload?.data) === '1') {
               state.typeMessage= typeMessage.success;
            state.message = ['Атрибут додано', action.payload.text]
            
          } else if (String(action.payload?.data) !== '1') {
            state.typeMessage= typeMessage.warn;
             state.message = ['Атрибут не додано', 'помилка']
          }   
          state.newProduct = {...newProductRef}
            requestFulfilled(state, action)
        },
        [updateProductFromId.rejected]:handleRejected, 
        
        [setAtributesCreate.pending]:handlePending,
        [setAtributesCreate.fulfilled](state, action) { 
            if (action.payload?.data[0]?.toLowerCase()  === 'ok') {
               state.typeMessage= typeMessage.success;
            state.message = ['Атрибут додано', action.payload.text]
            
          } else if (action.payload?.data[0]?.toLowerCase()  !== 'ok') {
            state.typeMessage= typeMessage.warn;
             state.message = ['Атрибут не додано', 'помилка']
          }   
          state.newAtribute = {...newAtributesRef}
            requestFulfilled(state, action)
        },
        [setAtributesCreate.rejected]:handleRejected, 

        [setAddAtribute.pending]:handlePending,
        [setAddAtribute.fulfilled](state, action) { 
          console.log(action.payload.data);
           if (action.payload.data) {
            state.typeMessage= typeMessage.success;
            state.message = ['Упішно','атрибут додано']
            
          }          
            requestFulfilled(state, action)
        },
        [setAddAtribute.rejected]:handleRejected, 

        [setAddCategoryAtribute.pending]:handlePending,
        [setAddCategoryAtribute.fulfilled](state, action) { 
          // console.log(action.payload.data);
           if (action.payload.data) {
            state.typeMessage= typeMessage.success;
            state.message = [`Створено категорію №: ${action.payload.data}`,]
            
          }          
            requestFulfilled(state, action)
        },
        [setAddCategoryAtribute.rejected]:handleRejected, 
        
        [setProductCategoryCreate.pending]:handlePending,
        [setProductCategoryCreate.fulfilled](state, action) { 
          console.log(action.payload.data);
           if (action.payload.data?.message) {
            state.typeMessage= typeMessage.success;
            state.message = [action.payload?.data?.message,]
            
          }         
            requestFulfilled(state, action)
        },
        [setProductCategoryCreate.rejected]:handleRejected, 

        [setAtributeCategoryList.pending]:handlePending,
        [setAtributeCategoryList.fulfilled](state, action) { 
          state.atributeCategory = action.payload.data.filter(n=>n.name !== '')
            requestFulfilled(state, action)
        },
        [setAtributeCategoryList.rejected]:handleRejected,
        
        [setNewSupplierCreate.pending]:handlePending,
        [setNewSupplierCreate.fulfilled](state, action) { 
          console.log(action.payload.data);
           if (action.payload.data?.message) {
            state.typeMessage= typeMessage.success;
            state.message = [action.payload?.data?.message,]
            
          } else if (action.payload.data) {
            state.typeMessage= typeMessage.error 
            state.message = [action.payload?.data?.message,]
          }         
            requestFulfilled(state, action)
        },
        [setNewSupplierCreate.rejected]:handleRejected, 

        [setNewProductCreate.pending]:handlePending,
        [setNewProductCreate.fulfilled](state, action) { 
          console.log(action.payload.data);
           if (action.payload.data?.status) {
            state.typeMessage= typeMessage.error;
            state.message = [action.payload?.data?.message,]
            
          } else if (action.payload.data) {
            state.typeMessage= typeMessage.success 
            state.message = [messages.productCreate,]
          }         
            requestFulfilled(state, action)
        },
        [setNewProductCreate.rejected]:handleRejected, 
        
        [getDescriptionList.pending]:handlePending,
        [getDescriptionList.fulfilled](state, action) { 
          // console.log(action.payload.data);
          state.descriptionList = action.payload.data.filter(n=>n.name !== '')
            requestFulfilled(state, action)
        },
        [getDescriptionList.rejected]:handleRejected,

        [getCategoryList.pending]:handlePending,
        [getCategoryList.fulfilled](state, action) { 
          // console.log(action.payload.data);
          state.category = action.payload.data.filter(n=>n.name !== '')
            requestFulfilled(state, action)
        },
        [getCategoryList.rejected]:handleRejected, 
        
        [getSupliersList.pending]:handlePending,
        [getSupliersList.fulfilled](state, action) { 
          
          let filtered = action.payload.data.filter(n=>n.name !== '')
           state.suppliers = filtered
            requestFulfilled(state, action)
        },
        [getSupliersList.rejected]:handleRejected, 

        [getAtributesAutocompliteList.pending]:handlePending,
        [getAtributesAutocompliteList.fulfilled](state, action) {
          state.atributes = action.payload.data
          
            requestFulfilled(state, action)
        },
        [getAtributesAutocompliteList.rejected]:handleRejected, 

        [getDataForAutocompliteList.pending]:handlePending,
        [getDataForAutocompliteList.fulfilled](state, action) { 
            state.products = action.payload.data
            requestFulfilled(state, action)
        },
        [getDataForAutocompliteList.rejected]:handleRejected, 
        [RemoveOrderFromId.pending]:handlePending,
        [RemoveOrderFromId.fulfilled](state, action) { 
          // getOpenMessage(state, action)
          if (String(action.payload.data) === '200') {
            console.log(action.payload);
            state.sneckBarMessage = [`${messages.deleted} ${action.payload.id}`, messages.recicled]
            state.typeMessage= typeMessage.success    
          } else 
          if (String(action.payload.data) !== '200') {
            state.sneckBarMessage = [`Щось пішло не так`]
             state.typeMessage= typeMessage.error 
          } 
            requestFulfilled(state, action)
        },
        [RemoveOrderFromId.rejected]:handleRejected, 

        [getNewPostTtnReturn.pending]:handlePending,
        [getNewPostTtnReturn.fulfilled](state, action) { 
          // getOpenMessage()
          if (action.payload.data?.error) {
            state.sneckBarMessage = [`${messages.orderttnError} ${action.payload.id}`,action.payload?.data?.error]
            state.typeMessage= typeMessage.error;
          } else if (action.payload.data?.message) {
            state.sneckBarMessage = [`${messages.orderttnError} ${action.payload.id}`, action.payload.data?.message]
            state.typeMessage= typeMessage.error   
          }
         
            requestFulfilled(state, action)
        },
        [getNewPostTtnReturn.rejected]:handleRejected, 

        [getNewPostTtnDelete.pending]:handlePending,
        [getNewPostTtnDelete.fulfilled](state, action) { 
          // getOpenMessage()
          if (action.payload.data?.error) {
            state.sneckBarMessage = [`${messages.orderttnError} ${action.payload.id}`,action.payload?.data?.error]
            state.typeMessage= typeMessage.error;
          } else if (action.payload.data?.message) {
            state.message = [messages.error, action.payload.data?.message]
            state.typeMessage= action.payload.data?.status   
          }
         
            requestFulfilled(state, action)
        },
        [getNewPostTtnDelete.rejected]:handleRejected, 

          [getPrintTtn.pending]:handlePending,
          [getPrintTtn.fulfilled](state, action) { 
            // getOpenMessage(state, action)
              state.message = [messages.error, action.payload.data?.message]
              state.typeMessage= action.payload.data?.status           
              requestFulfilled(state, action)
          },
          [getPrintTtn.rejected]:handleRejected, 
        [setNewPostTtnCreate.pending]:handlePending,
        [setNewPostTtnCreate.fulfilled](state, action) { 
          // getOpenMessage(state, action)
          if (action.payload?.data?.message) {
            state.message = [action.payload?.data?.message]
            state.typeMessage= typeMessage.success;
          } else if (action.payload?.data?.error
            ) {
            state.sneckBarMessage = [`${messages.orderttnError} ${action.payload.id}`,action.payload?.data?.error]
            state.typeMessage= typeMessage.error;
          } 
          requestFulfilled(state, action)
        },
        [setNewPostTtnCreate.rejected]:handleRejected,

        [setFileExcelSend.pending]:handlePending,
        [setFileExcelSend.fulfilled](state, action) { 
            
          if (action.payload?.data?.message) {
            state.messageSendFile = [action.payload?.data?.message]
            state.typeMessage= typeMessage.error   
            state.message = [messages.error, action.payload.data?.message]
          } 
          requestFulfilled(state, action)
        },
        [setFileExcelSend.rejected]:handleRejected,
        [setOrderStatusUpdate.pending]:handlePending,
        [setOrderStatusUpdate.fulfilled](state, action) { 
            console.log(action.payload);
           
          if (action.payload?.data?.message) {
            // getOpenMessage(state, action)
            state.typeMessage= typeMessage.warn;
            state.sneckBarMessage = [`Помилка в оновлені статусу замовлення № ${action.payload.id}`,action.payload?.data?.message]
          } else if (action.payload?.data?.sending) {
            // getOpenMessage(state, action)
            state.isStatusUpdated=true;
            state.typeMessage= typeMessage.success;
            state.sneckBarMessage = [`${messages.statusUpdateOrder} ${action.payload.id}`, messages.statusUpdate]
            // state.message = [`${messages.countOrder} ${action.payload?.data?.sending.length?action.payload?.data?.sending:1}`, messages.statusPrepay]  
          } else if (action.payload?.data) {
            state.typeMessage= typeMessage.success;
            state.message = [messages.dateUpdate] 
          }  
          requestFulfilled(state, action)
        },
        [setOrderStatusUpdate.rejected]:handleRejected,

        [setOrderUpdatestatusPrepay.pending]:handlePending,
        [setOrderUpdatestatusPrepay.fulfilled](state, action) { 
          // getOpenMessage(state, action)
          state.typeMessage= typeMessage.success;
          state.message = [`${messages.countOrder} ${action.payload?.selected}`, messages.statusPrepay]         
          requestFulfilled(state, action)
        },
        [setOrderUpdatestatusPrepay.rejected]:handleRejected,

        [setOrderPayment.pending]:handlePending,
        [setOrderPayment.fulfilled](state, action) { 
          // getOpenMessage(state, action)
          if (String(action.payload.status) === '200') {
            state.typeMessage= typeMessage.success;
            state.sneckBarMessage = [`${messages.paymentUpdate} ${action.payload.id}`,]
            
          }          
          requestFulfilled(state, action)
        },
        [setOrderPayment.rejected]:handleRejected,

        [setOrderReturn.pending]:handlePending,
        [setOrderReturn.fulfilled](state, action) {  
          // getOpenMessage(state, action)
          if (String(action.payload.status) === '200') {
            state.typeMessage= typeMessage.success;
            state.sneckBarMessage = [`${messages.paymentUpdate} ${action.payload.id}`,]
            
          }    
          requestFulfilled(state, action)
        },
        [setOrderReturn.rejected]:handleRejected,
        
        [setCommentAdd.pending]:handlePending,
        [setCommentAdd.fulfilled](state, action) {    
          const updatedRows = state.columns?.findIndex(n=>n.id===action.payload.idComent);
          state.columns[updatedRows].comment = action.payload.coment;
          requestFulfilled(state, action)
        },
        [setCommentAdd.rejected]:handleRejected,

          [getAllStatuses.pending]: handlePending,
         [getAllStatuses.fulfilled](state, action) {
             const statuses = Object.keys(action.payload.statuses);
              const filteredStatuses = action.payload.data.filter(str=>statuses.includes(str.id) || str.id === 0)
          return{
           ...state,
           getStatuses: [...filteredStatuses],
            isLoading: false,
            isError: false,
 
          }
        },
        [getAllStatuses.rejected]:handleRejected,

          [getFilteredOrders.pending]: handlePending,
          [getFilteredOrders.fulfilled](state, action) {
        const searchCount = Object.values(state.searchParams).reduce((acc, str) =>(str!==''?acc+=1:acc+=0),0);
         const filteredHeaderValue = state.tHeadColumnFiltered.reduce((acc,str, ind) =>{
              if (translater[str.data]) {
                 acc.push({id:str.data, str:translater[str.data]})
              }    
              return [...acc] 
            },[]);
            const tHeadColumnFiltered = state.tHeadColumnFiltered
           const arrayFilteredRows = action.payload.data?.map((str, ind) =>{
            let color = colorUpdate(str)
              return (tHeadColumnFiltered.reduce((acc,val, ind) =>{    
                acc.push({id:val.data, value: str[val.data], color: color !== ''?color:str.status_style, statusColor: str.status_style })         
                return [...acc]   
              },[]));
            
            })

              return{
             ...state,
             searchParamCount: searchCount,
             columns: [...action.payload.data],
             tableLength: action.payload.recordsFiltered,
              isLoading: false,
              isError: false,
              tHeadColumn: filteredHeaderValue,
              bodyTableRows: arrayFilteredRows ,
            }
          },
          [getFilteredOrders.rejected]:handleRejected,

        [getAllOrders.pending]:handlePending,

        [getAllOrders.fulfilled](state, action) {
            const searchCount = Object.values(state.searchParams).reduce((acc, str) =>(str!==''?acc+=1:acc+=0),0);
           const headerValue = Object.entries(translater).reduce((acc,str, ind) =>{
            if (str.values) {
              acc.push({id:str[0], str:str[1]})
            }   
            return [...acc] 
              },[]);
          const arrayRows = action.payload.data?.map((str, ind) =>{
            let color = colorUpdate(str)
            return (headerValue.reduce((acc,val, ind) =>{               
              acc.push({id:val.id, value: str[val.id], color: color !== ''?color:str.status_style, statusColor: str.status_style })         
              return [...acc]   
            },[]));
          });
            return{
           ...state,
           searchParamCount: searchCount,
           columns: [...action.payload.data],
           tableLength: Number(action.payload.recordsTotal),
            isLoading: false,
            isError: false,
            tHeadColumn: headerValue,
            bodyTableRows: arrayRows,
            }
        },
        [getAllOrders.rejected]:handleRejected,
    
        [orderStatusThunk.pending]:handlePending,
        [orderStatusThunk.fulfilled](state, action) {

          return{
           ...state,
            nextStatus: action.payload,
            isLoading: false,
            isError: false,
            isValid: true,
          }
        },
        [orderStatusThunk.rejected]:handleRejected,

          [getValidationForm.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
              isValid: false,
            }; 
          },
          [getValidationForm.fulfilled](state, action) {      
            return{
             ...state, isValid: true,
             isError: false,
            }
          },
          [getValidationForm.rejected](state, action) {
           
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
              isValid: false,
            };      
          },
          // [orderStatusUpdate.pending](state, action) {
          //   return {
          //     ...state,
          //     isLoading: true,
          
          //       }; 
          // },
          // [orderStatusUpdate.fulfilled](state, action) {    
          //     return{
          //    ...state,
          //    getStatuses: [...action.payload],

          //   }
          // },
          // [orderStatusUpdate.rejected](state, action) {
          //   return {
          //     ...state,
          //     isLoading: false,
          //     error: action.payload,
          //     isError: true,
             
          //   };      
          // },
          [getSitysFromNp.pending]:handlePending,
          [getSitysFromNp.fulfilled](state, action) {    
              return{
             ...state,
             sityNewPost: [...action.payload],
             isLoading: false,
            }
          },
          [getSitysFromNp.rejected]:handleRejected,
    
          [getAdressFromNp.pending]:handlePending,
          [getAdressFromNp.fulfilled](state, action) {    
            // console.log(action.payload);
              return{
             ...state,
             adressNewPost: [...action.payload],
             isError: false,
             isLoading: false,
            }
          },
          [getAdressFromNp.rejected]:handleRejected,

          [getSityNP.pending]:handlePending,
          [getSityNP.fulfilled](state, action) {    
            // console.log(action.payload);
              return{
             ...state,
             doors_city: [...action.payload],
             isError: false,
             isLoading: false,
            }
          },
          [getSityNP.rejected]:handleRejected,
          
          [getAddressNP.pending]:handlePending,
          [getAddressNP.fulfilled](state, action) {    
            // console.log(action.payload);
              return{
             ...state,
             doors_address: [...action.payload],
             isError: false,
             isLoading: false,
            }
          },
          [getAddressNP.rejected]:handleRejected,
          
          [postRowsFromForm.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
              error: '',
              id: ''
                }; 
          },
          [postRowsFromForm.fulfilled](state, action) {    
            // console.log(action.payload);
              return{
             ...state,
             createRows: { ...state.createRows, id: action.payload.order_id},
             isError: false,
             isLoading: false,

            }
          },
          [postRowsFromForm.rejected]:handleRejected,
          
          [getRowsAfterAdd.pending]:handlePending,
          [getRowsAfterAdd.fulfilled](state, action) {    

            const getData = ({attribute_id, amount, price, parent_id, name, cost, id, discount, discount_type, attribute_name, supplier_id, icon, attribute})=>{
              let data = id
              let typeDiscount = discount_type === '0'? '%': 'ua'
              let value = `${id}-${name}-${attribute_name}`
             let d = []
             d.push(supplier_id)
             supplier_id = [...d]             
             let count = amount
             let categoryListFrom = []
             if (attribute?.length > 0) {
               categoryListFrom = attribute.map(n=>([n.category, n.name])) 
             }

              return {attribute_id, count, price, parent_id, name, cost, data, discount, typeDiscount, value, supplier_id, icon, categoryListFrom            }
            }
            // console.log(action.payload);
            let packer_name = action.payload.delivery.packer_name?action.payload.delivery.packer_name: '0' ;
            let payment_type = action.payload.order.payment_type?action.payload.order.payment_type : '0';
            let delivery_service_type = (action.payload.delivery.delivery_service_type || action.payload.delivery.warehouse_city !== '')?'0' : '1';
            let delivery_payers =  action.payload.delivery.payer === 'Recipient'?'0': '1';
            let delivery_payers_redelivery = action.payload.delivery.payer_redelivery === 'Recipient'?'0': '1';                                                
            let weight = action.payload.delivery.weight?action.payload.delivery.weight: 0;
            let volume_general = action.payload.delivery.volume_general?action.payload.delivery.volume_general: 0;
            let seats_amount = action.payload.delivery.seats_amount?action.payload.delivery.seats_amount:1;
            let prepay_status = action.payload.delivery.prepay_status?action.payload.delivery.prepay_status: 0;
            let products = []
            if (action.payload.products.length > 0) {
              products = [...action.payload.products.map(n=>(getData(n)))]
            }
           return{
             ...state,            
             client: {...action.payload.client, comment: action.payload.order.comment, 
               additional_field: action.payload.order.additional_field,},          
               createRows: {...action.payload.order, ...action.payload.delivery,
                  packer_name: packer_name, 
                  payment_type: payment_type,
                  delivery_service_type: delivery_service_type,
                  delivery_payers: delivery_payers,
                  delivery_payers_redelivery: delivery_payers_redelivery,
                  weight: weight,
                  volume_general: volume_general,
                  seats_amount:seats_amount,
                  status: action.payload.order.status,
                  backward_summ: action.payload.delivery.backward_summ?action.payload.delivery.backward_summ: 0,
                  prepay_status:prepay_status,
                  backward_delivery_summ: action.payload.delivery.backward_delivery_summ?action.payload.delivery.backward_delivery_summ: 0.00,
                  
                }, 
            productData: products,
             isError: false,
             isLoading: false,

            }
          },
          [getRowsAfterAdd.rejected]:handleRejected,

        }}
);

export const { getWidthUpdate, setWidthColumn, getOpenTableCreate,CountUpdate,tHeadFilteredColumnUpdate, autoUpdate,
   getFormTable, getClouseTableCreate, tHeadColumnUpdate,bodyTableRowsUpdate, getSortDate, getOpenTDownloadExel, setOpenRowsCreator,
   autoUpdateRowsReupdate, setClientForm, isAll, alertMessageUpdate, productsdataUpdate, newProductUpdate, newProductCreate, autoUpdateAllReducer
  } = ordersReduser.actions;
export default ordersReduser.reducer;

