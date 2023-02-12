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
                           sort=true, alignCenter=false, alignText=false, multiple=false, inWidth=6 , readOnly=false, onInputfocus, 
                           render = 'name', index, disabled, textWidth=3, textMaxWidth='110px'}  )=>{
  const dispatch = useDispatch()
 const renderOptionError =  {id:'render_option_error', name: 'no name'}
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
  stringify: (option) => option[render]?option[render]:option.data,
});

    return(
<Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center',  }} >
<Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: alignCenter?'space-between':'space-evenly'  }}} >
  <Grid xs={10} sm={textWidth} sx={{maxWidth: textMaxWidth,maxHeight: '40px', '@media (min-width:599px)':{textAlign: alignText?'left':'right' }}} >
  <Typography sx={{fontSize: '14px'}}>{textContent}</Typography>
  </Grid>
  <Grid xs={6} sm={inWidth} sx={{maxWidth: '250px',maxHeight: '40px', width: '250px'}}>
{ showInput? <Autocomplete
            id={'status'}
            readOnly={readOnly}
            multiple = {multiple}
            disableClearable
            popupIcon={free?'':	<ArrowDropDownIcon/>}
            onChange={(e, newValue)=>disp(e, newValue, textContent, index)}
            value={value?value:null}          
            options={data}
            filterOptions={sort?filterOptions:(x)=>x}
            noOptionsText="Нічого не знайдено"
            onInputChange={(event, newInputValue) => {
              if(newInputValue){
                handleChange(newInputValue)
              }
              
            }}
            getOptionDisabled={(option, index) =>(
              disabled?.includes(String(option?.id))
            )
              
            }
    
            getOptionLabel={(option) => {
              if (option[render] === '') {
                console.log(option);
                return renderOptionError.name
              } else  return (option[render] ?option[render]:option.data)}
            }     
              sx={autocompliteInputStyle}
              renderOption={(props, option) => {
                
                return(
                  <li {...props} >
                    { option[render]?option[render]:option.data}
                  </li>
                )
              }}
              renderInput={(params) => <StyledTextField onFocus={onInputfocus} sx={textFieldStyle} placeholder={label}   {...params} />}
          />:null}
</Grid>
</Grid>
</Box>
    )
}

export default AutocompliteComponent