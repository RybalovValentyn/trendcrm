import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import { typoGrafyStyle } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { newProductUpdate } from '../../../../../redux/ordersReduser';
import Grid from '@mui/material/Unstable_Grid2';
import s from './style.module.scss';


const InputTextComponent=({id, textContent, num,label, path, showInput=true, alignCenter=false, disp=newProductUpdate, alignText=false} )=>{
    const dispatch =useDispatch();
const dubleValue =useSelector((state)=>state.ordersAll)
const v = dubleValue[path]?dubleValue[path]:0


const handleChahnge=(e)=>{
    let str = e.target.value
    if (num) {
    str = e.target.value.replace(/[^0-9.]/g, '');        
    }
    dispatch(disp({id: id, str: str})) 
}
    return(

<Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center',  }} >
<Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: alignCenter?'space-between':'space-evenly'  }}} >
  <Grid xs={10} sm={4} sx={{maxWidth: '110px',maxHeight: '40px', '@media (min-width:599px)':{textAlign: alignText?'left':'right'  }}} >
  <Typography sx={{typoGrafyStyle}}>{textContent}</Typography>
  </Grid>
  <Grid xs={6} sm={6} sx={{maxWidth: '250px',maxHeight: '40px', width: '250px'}}>
  {showInput?<input autoComplete='off' id={id}  className={s.inputModal} onChange={handleChahnge} value={v[id]}
          placeholder={label}  />:null} 
</Grid>
</Grid>
</Box>

    )
}

export default InputTextComponent