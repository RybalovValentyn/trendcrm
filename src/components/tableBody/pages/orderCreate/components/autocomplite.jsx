import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import Autocomplete from '@mui/material/Autocomplete';
import { StyledTextField, textFieldStyle, typoGrafyStyle } from './style';
import Grid from '@mui/material/Unstable_Grid2';

const AutocompliteComponent=({data, disp, textContent, dafaultValue, value, label, showInput=true, free =true}  )=>{
const autocompliteInputStyle={
'& .MuiAutocomplete-input':{   
        fontSize: '13px',          
      },
      width: '100%',
      maxWidth: '250px',
}



    return(
<Box sx={{ flexGrow: 1, width: '100%', justifyContent: 'center',  }} >
<Grid container spacing={0} rowSpacing={0} sx={{'@media (min-width:599px)': {alignItems: 'center', justifyContent: 'space-evenly'  }}} >
  <Grid xs={10} sm={3} sx={{maxWidth: '110px',maxHeight: '40px', '@media (min-width:599px)':{textAlign: 'right'  }}} >
  <Typography sx={{typoGrafyStyle}}>{textContent}</Typography>
  </Grid>
  <Grid xs={6} sm={6} sx={{maxWidth: '250px',maxHeight: '40px', width: '250px'}}>
{ showInput? <Autocomplete
            id={'status'}
            disableClearable
            freeSolo ={free}
            onChange={(e, newValue)=>disp(e, newValue)}
            value={value?value:null}
            defaultValue={dafaultValue?dafaultValue:null}                
            options={data}
            getOptionLabel={(option) => option.name}          
              sx={autocompliteInputStyle}
              renderOption={(props, option) => {
                return(
                  <li {...props} >
                    {option.id === '0'? option.name:null}
                    {option.id !== '0'?option.name:null}
                  </li>
                )
              }}
              renderInput={(params) => <StyledTextField sx={textFieldStyle} placeholder={label}   {...params} />}
          />:null}
</Grid>
</Grid>
</Box>
    )
}

export default AutocompliteComponent