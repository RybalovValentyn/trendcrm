import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import Autocomplete, { createFilterOptions }  from '@mui/material/Autocomplete';
import { StyledTextField, textFieldStyle, typoGrafyStyle } from './style';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch } from 'react-redux';
import { newProductUpdate } from '../../../../../redux/ordersReduser';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { debounce } from '@mui/material/utils';


const AutocompliteComponent=({data, disp,id, textContent, dafaultValue, value, label, showInput=true, free =true, onInputFunc,
                           sort=true, alignCenter=false, alignText=false, multiple=false, inWidth=6}  )=>{
  const dispatch = useDispatch()
const autocompliteInputStyle={
'& .MuiAutocomplete-input':{   
        fontSize: '13px',          
      },
      width: '100%',
      maxWidth: '250px',
}
const handleChange=(newInputValue)=>{
if (onInputFunc) {
   if (newInputValue !== dafaultValue) {
  onInputFunc(newInputValue)
  }
  
}
}
const filterOptions = createFilterOptions({
  stringify: (option) => option.name?option.name:option.data,
});

    return(
<Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center',  }} >
<Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: alignCenter?'space-between':'space-evenly'  }}} >
  <Grid xs={10} sm={3} sx={{maxWidth: '110px',maxHeight: '40px', '@media (min-width:599px)':{textAlign: alignText?'left':'right' }}} >
  <Typography sx={{fontSize: '14px'}}>{textContent}</Typography>
  </Grid>
  <Grid xs={6} sm={inWidth} sx={{maxWidth: '250px',maxHeight: '40px', width: '250px'}}>
{ showInput? <Autocomplete
            id={'status'}
            multiple = {multiple}
            disableClearable
            popupIcon={free?'':	<ArrowDropDownIcon/>}
            onChange={(e, newValue)=>disp(e, newValue)}
            value={value?value:null}          
            options={data}
            filterOptions={sort?filterOptions:(x)=>x}
            noOptionsText="Нічого не знайдено"
            onInputChange={(event, newInputValue) => {
              if(newInputValue){
                handleChange(newInputValue)
              }
              
            }}
            getOptionLabel={(option) => option.name?option.name:option.data}          
              sx={autocompliteInputStyle}
              renderOption={(props, option) => {
                return(
                  <li {...props} >
                    { option.name?option.name:option.data}
                  </li>
                )
              }}
              renderInput={(params) => <StyledTextField  sx={textFieldStyle} placeholder={label}   {...params} />}
          />:null}
</Grid>
</Grid>
</Box>
    )
}

export default AutocompliteComponent