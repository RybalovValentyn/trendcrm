import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import { StyledTextField, textFieldStyle, typoGrafyStyle } from './style';
import {  useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newProductUpdate } from '../../../../../redux/ordersReduser';
import Grid from '@mui/material/Unstable_Grid2';


const InputTextComponent=({id, textContent, num,label, path, showInput=true} )=>{
    const dispatch =useDispatch();
const [value, setValue]=useState('')
const dubleValue =useSelector((state)=>state.ordersAll)
const v = dubleValue[path]?dubleValue[path]:0
const handleChahnge=(e)=>{
    let str = e.target.value
    if (num) {
    str = e.target.value.replace(/[^0-9.]/g, '');        
    }
    setValue(str) 
}

const handleBlur=()=>{
   if (value !== '') {
    dispatch(newProductUpdate({id: id, str: value}))    
   }     

}
const HandleKeyDown=(e)=>{
    if (e.key === 'Backspace') {
        setValue('')  
        dispatch(newProductUpdate({id: id, str: ''}))
    }

}
    return(

<Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center',  }} >
<Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: 'space-evenly'  }}} >
  <Grid xs={10} sm={4} sx={{maxWidth: '110px',maxHeight: '40px', '@media (min-width:599px)':{textAlign: 'right'  }}} >
  <Typography sx={{typoGrafyStyle}}>{textContent}</Typography>
  </Grid>
  <Grid xs={6} sm={6} sx={{maxWidth: '250px',maxHeight: '40px', width: '250px'}}>
  {showInput?<StyledTextField id={id}  sx={textFieldStyle} onChange={handleChahnge} value={value?value:v[id]}
                     onBlur={handleBlur} onKeyDown={HandleKeyDown}  placeholder={label} fullWidth variant="outlined"/>:null}
</Grid>
</Grid>
</Box>

    )
}

export default InputTextComponent