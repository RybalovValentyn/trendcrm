import Box from '@mui/material/Box';
import { Typography} from "@mui/material";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { colorsRef } from '../../../../../consts/colorConstants';

const AutocompliteComponent=({data, disp, textContent, dafaultValue, value, label} )=>{
const autocompliteInputStyle={
'& .MuiAutocomplete-input':{   
        fontSize: '13px', 
          
      },
width: '100%',
maxWidth: '250px',

}
const textFieldStyle={
'& .MuiOutlinedInput-root':{
        padding: 0,
        borderRadius: '8px',       
         backgroundColor: colorsRef.formBgColor,
        alignItems: 'center',
              
},
}

    return(
        <Box sx={{width: '100%', display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
        <Typography sx={{fontSize: '16px', margin: '10px 0' }}>{textContent}</Typography>
        <Autocomplete
            id={'status'}
            disableClearable
            freeSolo
            onChange={(e, newValue)=>disp(e, newValue)}
            value={value?value:null}
            defaultValue={dafaultValue?dafaultValue:null}                
            options={data}
            getOptionLabel={(option) => option.name}          
              sx={autocompliteInputStyle}
              renderInput={(params) => <TextField sx={textFieldStyle} placeholder={label}   {...params} />}
          />
        </Box>
    )
}

export default AutocompliteComponent