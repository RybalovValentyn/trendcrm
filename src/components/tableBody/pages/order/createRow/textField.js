import Box from '@mui/material/Box';
import {styled } from '@mui/material/styles';
import { colorsRef } from '../../../../../consts/colorConstants';
import { useState } from 'react';
import {getFormTable} from '../../../../../redux/ordersReduser';
import { useDispatch, useSelector,  } from 'react-redux';
import { MenuItem, Select, ListItemText } from '@mui/material';
import { selectStylesCheck } from '../../../../inputs/stylesInputs';
import {OutlinedInput,FormControl} from '@mui/material';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const BootstrapInput = styled('input')(({ theme }) => 
    `border: 1px solid ${colorsRef.modalInputBorderColor};
    padding: 5px;
    border-radius: 8px;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    font-size: 12px;
    max-width: 250px;
    width: 100%;

    `
 );
  const Label = styled('label')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.85rem;
    display: block;
    font-weight: 400;
    color: ${colorsRef.labelTextColor};
    min-width: 180px;
    `,
  );
  const inputStyle ={
    '& .MuiInputBase-input': {
        maxHeight: '32px',
        lineHeight: 1.5,
      borderRadius: '8px',
      color: colorsRef.inputTextColor,
      position: 'relative',
      backgrounColor: '#fff',
      fontSize: 12,
      padding: '6px 32px 6px 12px',
      width:'100%',
      maxWidth: '250px', 
      outline: 'none',
     },
  }
const boxStyle={
    '& > :not(style)': 
    { margin:' 0 0 5px',  },
     width: '100%',
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
     
}
const handleDateTameInput =(newValue)=>{
  console.log(newValue);
  }
// const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

// const handleChange = (newValue) => {
//   setValue(newValue);
// };


export function MultiInput({label, name, func, val, type}) {
  // console.log(label, name, func, val, type);
    const dispatch = useDispatch();
    const client = useSelector((state) => state.ordersAll.createRows);
    const dataForSelect = useSelector((state) => state.ordersAll[name]);


    const inputSwicher=(e)=>{
         console.log(e.target.name);
        let id = e.target.id;
        let str = e.target.value
        let name = e.target.name
        if (id === 'client_phone' || id === 'backward_delivery_summ') {
            if (Number(e.target.value)) {
            return dispatch(getFormTable({id, str}))
            }
     } else if (e.target.name === 'delivery_type' || e.target.name === 'payment_type') {
      dispatch(getFormTable({id:name, str})) 
     }
     
     else return dispatch(getFormTable({id, str}))       
          
    }

if (type === 'text' || type === 'num' || type === 'e-mail') {
     return (
    <Box sx={boxStyle} autoComplete="off" >
        {label && <Label htmlFor="named-select">
        {label}
        </Label>}
    <BootstrapInput
    type={type}
    value={client[name]}
    id={name}
    onChange={inputSwicher}
    variant="outlined" />
 </Box>
  );
     } else if (type === 'textarea'){ return(
          <Box sx={boxStyle} autoComplete="off" >
            {label && <Label htmlFor="named-select">
            {label}
            </Label>}
        <textarea
        style={{maxWidth: '250px',
         border: `1px solid ${colorsRef.modalInputBorderColor}`,
        borderRadius: '8px',
        width: '100%',
        resize: 'vertical',
        outline: 'none',
       height: '100px'

        }}
        type={type}
        value={client[name]}
        id={name}
        onChange={inputSwicher}
         ></textarea>
     </Box>

     )} else if (type === 'select') {return(
        <Box sx={boxStyle} autoComplete="off" >
        {label && <Label htmlFor="named-select">
        {label}
        </Label>}

        <FormControl sx={{ m: 1, width: '100%', maxWidth: '250px' }} size="small">
        <Select
        onChange={inputSwicher}
       name={name}
        type={type}
        id="multiple-checkbox"
        value={client[name]}        
         sx={inputStyle}
      >
        {dataForSelect.map((nam, ind) => (
         <MenuItem sx={{fontSize: '12px' }}  id={name} key ={ind} value={nam}>
         {nam}
          </MenuItem>
         ))}

      </Select>
      </FormControl>

      </Box>

     )} else if(type === 'data'){
      return(
<LocalizationProvider dateAdapter={AdapterDayjs}>
  <DatePicker
    label="Custom input"
    value={client[name]}  
    // onChange={(newValue) => {
    //   setValue(newValue);
    // }}
    onChange={handleDateTameInput}
    renderInput={({ inputRef, inputProps, InputProps }) => (
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <input ref={inputRef} {...inputProps} />
        {InputProps?.endAdornment}
      </Box>
    )}
  />
</LocalizationProvider>
      )
     }
}


