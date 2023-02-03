import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import Autocomplete, { createFilterOptions }  from '@mui/material/Autocomplete';
import { StyledTextField, textFieldStyleMulti } from './style';
import Grid from '@mui/material/Unstable_Grid2';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Checkbox from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import Chip from '@mui/material/Chip';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const MultipleAutocompliteComponent=({data, disp,id, textContent, dafaultValue, value, label, showInput=true, free =true, onInputFunc,
                           sort=true, alignCenter=false, alignText=false,  buttonId, inputWidth=7} )=>{

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
  <Grid xs={6} sm={inputWidth} sx={{maxWidth: '250px',maxHeight: '40px', width: '250px'}}>
{ showInput? <Autocomplete
            id={'status'}
            multiple
            limitTags={1}
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
            disableCloseOnSelect
            getOptionLabel={(option) => option?.name?option.name:option?.data}          
              sx={autocompliteInputStyle}
              renderOption={(props, option) => {
                return(
                  <li {...props} style={{backgroundColor: option.id === buttonId?'#f5e4f7':null, paddingRight: '10px',
                          fontSize: '14px', padding: option.id === buttonId?'10px':0, }}>
                {option.id !== buttonId && <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={value.indexOf(option) !== -1}
           
                  />}
                    <span style ={{padding: '10px', textOverflow: 'ellipsis', overflowWrap:'anywhere'}}>{ option.name?option.name:option.data}</span>
                  </li>
                )
              }}
              renderInput={(params) => <StyledTextField  sx={textFieldStyleMulti} placeholder={value.length > 0? '':label}   {...params} />}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                  sx={{  backgroundColor: '#efd5d5de',}}
                    variant="outlined"
                    label={value.length === 1?option.name:`${value.length}-шт вибрано`}
                    size="small"
                    {...getTagProps({ index })}
                  />
                ))
              }
          />:null}
</Grid>
</Grid>
</Box>
    )
}

export default MultipleAutocompliteComponent