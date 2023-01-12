import DialogContent from '@mui/material/DialogContent';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate} from '../../../../../redux/ordersReduser';
import {Box,Typography} from '@mui/material';
import { useState } from 'react';
import { setOrderStatusUpdate,getFilteredOrders, getAllOrders } from '../../../../../redux/asyncThunc';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import { ValidationTextField } from '../../../../inputs/stylesInputs';
import { IdComponent } from '../idComponent';
import { ModalComponent } from '../modalComponent';


const DateSendUpdate = () =>{
    const dispatch = useDispatch();
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const opensDateSendUpdate = useSelector((state) => state.ordersAll.modalControl.date_send_update);
    let initDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const [locale, setLocale] = useState('uk');
    const [newDate, setNewDate] = useState(initDate);
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }

const handleClouse =(e)=>{   
  dispatch(getOpenTableCreate({id: 'date_send_update', str: false}));
}

const handleSubmit=()=>{
    dispatch(getOpenTableCreate({id: 'date_send_update', str: false}));
    console.log(selected);
    if (selected[0] && selected.length === 1) {
        dispatch(setOrderStatusUpdate({id: selected[0], sent: newDate}))
        getUpdate() 
        } else if(selected.length > 1){
            selected.map((n,ind,arr)=>{
                if (Number(n)) {
                    dispatch(setOrderStatusUpdate({id: String(n), sent: newDate}))
                    getUpdate()
                    if (Number(ind) === Number(arr.length -1)) {
                        getUpdate()  
                    }
                }
            })
        }  
           
};

const daateChange =(newValue) =>{
    let str = newValue.format('YYYY-MM-DD HH:mm:ss').toString();
    setNewDate(str)
      }
    

const getUpdate = ()=>{
    if (filteredRows?.length > 0) {
      dispatch(getFilteredOrders())
    } else dispatch(getAllOrders())
  }

const Component =()=>(
  <DialogContent>
        
  <Box sx={{width: '100%'}}>
      <Box sx={{ marginTop: '20px'}}>
      <Typography sx={{fontSize: '16px', margin: '10px 0' }}>{'Нова дата:'}</Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
      // id={name}
      inputFormat="YYYY-MM-DD"
      value={newDate}
      onChange={daateChange}
  renderInput={(params) => <ValidationTextField  align='left' {...params} />}
  />
</LocalizationProvider>

      </Box>
    <IdComponent/>
  </Box >
  </DialogContent>
)

    return(
      <ModalComponent Component={Component} funcOnClouse={handleClouse} open={opensDateSendUpdate}  sendButtonText={'Зберегти'} titleText={"Зміна дати відправки замовлень"}
      funcOnSend={handleSubmit} borderHeader={true} borderAction={false} alignAction={true}/>

   )
}

export default DateSendUpdate