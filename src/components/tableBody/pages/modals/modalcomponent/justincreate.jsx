import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, alertMessageUpdate } from '../../../../../redux/ordersReduser';
import {Box, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { BootstrapTooltip } from '../../order/styles';
import { StyledInput } from '../../order/createHead/input';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalComponent } from '../modalComponent';
import { IdComponent } from '../idComponent';

const JustinCreate = () =>{
    const dispatch = useDispatch();
    const openjustinCreate = useSelector((state) => state.ordersAll.modalControl.justin_create);
    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState('');
    const [alertOpen, setAlertOpen] = useState(false);
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }

const MySwal = withReactContent(Swal)

const successAlert = () => {
  dispatch(getOpenTableCreate({id: 'justin_create', str: false}));
    Swal.fire({  
        title: 'Увага!',  
        text: 'Ви дійсно хочете створити ЕН Justin',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ні',
        confirmButtonText: 'Так',
      }).then((result) => {        
        if (result.isConfirmed) {
            handle()
          Swal.fire(
            'Створено!',
            'ЕН Justin успішно створена',
            'success'
          )
        }
      }); 
}
const handle =()=>{
    console.log('ksjdbisn');
    setAlertOpen(true)
}

const handleClouse =(e)=>{   
  dispatch(getOpenTableCreate({id: 'justin_create', str: false}));
}


const handleCreateEN=()=>{
  if (!selected || selected.length === 0) {
    dispatch(getOpenTableCreate({id: 'justin_create', str: false}));
    dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'warn'}))
  } else successAlert()    
    

}
const handleInputChange=(e)=>{
    if (Number(e.target.value) || e.target.value === 0) {
    setValue(e.target.value)  
}else return
}
const handleKey=(e)=>{
    if (e.key === 'Backspace') {
        setValue('')  
    }
};
const handleChange =()=>{
 setDisabled(!disabled)
}

const Component = ()=>(
  <DialogContent>
        
  <Box sx={{width: '100%'}}>
      <Box sx={{display: 'flex', marginTop: '30px', alignItems: 'center'}}>
      <BootstrapTooltip title="Вага застосовується до всих вибраних замовлень.Якщо, залишити пустим - вага посилки буде дорівнювати вазі, вказаній у замовленні"
       placement="right" sx={{maxWidth: '100px'}}>
           <HelpOutlinedIcon fontSize='small'/>
       </BootstrapTooltip>
           <Typography sx={{marginLeft: '10px', fontSize: '14px', display: 'block',marginRight: '10px'}}>{'Вага посилки'}</Typography>
           < StyledInput autoFocus onKeyDown={handleKey} autoComplete='off' value={value} onChange={handleInputChange} disabled={!disabled} />
           <Switch checked={disabled} onChange={handleChange} color="default" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':{backgroundColor: '#FFB200'}}} />
           
      </Box>

      <IdComponent/>

  </Box >
 
  </DialogContent>
)
    return(
      <ModalComponent Component={Component} open={openjustinCreate} sendButtonText={'Створити'} titleText={"Створити ЕН УкрПошта для замовлень"}
      funcOnSend={handleCreateEN} funcOnClouse={handleClouse} borderHeader={true} borderAction={false} alignAction={true} />
    
    )
}

export default JustinCreate