import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { orderStatusThunk, getValidationForm, orderStatusUpdate } from './asyncOrders';
import { getSitysFromNp, getAdressFromNp } from './asyncThunc';


const initStatus =[
  {
    name: '1111111111111',
    statusId: '1',
    style: '#b74343',
    group: [
      'Адміністратори',
      'Менеджери',
      'Маркетологи',
      'Курєри'
    ],
    runInStore: 'Бронювати',
    accepted: true,
    deliveryStatus: true,
    infoStatus: true,
    checked: true
  },
  {
    name: '222222222',
    statusId: '1',
    style: '#b74343',
    group: [
      'Адміністратори',
      'Менеджери',
      'Маркетологи',
      'Курєри'
    ],
    runInStore: 'Бронювати',
    accepted: true,
    deliveryStatus: true,
    infoStatus: true,
    checked: true
  },
  {
    name: '3333333',
    statusId: '1',
    style: '#b74343',
    group: [
      'Адміністратори',
      'Менеджери',
      'Маркетологи',
      'Курєри'
    ],
    runInStore: 'Бронювати',
    accepted: true,
    deliveryStatus: true,
    infoStatus: true,
    checked: false
  }
  
]

// https://react.trendcrm.biz/api/order/2
// {fio: "Петрович", phone: "38 (066) 255-90-69", email: "valentlov@gmail.com", ig_username: "",…}
// additional_field: "",
// backward_delivery_summ: "0.00",
// comment: "ккккккккккк",
// cost: "0.00",
// delivery_payers:"Recipient",
// delivery_payers_redelivery:"Recipient",
// delivery_service_type: "1",
// delivery_type: "12",
// discount_total: "0",
// doors_address: "",
// doors_city: "",
// doors_flat: "",
// doors_house: "",
// email: "valentlov@gmail.com",
// fio: "Петрович",
// ig_username: "",
// list_script:"1",
// novaposhta_comment: "",
// payment_type:"15",
// phone: "38 (066) 255-90-69",
// responsible: "1",
// responsible_group: "0",
// responsible_packer: "0",
// script_id: "1",
// seats_amount: "1",
// sent: "",
// status: "4",
// tnn: ""
// type_discount_total: "0"
// utm_campaign: ""
// utm_content: ""
// utm_medium: ""
// utm_source: ""
// utm_term: ""
// volume_general: "0.0000"
// warehouse_address: "Відділення №11 (до 30 кг): просп. Слобожанський (ран. Газети Правди), 6"
// warehouse_city: "Дніпро"
// weight: "0.00"

const rows=  { 
 id: 0,
client_id: 0,
store_id: null,
store_url: '',
script_id: 1,
responsible: 'Admin',
responsible_group: 0,
responsible_packer: 0,
status: 0,
delivery_type: '',
delivery_price: 0.00,
payment_type: 0,
payment_status: 0,
prepay_amount: 0.00,
payment_received: 0,
discount: 0,
discount_type: 0,
order_return: 0,
total: 0.00,
backward_delivery_summ: '0.00',
total_weight:0.00,
total_volume_general: 0.00,
comment:'',
client_comment:'',
additional_field:'',
utm_source:null,
utm_medium:null,
utm_term:null,
utm_content:null,
utm_campaign:null,
datetime: '',
update_at: '',
view_id: 1,
new_datetime: '',
datetime_sent: null,
DT_RowId: 0,
delivery_type_id: 0,
client: '',
client_phone:'+38(0__)___-__-__',
banned_phone: 0,
ig_username: '',
client_ip: '',
count_calls: 0,
sms_count: null,
packer_name: null,
group_name: null,
status_name: '',
status_style: '#a2c4c9',
products_names: 'Услуги - 1 шт',
product_amount: 1,
system_action: '',
storage_income_price_sum: 1.00,
payment_name: '',
j_number: null,
justin_account: null,
j_ttn_cost: null,
j_status: '',
j_name: null,
ttn: '',
ttn_cost: 0.00,
ttn_status: null,
ttn_status_code: null,
ttn_update_at: null,
novaposhta_account: null,
counterparty: '',
barcode: null,
barcode_cost: null,
barcode_status: null,
ukrposhta_account: null,
store_title: null,
store_responsible: null,
name_store_resp: null,
supplier: null,
client_groups: '',
repeat_client: 1,
doubl_client: 1,
client_mail: '',
instagram: '',
warehouse_city: '',
warehouse_address: '',
weight: 0,
volume_general: 0,
novaposhta_comment: "",
cost: 0,
doors_address: "",
doors_city: "",
doors_flat: "",
doors_house: "",
};

