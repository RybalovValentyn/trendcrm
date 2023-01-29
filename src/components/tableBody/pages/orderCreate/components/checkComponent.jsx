import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import { typoGrafyStyle } from './style';
import { useDispatch, useSelector } from 'react-redux';
import { newProductUpdate } from '../../../../../redux/ordersReduser';
import Grid from '@mui/material/Unstable_Grid2';
import s from './style.module.scss';
import { styled } from '@mui/material/styles';
import { colorsRef } from '../../../../../consts/colorConstants';
import Checkbox from '@mui/material/Checkbox';
import CheckIcon from '@mui/icons-material/Check';

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: '50%',
    border: 'none',
    width: 23,
    height: 23,
    color: colorsRef.svgColor
  }));

const CheckComponent=({id, textContent, alignCenter=false, disp=newProductUpdate, alignText=false, 
                            textWidth='110px', func } )=>{


const handleChange=(e)=>{
    // console.log(e.target.checked);
    let str = e.target.checked
func({id: id, str: str})
}
    return(

<Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center',  }} >
<Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: alignCenter?'space-between':'space-evenly'  }}} >
  <Grid xs={10} sm={6} sx={{maxWidth: textWidth,maxHeight: '40px', '@media (min-width:599px)':{textAlign: alignText?'left':'right'  }}} >
 <Typography sx={{fontSize: '14px'}}>{textContent}</Typography>
  </Grid>
  <Grid xs={6} sm={6} sx={{maxWidth: '250px',maxHeight: '40px', width: '250px'}}>
  <Checkbox
  onChange={handleChange}
      sx={{padding: 0,
        borderRadius: '50%',
        border: `1px solid ${colorsRef.svgColor}`,
        width: 23,
        height: 23,
        '&:hover': { bgcolor: 'transparent' },
      }}
      disableRipple
      defaultChecked
      color="default"
      checkedIcon={<CheckIcon sx={{color: colorsRef.svgColor }}  />}
      icon={<BpIcon sx={{color: colorsRef.svgColor }} />}
      inputProps={{ 'aria-label': 'Checkbox demo' }}
    />
</Grid>
</Grid>
</Box>

    )
}

export default CheckComponent