import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { orderStatusThunk, getValidationForm, orderStatusUpdate } from './asyncOrders';
import { getSitysFromNp, getAdressFromNp, postRowsFromForm, getRowsAfterAdd, getAllOrders, getAllStatuses, getFilteredOrders } from './asyncThunc';
import { getSityNP, getAddressNP } from './novaPoshta';
import { tableParse } from '../components/tableBody/pages/order/tableParse';

const initStatus =[
  {
    name: 'Новий',
    statusId: '4',
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
    statusId: '9',
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
    statusId: '77',
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
  }
  
]

const table = tableParse.data

const rows=  { 
  fio: '',
  id: '',
  client_phone: '+38(0__)___-__-__',
  email: '',
  ig_username: '',
  comment: '',
  additional_field: '',
  delivery_type: 0,
  responsible_packer: 0,
  packer_name: '',
  // payment_type:0,
  payment_name: {name: 'Наложений', id: '15', prepay_status: '' },
  backward_delivery_summ: '0.00',
  backward_summ: '0.00',
  datetime: '',
  datetime_sent: '',
  delivery_service_type: 0,
  prepay_status: 0,
  warehouse_city: '',
  warehouse_address: '',
  delivery_payers: 0,
  delivery_payers_redelivery: 0,
  weight: 0,
  volume_general: "0.0000",
  seats_amount: "1",
  cost: "0.00",
  novaposhta_comment: "",
  tnn: '',
  sent: "0",
  status: "4",
  doors_address: "",
  doors_city: "",
  responsible: 'Admin',
  group_name: '',
  store_url:'',
  data_create: '',
  // ttn_cost: '',

};

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
  storage_income_price_sum: '',
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
  ttn: '',
  store_id: '',

status_name: '',
group_name: '',
packer_name: '',
payment_name: '',
ttn_status: '',
}

