import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector,  } from 'react-redux';
import { forwardRef } from 'react';
import { getOpenTableCreate, autoUpdate } from '../../../../redux/ordersReduser';
import { StyledButton } from '../../../buttons/buttons'; 
import { colorsRef } from '../../../../consts/colorConstants';
import {Box,Typography,IconButton, Switch, Autocomplete, TextField} from '@mui/material';
import { useState } from 'react';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import {autocompliteInputStyle, textFieldStyles } from '../order/forms/styles';
import { setOrderStatusUpdate, getAllStatuses, getFilteredOrders, getAllOrders } from '../../../../redux/asyncThunc';
import { useEffect } from 'react';

const Transition = forwardRef(function Transition(props, ref) {       
    return <Slide direction="down" ref={ref} {...props} />;
  });



const StatusUpdate = () =>{
    const dispatch = useDispatch();
    const statuses = useSelector((state) => state.ordersAll.getStatuses);
    const defaultStatus = statuses.find(str=> str.id === '4'); 
    const openstatusUpdate = useSelector((state) => state.ordersAll.modalControl.status_update);
    let selected =  sessionStorage.getItem("selected").split(',');
    const isStatusUpdated =  useSelector((state) => state.ordersAll.isStatusUpdated);
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const renderFilteredStatus = statuses.reduce((acc, status, index, array)=>{
        if (acc.findIndex(n=>n.name === status.name) === -1) {
            acc.push(status)
        }
       return acc
     },[])
    const [status, setStatus] = useState(0);


useEffect(()=>{
   
if (isStatusUpdated) {
    successAlert()
    getUpdate()   
    dispatch(autoUpdate({id: 'isStatusUpdated', str: false}));
}
},[isStatusUpdated])

const MySwal = withReactContent(Swal)


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
    if (Number(selected[0]) && selected.length === 1) {
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

    return(
        <Dialog
        open={openstatusUpdate}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClouse}
        aria-describedby="status_update"
        sx={{overflow: 'hidden',  '& .MuiPaper-root': {width: '600px', top: '-20%'}}}
          >
            <Box  sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
             borderBottom: `1px solid ${colorsRef.modalInputBorderColor}`}}>
            <DialogTitle sx={{width: '80%', whiteSpace: 'wrap', }}>
                {"Змінити статус для кількох замовлень"}</DialogTitle>
          <IconButton onClick={handleClouse}  component="button" sx={{marginRight: '10px'}}> 
            <HighlightOffIcon />
          </IconButton>
            </Box>

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

            <Typography sx={{fontSize: '14px', marginTop: '30px'}}>{'ID виділених замовлень:'}</Typography>
            <Box sx={{display: 'flex'}}> {selected.map((str, i, arr)=>
            <Typography key={i} sx={{fontSize: '14px'}}>{`${str} ${i!==arr.length-1?', ':''} `}</Typography>

                )}</Box>

        <Typography sx={{fontSize: '14px', marginTop: '20px'}}>{`Вибрано замовлень: ${selected[0]?selected.length:'0' }`}</Typography>
        </Box >
        </DialogContent>
        <DialogActions sx={{width: '95%',textAlign: 'center',
         marginLeft: 'auto', marginRight: 'auto', display: 'block', paddingBottom: '20px'}}>

      <StyledButton            
        text={'Зберегти'}
        func= {handleSubmit}
        border= {'#7bb31a'}               
           />

        </DialogActions>
      
      </Dialog> 
    )
}

export default StatusUpdate