import { createSlice } from '@reduxjs/toolkit';

const statusReduser = createSlice({
  name: 'status',
  initialState: {
    name: '',
    statusId: '',
    color: '#9f9f9f',
    group: [],
    runInStore: '',
    accepted: true,
    deliveryStatus: true,
    infoStatus: true,
    allStatuses: [],
    isValid: false,
    groupsName:[
      'Адміністратори',
      'Менеджери',
      'Маркетологи',
      'Курєри',
    ],
    storeRuns: [
      'Нічого не робити',
      'Бронювати',
      'Відправити',
      'Зписати',
      'Повернути на склад',
    ],
    isAccepted:[
      'Так','Ні'
    ],
  },

    reducers: {
      clearStatusState: (state, action) => {
        return { ...state, 
             name: '',
            statusId:'',
            color: '#9f9f9f',
            group: [],
            runInStore: '',
            accepted: true,
            deliveryStatus: true,
            infoStatus: true,
            allStatuses: [],  
            isValid: false,  
      }},
        idStatus: (state, action) => {
        return { ...state, statusId: action.payload };
      },
        nameStatus: (state, action) => {
          return { ...state, name: action.payload };
        },
        colorStatus: (state, action) => {
          return { ...state, color: action.payload };
        },
        groupStatus: (state, action) => {
          return { ...state, group: action.payload };
        },
       runStatus: (state, action) => {
            return { ...state, runInStore: action.payload };
          },
          acceptedStatus: (state, action) => {
            return { ...state, accepted: action.payload };
          },
          deliverypStatus: (state, action) => {
            return { ...state, deliveryStatus: action.payload };
          },
          infoStatus: (state, action) => {
            return { ...state, infoStatus: action.payload };
          },
          allStatuses: (state, action) => {
            return { ...state, allStatuses: action.payload };     
      },     
       validationForm: (state, action) => {
        return { ...state, isValid: action.payload};
      }


  },
  extraReducers: {},
});

export const { nameStatus, numberStatus, colorStatus,
     groupStatus, runStatus, acceptedStatus, 
     deliverypStatus, infoStatus, allStatuses, idStatus,
     clearStatusState, validationForm
    } = statusReduser.actions;
export default statusReduser.reducer;