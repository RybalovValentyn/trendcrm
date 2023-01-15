import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector,  } from 'react-redux';
import { getOpenTableCreate, alertMessageUpdate } from '../../../../../redux/ordersReduser';
import {Box, Switch, Typography, Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { BootstrapTooltip } from '../../order/styles';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import { ModalComponent } from '../modalComponent';
import { IdComponent } from '../idComponent';
import {autocompliteInputStyle, textFieldStyles } from '../../order/forms/styles';
import {styled } from '@mui/material/styles';
import { InputBase} from '@mui/material';
import { colorsRef } from '../../../../../consts/colorConstants';
import { setNewPostTtnCreate } from '../../../../../redux/asyncThunc';

const NewPostTtnCreate = () =>{
    const dispatch = useDispatch();
    const ttnNewPostCreate = useSelector((state) => state.ordersAll.modalControl.ttnNewPostCreate);
    const [disabled, setDisabled] = useState(false);
    const [value, setValue] = useState('');
    const packer = useSelector((state) => state.ordersAll.responsible);
    let selected =  [];
    if (sessionStorage.getItem("selected")) {
        selected =  sessionStorage.getItem("selected")?.split(',');
    }
    const [responsible, setResponsible] = useState();

const MySwal = withReactContent(Swal)

const successAlert = () => {
  dispatch(getOpenTableCreate({id: 'ttnNewPostCreate', str: false}));
    Swal.fire({  
        title: 'Увага!',  
        text: 'Ви дійсно хочете створити ТТН Нова Пошта',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ні',
        confirmButtonText: 'Так',
      }).then((result) => {        
        if (result.isConfirmed) {
            handle()
                }
      }); 
};
const success = ()=>{
    Swal.fire(
        'Задача завершена!',
        '',
        'success'
      )
}
const handle =()=>{
    let id = selected[0]
    if (selected.length === 1) {
        dispatch(setNewPostTtnCreate({id:id, weight: value, responsible_packer: responsible }))
        success() 
        return
    } else if (selected.length > 1) {
        selected.map(id=>{
            if (Number(id)) {
                dispatch(setNewPostTtnCreate({id:id, weight: value, responsible_packer: responsible })) 
            }
        })
        return
    } else dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'warn'}))
}

const handleClouse =(e)=>{ 

  dispatch(getOpenTableCreate({id: 'ttnNewPostCreate', str: false}));
}
const handleCreateEN=()=>{
  if (!selected || selected.length === 0) {
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

const onAutocompliteChange=(e)=>{    
    let ind = e.target.id.split('-')[2]     
if (Number(ind)) {
    setResponsible(packer[ind].id)
} 
};

const StyledInput = styled(InputBase)(({ theme }) => ({
    "& .Mui-disabled":{
      backgroundColor: '#EEEEEE',
      cursor: 'not-allowed'
    },
      '& .MuiInputBase-input': {
        borderRadius: '8px',
        position: 'relative',
        fontSize: '12px',
        border: `1px solid ${colorsRef.inputHeadBorderColor}`,
       padding: '6px 12px ',
        color: colorsRef.inputHeadTextColor, 
        width: '100%', 
        minWidth: '85px',
      },
  
  
    }));

const boxStyle = {
    display: 'flex',
    marginTop: '30px',
    alignItems: 'center',
    '@media (max-width: 520px)': {
        display: 'block',
      },

}

const boxTultipStile={
    display: 'flex',
    alignItems: 'center'
}
const Component = ()=>(
  <DialogContent>
        
  <Box sx={{width: '100%'}}>
      <Box sx={boxStyle}>
                    <Box sx={boxTultipStile}>
                <BootstrapTooltip title="Вага застосовується до всих вибраних замовлень.Якщо, залишити пустим - вага посилки буде дорівнювати вазі, вказаній у замовленні"
                placement="right" sx={{maxWidth: '100px'}}>
                    <HelpOutlinedIcon fontSize='small'/>
                </BootstrapTooltip>       
                    <Typography sx={{marginLeft: '10px', fontSize: '14px', display: 'block',marginRight: '10px'}}>{'Вага посилки'}</Typography>
                    </Box>
           < StyledInput autoFocus onKeyDown={handleKey} autoComplete='off' value={value} onChange={handleInputChange} disabled={!disabled} />
           <Switch checked={disabled} onChange={handleChange} color="default" sx={{ '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track':{backgroundColor: '#FFB200'}, marginLeft: '20px'}} />
           
      </Box>

      <Box sx={boxStyle}>
            <Box sx={boxTultipStile}>
            <BootstrapTooltip title="Встановлює відповідального за упаковку посилки"
            placement="right" sx={{maxWidth: '100px'}}>
                <HelpOutlinedIcon fontSize='small'/>
            </BootstrapTooltip>
                <Typography sx={{marginLeft: '10px', fontSize: '14px', display: 'block',marginRight: '10px'}}>{'Пакувальник:'}</Typography>
                </Box>
           <Autocomplete
          id={'responsible'}
          disableClearable
          onChange={onAutocompliteChange}              
          options={packer}
          getOptionLabel={(option) => option.name}            
            sx={autocompliteInputStyle}
            renderInput={(params) => <TextField sx={textFieldStyles}  {...params} />}
        />


      </Box>

      <IdComponent/>

  </Box >
 
  </DialogContent>
)
    return(
      <ModalComponent Component={Component} open={ttnNewPostCreate} sendButtonText={'Створити'} titleText={"Створити ТТН Нова Пошта для замовлень"}
      funcOnSend={handleCreateEN} funcOnClouse={handleClouse} borderHeader={true} borderAction={false} alignAction={true} isAutoclouse={true} />
    
    )
}

export default NewPostTtnCreate