const ordersReduser = createSlice({
    name: 'orders',
    initialState: {

    // columns: [...table],
    columns: [],

    searchParamCount : 0,
    tHeadColumn: [],
    tHeadColumnFiltered: [],
    bodyTableRows: [],
    getStatuses: [],
    nextStatus: 0,
    isLoading: false,
    order: [],
    isValid: false,
    error: '',
    isError: false,
    widthOfColumn:[],
    modalControl:{
      openCreator: false,
      opendownload: false,
      columnSettings: false,
  },
 
ttn_status: {},
 createRows:{...rows},
 searchParams: {...searchRefParams},
 delivery_type: ['Нова пошта', 'justin', 'delivery', 'Курєр', 'УкрПошта', 'Самовивіз'],
//  payment_type :['Не вибрано','Оплачено', 'Наложений', 'Передплата'],
 payment_name: [{name: 'Не Вибрано', id: '0', prepay_status: '' },
                {name: 'Оплачено', id: '86', prepay_status: '' },
                 {name: 'Наложений', id: '15', prepay_status: '' }, 
                {name: 'Передплата (оплачено)', id: '16', prepay_status: '1' } ,
                 {name: 'Передплата (не оплачено)', id: '16',  prepay_status: '0'}],
  delivery_service_type: ['Відділення','Адреса'],
  sityNewPost:[],
  adressNewPost: [],
  delivery_payers: ['Отримувач', 'Відправник' ],
  delivery_payers_redelivery: ['Отримувач', 'Відправник' ],
  packer_name: ['Нічого не вибрано','admin'],
  responsible: ['Admin'],
  prepay_status: ['Ні','Так'],
  doors_city: [],
  doors_address:[],
  doors_flat: [],
  doors_house: [],
  autoupdate: 0,
  isAutoUpdate: false,
  isGrabAll: false,
  },

   reducers: {
    autoUpdate: (state, action) => {  
      console.log(action.payload);
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
    searchCountUpdate: (state, action)=>{
      return { ...state,
        searchParamCount: action.payload
      }},
    getSortDate: (state, action) => { 
    console.log(action.payload);
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
            searchParams:{ ...state.searchParams, [action.payload.id]: action.payload.str}
        }
      }
;},
    getStatusesUpdate: (state, action) => {  
      return { ...state,
        getStatuses: [...state.getStatuses,action.payload ] 
    };},
       bodyTableRowsUpdate: (state, action) => {  
        return { ...state,
          bodyTableRows: [...action.payload ] 
      };},
       tHeadColumnUpdate: (state, action) => {  
          return { ...state,
            tHeadColumn: [...action.payload ] 
        };},
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
        getOpenTDownloadExel:  (state, action) => {  
          return { ...state  ,
            modalControl:{...state.modalControl, opendownload: action.payload}
        }},
        getOpenTableCreate:  (state, action) => {  
          console.log(action.payload);
          return { ...state  ,
            modalControl:{...state.modalControl, [action.payload.id]: action.payload.str}
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
            case ('fio'):
               return { ...state,
                createRows:{ ...state.createRows, fio: action.payload.str}
            };
            case ('phone'):              
              return { ...state,
                createRows:{ ...state.createRows, phone: action.payload.str}
            };
            case ('delivery_type'):       
            return { ...state,
              createRows:{ ...state.createRows,delivery_type :action.payload.ind}
          };
          case ('responsible_packer'):                    
          return { ...state,
            createRows:{ ...state.createRows, responsible_packer:action.payload.ind}
        };
        case ('packer_name'):                    
        return { ...state,
          createRows:{ ...state.createRows, packer_name:action.payload.ind}
      };
            case ('payment_name'):            
            return { ...state,
              createRows:{ ...state.createRows, payment_name:action.payload.str, backward_delivery_summ: '0.00'}
          };
          case ('delivery_service_type'):                    
          return { ...state,
            createRows:{ ...state.createRows, delivery_service_type:action.payload.ind}
        };
        case ('delivery_payers'):                    
        return { ...state,
          createRows:{ ...state.createRows, delivery_payers:action.payload.ind}
          };
          case ('prepay_status'):                    
          return { ...state,
            createRows:{ ...state.createRows, prepay_status:action.payload.ind}
            };
          case ('delivery_payers_redelivery'):                    
          return { ...state,
            createRows:{ ...state.createRows, delivery_payers_redelivery:action.payload.ind}
        };
            case ('backward_delivery_summ'):          
            return { ...state,
              createRows:{ ...state.createRows, backward_delivery_summ:action.payload.str}
          };
          case ('datetime'):              
          return { ...state,
            createRows:{ ...state.createRows, datetime:action.payload.str}
        };
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

          [getAllStatuses.pending](state, action) {
          return {
            ...state,
            isLoading: true,
            isError: false,
 
          }; 
        },
        [getAllStatuses.fulfilled](state, action) {
    
          return{
           ...state,
           getStatuses: [...action.payload],
            isLoading: false,
            isError: false,
 
          }
        },
        [getAllStatuses.rejected](state, action) {
          return {
            ...state,
            isLoading: false,
            error: action.payload,
            isError: true,
 
          };},

          [getFilteredOrders.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
   
            }; 
          },
          [getFilteredOrders.fulfilled](state, action) {
              return{
             ...state,
             columns: [...action.payload],
              isLoading: false,
              isError: false,
   
            }
          },
          [getFilteredOrders.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
   
            };},

        [getAllOrders.pending](state, action) {
          return {
            ...state,
            isLoading: true,
            isError: false,
 
          }; 
        },
        [getAllOrders.fulfilled](state, action) {
            return{
           ...state,
           columns: [...action.payload],
            isLoading: false,
            isError: false,
 
          }
        },
        [getAllOrders.rejected](state, action) {
          return {
            ...state,
            isLoading: false,
            error: action.payload,
            isError: true,
 
          };},
    
        [orderStatusThunk.pending](state, action) {
          return {
            ...state,
            isLoading: true,
            isError: false,
          }; 
        },
        [orderStatusThunk.fulfilled](state, action) {
    console.log(action.payload);
          return{
           ...state,
            nextStatus: action.payload,
            isLoading: false,
            isError: false,
            isValid: true,
          }
        },
        [orderStatusThunk.rejected](state, action) {
          return {
            ...state,
            isLoading: false,
            error: action.payload,
            isError: true,
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
            // console.log(action.payload);
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

          [getSityNP.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
              error: ''
                }; 
          },
          [getSityNP.fulfilled](state, action) {    
            // console.log(action.payload);
              return{
             ...state,
             doors_city: [...action.payload],
             isError: false,
             isLoading: false,
            }
          },
          [getSityNP.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
            };      
          },
          
          [getAddressNP.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
              error: ''
                }; 
          },
          [getAddressNP.fulfilled](state, action) {    
            // console.log(action.payload);
              return{
             ...state,
             doors_address: [...action.payload],
             isError: false,
             isLoading: false,
            }
          },
          [getAddressNP.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
            };      
          },
          
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
          [postRowsFromForm.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
            };      
          },
          
          [getRowsAfterAdd.pending](state, action) {
            return {
              ...state,
              isLoading: true,
              isError: false,
              error: '',
              id: ''
                }; 
          },
          [getRowsAfterAdd.fulfilled](state, action) {    
            // console.log(action.payload);
              return{
             ...state,
             columns: { ...state.columns,...action.payload.order},
             isError: false,
             isLoading: false,

            }
          },
          [getRowsAfterAdd.rejected](state, action) {
            return {
              ...state,
              isLoading: false,
              error: action.payload,
              isError: true,
            };      
          },

        }}
);

export const { getWidthUpdate, setWidthColumn, getOpenTableCreate, searchCountUpdate,CountUpdate,tHeadFilteredColumnUpdate, autoUpdate,
   getFormTable, getClouseTableCreate, tHeadColumnUpdate,bodyTableRowsUpdate, getSortDate, getOpenTDownloadExel} = ordersReduser.actions;
export default ordersReduser.reducer;

