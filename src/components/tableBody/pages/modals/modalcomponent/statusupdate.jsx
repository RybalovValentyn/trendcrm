import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, autoUpdate } from '../../../../../redux/ordersReduser';
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
    const defaultStatus = statuses.find(str=> str.id === '4'); 
    const openstatusUpdate = useSelector((state) => state.ordersAll.modalControl.status_update);
    const isStatusUpdated =  useSelector((state) => state.ordersAll.isStatusUpdated);
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const renderFilteredStatus = statuses.reduce((acc, status, index, array)=>{
        if (acc.findIndex(n=>n.name === status.name) === -1) {
            acc.push(status)
        }
       return acc
     },[])
    const [status, setStatus] = useState(0);
    
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }


useEffect(()=>{
   
if (isStatusUpdated) {
    successAlert()
    getUpdate()   
    dispatch(autoUpdate({id: 'isStatusUpdated', str: false}));
}
},[isStatusUpdated])


const successAlert = () => {
    withReactContent(Swal).fire({  
        title: isStatusUpdated?'Переміщено':'Увага!',  
        text: isStatusUpdated?'Замовлення успішно переміщено':'Не всі статуси оновлено',
        icon: isStatusUpdated?'success':'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
      })
    
}


const handleClouse =(e)=>{
   
  dispatch(getOpenTableCreate({id: 'status_update', str: false}));
}
const listStyle={
    display: 'flex',
    padding: '7px 12px',
    borderRadius: '8px',
    width: 'max-content'
   
}

const handleSubmit=()=>{
    successAlert()
    dispatch(getOpenTableCreate({id: 'status_update', str: false}));
    if (selected[0] && selected.length === 1) {
        dispatch(setOrderStatusUpdate({id: selected[0], status: String(status)}))
        } else if(selected.length > 1){
            selected.map(n=>{
                if (Number(n)) {
                    dispatch(setOrderStatusUpdate({id: String(n), status: String(status)}))
                }
            })
        }  
          
};

const onAutocompliteChange=(e)=>{    
    let ind = e.target.id.split('-')[2]     
if (Number(ind)) {
    setStatus(statuses[ind].id)
}
};
const getUpdate = ()=>{
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
          onChange={onAutocompliteChange}
          value={defaultStatus}                
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