const ordersReduser = createSlice({
  name: 'orders',
  initialState: {
 getStatuses: [...initStatus],
 isLoading: false,
 order: [],
 isValid: false,
 error: '',
 isError: false,
 widthOfColumn:[],
 openCreator: false,
 createRows:{...rows},
 delivery_type: ['Нова пошта', 'justin', 'delivery', 'Курєр', 'УкрПошта', 'Самовивіз'],
 payment_type :['Оплачено', 'Наложений', 'Передплата'],
 delivery_type_id: ['Відділення','Адреса'],
 sityNewPost:[],
 adressNewPost: [],
 payment_name: ['Відправник', 'Отримувач'],
  },

   reducers: {
        getWidthUpdate: (state, action) => {  
          return { ...state,
            widthOfColumn: [...action.payload ] 
        };
        },  
        setWidthColumn: (state, action) => {  
          return { ...state,
            widthOfColumn: [...state.widthOfColumn, action.payload]
        };
        }, 
        getOpenTableCreate:  (state, action) => {  
          return { ...state,
            openCreator: action.payload
        };
        },  
        getClouseTableCreate:  (state, action) => {  
          return { ...state,
            createRows: {...rows}
        };
        },
        getFormTable: (state, action) => { 
          console.log(action.payload);
          switch (action.payload.id) {
            case ('client'):
               return { ...state,
                createRows:{ ...state.createRows, client: action.payload.str}
            };
            case ('client_phone'):              
              return { ...state,
                createRows:{ ...state.createRows, client_phone: action.payload.str}
            };
            case ('backward_delivery_summ'):              
            return { ...state,
              createRows:{ ...state.createRows, backward_delivery_summ:action.payload.str}
          };
          case ('datetime'):              
          return { ...state,
            createRows:{ ...state.createRows, datetime:action.payload.str}
        };
          case ('payment_name'):                    
          return { ...state,
            createRows:{ ...state.createRows, payment_name:action.payload.str}
        };
        case ('warehouse_city'): 
        console.log('dddddddddd');             
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
    
        [orderStatusThunk.pending](state, action) {
          return {
            ...state,
            isLoading: true,
            isError: false,
            isValid: false,
          }; 
        },
        [orderStatusThunk.fulfilled](state, action) {
    
          return{
           ...state,
            getStatuses: [...state.getStatuses,action.payload],
            isLoading: false,
            isError: false,
            isValid: false,
          }
        },
        [orderStatusThunk.rejected](state, action) {
          return {
            ...state,
            isLoading: false,
            error: action.payload,
            isError: true,
            isValid: false,
          };},

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
          [orderStatusUpdate.pending](state, action) {
            return {
              ...state,
              isLoading: true,
          
                }; 
          },
          [orderStatusUpdate.fulfilled](state, action) {    
              return{
             ...state,
             getStatuses: [...action.payload],

            }
          },
          [orderStatusUpdate.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
             
            };      
          },
          [getSitysFromNp.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
                }; 
          },
          [getSitysFromNp.fulfilled](state, action) {    
              return{
             ...state,
             sityNewPost: [...action.payload],
             isLoading: false,
            }
          },
          [getSitysFromNp.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
             
            };      
          },
    
          [getAdressFromNp.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
              error: ''
                }; 
          },
          [getAdressFromNp.fulfilled](state, action) {    
            console.log(action.payload);
              return{
             ...state,
             adressNewPost: [...action.payload],
             isError: false,
             isLoading: false,
            }
          },
          [getAdressFromNp.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
            };      
          },
          
     
      

        }}
);

export const { getWidthUpdate, setWidthColumn, getOpenTableCreate, getFormTable, getClouseTableCreate} = ordersReduser.actions;
export default ordersReduser.reducer;

