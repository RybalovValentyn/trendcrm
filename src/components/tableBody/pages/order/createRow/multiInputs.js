import Box from '@mui/material/Box';
import {styled } from '@mui/material/styles';
import { colorsRef } from '../../../../../consts/colorConstants';
import {getFormTable} from '../../../../../redux/ordersReduser';
import { useDispatch, useSelector,  } from 'react-redux';
import { MenuItem, Select, TextField} from '@mui/material';
import {FormControl, Autocomplete} from '@mui/material';
import { BasicDateTimePicker } from '../../../../inputs/datePicker';
import { BasicTimePicker } from '../../../../inputs/timePicker';
import { getSitysFromNp, getAdressFromNp } from '../.../../../../../../redux/asyncThunc';
import { DotMenu } from '../../../../inputs/dotMenu';

const BootstrapInput = styled('input')(({ theme }) => 
    `border: 1px solid ${colorsRef.modalInputBorderColor};
    padding: 6px;
    border-radius: 4px;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    font-size: 12px;
    max-width: 250px;
    width: 100%;
    
    `
 );
 const autocompliteInputStyle={
  '& .MuiAutocomplete-input':{   
    fontSize: '12px'   
  },      
  width: '100%',
  maxWidth: '250px',

};
const textFieldStyles={
'& .MuiOutlinedInput-root':{
padding: 0,
borderRadius: '4px',
},
};
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
     color: colorsRef.inputTextColor,
      position: 'relative',
      backgrounColor: '#fff',
      fontSize: 12,
      padding: '7px 32px 7px 12px',
      width:'100%',
      maxWidth: '250px', 
      
      },

  }
const boxStyle={
    '& > :not(style)': 
    { margin:' 0 0 5px',  },
     width: '100%',
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
     
     
};

export function MultiInput({label, name, func, val, type}) {
    const dispatch = useDispatch();
    const client = useSelector((state) => state.ordersAll.createRows);
    const dataForSelect = useSelector((state) => state.ordersAll[name]);
    const deliveryCity = useSelector((state) => state.ordersAll.sityNewPost);
    const deliveryAddress = useSelector((state) => state.ordersAll.adressNewPost);


const getSitys =(e) =>{
    if (e.target.id === 'warehouse_city' && deliveryCity.length ===0) {
      dispatch(getSitysFromNp())
    }   
    }
const getStreets = (e) =>{
if (e.target.id === 'warehouse_address') {
    dispatch(getAdressFromNp())
  } 
}
  const setSytyDelivery =(e) =>{    
    let id = 'warehouse_city'
    let ind = e.target.id.split('-')[2]
    let str = deliveryCity[ind]
      dispatch(getFormTable({id, str}))   
  }

const setStreetDelivery=(e)=>{
  let id = 'warehouse_address'
  let ind = e.target.id.split('-')[2]
  let str = deliveryAddress[ind]
    dispatch(getFormTable({id, str}))
   
}
  
    const telNumberMask = (e)=>{      
      let id = e.target.id;
      let str = e.target.value.split('');
      let isNUmber = str.slice(-1);
        if (Number(isNUmber)) {
           if (str.length ===7) {
            str.push(')')
          } else if (str.length ===11) {
            str.push('-')
          } else if (str.length ===14) {
            str.push('-')
          }else if (str.length ===18) {
           return
          }
          let string = str.join('')
          dispatch(getFormTable({id, str: string}))
        }
    }


const inputFocus =(e)=>{
  let id = e.target.id;
  if (id === 'client_phone'){
    let str = '+38(0'
   return dispatch(getFormTable({id, str}));
  }
    let str = ''
  return  dispatch(getFormTable({id, str}))
  
}
const keyCodeInput = (e) =>{ 
  let id = e.target.id; 
  if (id === 'client_phone' && e.key === 'Backspace') {
    let str = '+38(0'
    dispatch(getFormTable({id, str}))
  } else if (e.key === 'Backspace') {
    let str = ''
    dispatch(getFormTable({id, str}))
  }
}

    const inputSwicher=(e)=>{
        let id = e.target.id;
        let str = e.target.value
        let name = e.target.name
      if (id === 'client_phone') {
        telNumberMask(e);
     }else if (id === 'backward_delivery_summ' || id === 'weight' || id ==='volume_general' || id === 'count_calls') {
        if (Number(str) ) {dispatch(getFormTable({id, str})) }
             
   }else if (name === 'delivery_type'|| name === 'payment_type' || name === 'delivery_type_id' ) {
        dispatch(getFormTable({id:name, str})) 

  }else if (name === 'delivery_payers' || name ==='delivery_payers_redelivery' ) {
      dispatch(getFormTable({id:name, str})) 
} else dispatch(getFormTable({id, str}))       
          
    }

if (type === 'text' || type === 'num' || type === 'e-mail') {
     return (
    <Box sx={boxStyle} autoComplete="off" >
        {label && <Label htmlFor="named-select">
        {label}
        </Label>}
    <BootstrapInput
    autoComplete="off"
    type={type}
    value={client[name]}
    id={name}
    onKeyDown={keyCodeInput}
    onFocus={inputFocus}      
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
        <FormControl sx={{ m: 1, width: '100%', maxWidth: '250px',}} size="small">
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
        <Box sx={boxStyle} >
        {label && <Label htmlFor="named-select">
        {label}
        </Label>}
      <BasicDateTimePicker name='datetime' type='data'/>
      </Box>
      )
     } else if(type === 'time'){
      return(
        <Box sx={boxStyle} >
        {label && <Label htmlFor="named-select">
        {label}
        </Label>}
      <BasicTimePicker name='datetime' type='time'/>
      </Box>
      )} else if (type === 'autocomplete' && name === 'warehouse_city')      
      {return(
          <Box sx={boxStyle} autoComplete="off" >
          {label && <Label htmlFor="named-select">
          {label}
          </Label>}
          <Autocomplete
              freeSolo  
              id={name}
              name={name}
              options={deliveryCity}
              onFocus={getSitys}
               onChange={setSytyDelivery}
              sx={autocompliteInputStyle}
              renderInput={(params) => <TextField sx={textFieldStyles}  {...params}/>}
            />
        </Box>
        )}else if (type === 'autocomplete' && name === 'warehouse_address')      
        {return(
            <Box sx={boxStyle} autoComplete="off" >
            {label && <Label htmlFor="named-select">
            {label}
            </Label>}
            <Autocomplete
                freeSolo  
                id={name}
                name={name}
                options={deliveryAddress}
                onFocus={getStreets}
                 onChange={setStreetDelivery}
                sx={autocompliteInputStyle}
                renderInput={(params) => <TextField sx={textFieldStyles}  {...params}/>}
              />
          </Box>
          )}else if (type === 'readOnly') {
            return (
           <Box sx={boxStyle} autoComplete="off" >
               {label && <Label htmlFor="named-select">
               {label}
               </Label>}
               <Box sx={{  width: '100%', maxWidth: '250px' ,display: 'flex',  justifyContent: 'start',alignItems: 'center',}}>
           <BootstrapInput
           autoComplete="off"
           type={type}
           value={client[name]}
           id={name}
           readOnly
           variant="outlined" />
          {name === 'ttn' && <DotMenu/>}
          </Box>
        </Box>
         )};

  }

