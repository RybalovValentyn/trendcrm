import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, autoUpdate, alertMessageUpdate } from '../../../../../redux/ordersReduser';
import {Box,Typography,Autocomplete, TextField} from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import {autocompliteInputStyle, textFieldStyles } from '../../order/forms/styles';
import { setOrderStatusUpdate, getAllStatuses, getFilteredOrders, getAllOrders } from '../../../../../redux/asyncThunc';
import { useEffect } from 'react';
import { IdComponent } from '../idComponent';
import { ModalComponent } from '../modalComponent';

const StatusUpdate = () =>{
    const dispatch = useDispatch();
    const statuses = useSelector((state) => state.ordersAll.getStatuses);
    let defaultStatus = statuses.find(str=> str.id === '4'); 
    const openstatusUpdate = useSelector((state) => state.ordersAll.modalControl.status_update);
    const columns = useSelector((state) => state.ordersAll.columns);
    const isStatusUpdated =  useSelector((state) => state.ordersAll.isStatusUpdated);
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const renderFilteredStatus = statuses.reduce((acc, status, index, array)=>{
         if (acc.findIndex(n=>n.name === status.name) === -1 && status.id !== 0) {
            acc.push(status)
        }
       return acc
     },[])


    const [status, setStatus] = useState(0);
    const [open, setOpen]= useState(false)
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }
    if (selected.length >0) {
      let defaultStatus = renderFilteredStatus.find(n=>n.id === selected[0]) 
      // defaultStatus =  statuses?.find(str=> str.id === d);
    }

useEffect(()=>{
   
if (isStatusUpdated) {
  setOpen(true)
  if (!open) {
    successAlert()
  }
    
    // getUpdate()   
    dispatch(autoUpdate({id: 'isStatusUpdated', str: false}));
}
},[isStatusUpdated])


const successAlert = () => {
  // console.log('successAlert');
    dispatch(getOpenTableCreate({id: 'status_update', str: false}));
    withReactContent(Swal).fire({  
        title: isStatusUpdated?'Переміщено':'Увага!',  
        text: isStatusUpdated?'Замовлення успішно переміщено':'Не всі статуси оновлено',
        icon: isStatusUpdated?'success':'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      }).then((result) => {        
        if (result.isConfirmed) {
          setOpen(false)
           getUpdate()
                }
      });     
}


const handleClouse =(e)=>{
   
  dispatch(getOpenTableCreate({id: 'status_update', str: false}));
}
const listStyle={
    display: 'flex',
    padding: '7px 12px',
     width: '100%',
   
    
   
}

const handleSubmit=()=>{
   if (!selected || selected.length === 0) {
   return dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'warn'}))
   } else if (selected[0] && selected.length === 1) {      
        dispatch(setOrderStatusUpdate({id: selected[0], status: String(status.id)}))
        successAlert()
        return
        } else if(selected.length > 1){
            
            selected.map((n, i)=>{
                if (Number(n)) {
                  console.log(i === selected.length-1, status);
                    dispatch(setOrderStatusUpdate({id: String(n), status: String(status.id)}))
                    if (i === selected.length-1) {
                      successAlert()
                    }
                }
            })
            return
        }  
          
};

const onAutocompliteChange=(e)=>{    
    let ind = e.target.id.split('-')[2]  
    // console.log(renderFilteredStatus[ind]);
if (Number(ind)) {
    setStatus(renderFilteredStatus[ind])
}
};
const getUpdate = ()=>{
  // console.log('getUpdate');
    dispatch(getAllStatuses());
    if (filteredRows?.length > 0) {
      dispatch(getFilteredOrders())
    } else dispatch(getAllOrders())
  }

const Component = ()=>(
  <DialogContent>
        
  <Box sx={{width: '100%'}}>
      <Box sx={{ marginTop: '20px'}}>
      <Typography sx={{fontSize: '16px', margin: '10px 0' }}>{'Новий статус:'}</Typography>
      <Autocomplete
          id={'status'}
          disableClearable
          onChange={onAutocompliteChange}
          value={status?status:(defaultStatus?defaultStatus:null)}    
          // defaultValue ={defaultStatus?defaultStatus:null}           
          options={renderFilteredStatus}
          getOptionLabel={(option) => option.name}
          renderOption={(props, option, { selected }) => (
              <li key={option.id} style={listStyle} {...props}>
                {option.style && <span style={{display: 'block',width: '15px', height: '15px', 
                borderRadius: '50%', backgroundColor: option.style, marginRight: '10px'}}></span>}
                {option.name}
              </li>
            )}              
            sx={autocompliteInputStyle}
            renderInput={(params) => <TextField sx={textFieldStyles}  {...params} />}
        />
      </Box>

  <IdComponent/>
  </Box >
  </DialogContent>
)

    return(

      <ModalComponent Component={Component} funcOnClouse={handleClouse} open={openstatusUpdate} sendButtonText={'Зберегти'} titleText={"Змінити статус для кількох замовлень"}
      funcOnSend={handleSubmit} borderHeader={true} borderAction={false} alignAction={true}/>
 
    )
}

export default StatusUpdate