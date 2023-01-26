import DialogContent from '@mui/material/DialogContent';
import { useDispatch, useSelector,  } from 'react-redux';
import { autoUpdate } from '../../../../../../redux/ordersReduser';
import {Box, Switch, Typography, Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import HelpOutlinedIcon from '@mui/icons-material/HelpOutlined';
import { BootstrapTooltip } from '../../../order/styles';
import { IdComponent } from '../../idComponent';
import {autocompliteInputStyle, textFieldStyles } from '../../../order/forms/styles';
import {styled } from '@mui/material/styles';
import { InputBase} from '@mui/material';
import { colorsRef } from '../../../../../../consts/colorConstants';

export const SwitchComponent =()=>{
    const dispatch = useDispatch();
      const [disabled, setDisabled] = useState(false);
    const packer = useSelector((state) => state.ordersAll.responsible);
    const ttnWeigth = useSelector((state) => state.ordersAll.ttnWeigth);


const handleInputChange=(e)=>{
    if (Number(e.target.value) || e.target.value === 0) {
        dispatch(autoUpdate({id: 'ttnWeigth', str: e.target.value}));
}else return
}
const handleKey=(e)=>{
    if (e.key === 'Backspace') {
        dispatch(autoUpdate({id: 'ttnWeigth', str: ''}));
    }
};
const handleChange =()=>{
 setDisabled(!disabled)
}

const onAutocompliteChange=(e)=>{    
    let ind = e.target.id.split('-')[2]     
if (Number(ind) || ind === '0') {
    console.log(ind);
    dispatch(autoUpdate({id: 'ttnResponsible', str: packer[ind].id}));
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

    return(
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
                 < StyledInput autoFocus onKeyDown={handleKey} autoComplete='off' value={ttnWeigth} onChange={handleInputChange} disabled={!disabled} />
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
    
}