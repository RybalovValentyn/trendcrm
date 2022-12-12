import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { orderStatusThunk, getValidationForm, orderStatusUpdate } from './asyncOrders';
import { getSitysFromNp, getAdressFromNp, postRowsFromForm, getRowsAfterAdd,
         getAllOrders, getAllStatuses, getFilteredOrders, setCommentAdd } from './asyncThunc';
import { getSityNP, getAddressNP } from './novaPoshta';
import { tableParse } from '../components/tableBody/pages/order/tableParse';



const table = tableParse.data

const rows=  { 

  delivery_type: '0',
  responsible_packer: '0',
  packer_name:'0',
  // payment_type:0,
  payment_name: 0,
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

const client={
  fio: '',
  id: null,
  client_phone: '+38(0__)___-__-__',
  email: '',
  ig_username: '',
  comment: '',
  additional_field: '',
  group_name: '',
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
const handlePending = state => {
  state.isLoading = true;
  state.isError= false;
};
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
  state.isError = true;
};

const ordersReduser = createSlice({
    name: 'orders',
    initialState: {

    // columns: [...table],
    columns: [],
    getStatuses: [],
    // getStatuses: [...initStatus],
    searchParamCount : 0,
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

  },
 
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
 payment_name: [{name: 'Не Вибрано', id: '0', prepay_status: '' },
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
  delivery_payers: [{name: 'Отримувач', id: '0'},
                    {name: 'Відправник', id: '1'}],
  delivery_payers_redelivery: [{name: 'Отримувач', id: '0'},
                               {name: 'Відправник', id: '1'}],
  packer_name: [{name: 'Нічого не вибрано', id: '0'},
                {name: 'admin', id:'1'}],
  responsible: [{name: 'Admins', id: '1'}, {name: 'Admin', id: '0'}],
  prepay_status: [{name: 'Ні', id: '0'}, {name:'Так', id: '1'}],
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
          console.log(action.payload);
          return { ...state,
            widthOfColumn: {...state.widthOfColumn, [action.payload.id]: action.payload.width}
        };
        }, 
        getOpenTableCreate:  (state, action) => {  
          console.log(action.payload, 'getOpenTableCreate' );
          return { ...state  ,
            modalControl:{...state.modalControl, [action.payload.id]: action.payload.str}
        };
        },  
        getClouseTableCreate:  (state, action) => {  
          return { ...state,
            createRows: {...rows},
            client: {...client}
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
          //   case ('delivery_type'):       
          //   return { ...state,
          //     createRows:{ ...state.createRows,delivery_type :action.payload.ind}
          // };
        //   case ('responsible_packer'):                    
        //   return { ...state,
        //     createRows:{ ...state.createRows, responsible_packer:action.payload.ind}
        // };
      //   case ('packer_name'):                    
      //   return { ...state,
      //     createRows:{ ...state.createRows, packer_name:action.payload.ind}
      // };
            case ('payment_name'):            
            return { ...state,
              createRows:{ ...state.createRows, payment_name:action.payload.str, backward_delivery_summ: '0.00'}
          };
        //   case ('delivery_service_type'):                    
        //   return { ...state,
        //     createRows:{ ...state.createRows, delivery_service_type:action.payload.ind}
        // };
        // case ('delivery_payers'):                    
        // return { ...state,
        //   createRows:{ ...state.createRows, delivery_payers:action.payload.ind}
        //   };
          // case ('prepay_status'):                    
          // return { ...state,
          //   createRows:{ ...state.createRows, prepay_status:action.payload.ind}
          //   };
        //   case ('delivery_payers_redelivery'):                    
        //   return { ...state,
        //     createRows:{ ...state.createRows, delivery_payers_redelivery:action.payload.ind}
        // };
          //   case ('backward_delivery_summ'):          
          //   return { ...state,
          //     createRows:{ ...state.createRows, backward_delivery_summ:action.payload.str}
          // };
        //   case ('datetime'):              
        //   return { ...state,
        //     createRows:{ ...state.createRows, datetime:action.payload.str}
        // };
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
        [setCommentAdd.pending]:handlePending,
        [setCommentAdd.fulfilled](state, action) {    
          const updatedRows = state.columns?.findIndex(n=>n.id===action.payload.idComent);
          state.columns[updatedRows].comment = action.payload.coment;
          state.isError = false;
          state.isLoading = false;
        },
        [setCommentAdd.rejected]:handleRejected,

          [getAllStatuses.pending]: handlePending,
        [getAllStatuses.fulfilled](state, action) {
    
          return{
           ...state,
           getStatuses: [...action.payload],
            isLoading: false,
            isError: false,
 
          }
        },
        [getAllStatuses.rejected]:handleRejected,

          [getFilteredOrders.pending]: handlePending,
          [getFilteredOrders.fulfilled](state, action) {
              return{
             ...state,
             columns: [...action.payload],
              isLoading: false,
              isError: false,
   
            }
          },
          [getFilteredOrders.rejected]:handleRejected,

        [getAllOrders.pending]:handlePending,
        [getAllOrders.fulfilled](state, action) {
            return{
           ...state,
           columns: [...action.payload],
            isLoading: false,
            isError: false,
 
          }
        },
        [getAllOrders.rejected]:handleRejected,
    
        [orderStatusThunk.pending]:handlePending,
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
            console.log(action.payload);
              return{
             ...state,
             client: {...action.payload.client, comment: action.payload.order.comment, 
               additional_field: action.payload.order.additional_field,},          
               createRows: {...action.payload.order},

             isError: false,
             isLoading: false,

            }
          },
          [getRowsAfterAdd.rejected]:handleRejected,

        }}
);

export const { getWidthUpdate, setWidthColumn, getOpenTableCreate, searchCountUpdate,CountUpdate,tHeadFilteredColumnUpdate, autoUpdate,
   getFormTable, getClouseTableCreate, tHeadColumnUpdate,bodyTableRowsUpdate, getSortDate, getOpenTDownloadExel, setOpenRowsCreator,
   autoUpdateRowsReupdate, setClientForm
  } = ordersReduser.actions;
export default ordersReduser.reducer;

