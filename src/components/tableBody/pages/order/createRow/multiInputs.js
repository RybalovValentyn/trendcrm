import Box from '@mui/material/Box';

import { colorsRef } from '../../../../../consts/colorConstants';
import {getFormTable} from '../../../../../redux/ordersReduser';
import { useDispatch, useSelector,  } from 'react-redux';
import { MenuItem, Select, TextField} from '@mui/material';
import {FormControl, Autocomplete} from '@mui/material';
import { BasicDateTimePicker } from '../../../../inputs/datePicker';
import { BasicTimePicker } from '../../../../inputs/timePicker';
import { getSitysFromNp, getAdressFromNp } from '../.../../../../../../redux/asyncThunc';
import { DotMenu } from '../../../../inputs/dotMenu';
import {getSityNP, getAddressNP} from '../../../../../redux/novaPoshta';
import {BootstrapInput, autocompliteInputStyle,
   textFieldStyles, Label, inputStyle, boxStyle} from './styles';


export function MultiInput({label, name, func, val, type}) {
    const dispatch = useDispatch();
    const client = useSelector((state) => state.ordersAll.createRows);
    const dataForSelect = useSelector((state) => state.ordersAll[name]);
    const deliveryCity = useSelector((state) => state.ordersAll.sityNewPost);
    const deliveryAddress = useSelector((state) => state.ordersAll.adressNewPost);
    // const dataAutocomplite = useSelector((state) => state.ordersAll.sityFromNovaPoshta);
    const ordersAll = useSelector((state) => state.ordersAll);


    const getSitysNovaPoshta = ordersAll[name]?.flatMap(sity=> sity.Present)?.filter((sity, index, array) => array.indexOf(sity) === index);


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
  if (id === 'phone'){
    let str = '+38(0'
   return dispatch(getFormTable({id, str}));
  }
    let str = ''
  return  dispatch(getFormTable({id, str}))
  
}
const keyCodeInput = (e) =>{ 
  let id = e.target.id; 
  if (id === 'phone' && e.key === 'Backspace') {
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
        console.log(str);
      if (id === 'phone') {
        telNumberMask(e);
     }else if (id === 'backward_delivery_summ' || id === 'weight' || id ==='volume_general' || id === 'seats_amount' || id ==='backward_summ') {
          if (Number(str) ) {dispatch(getFormTable({id, str})) }
             
   }else if (type === 'select') {
    let ind = dataForSelect.indexOf(str)
        dispatch(getFormTable({id:name, ind})) 

  } else dispatch(getFormTable({id, str}))       
          
    }

let raadOnly = false
let corsor = () =>{
if (name === 'backward_delivery_summ' && (client['payment_type'] === 0 || client['payment_type'] === 1)) {
  raadOnly = true
  return 'not-allowed'
} 
}

const searchSityFromNP =(e) =>{
  switch (e.target.id) {
    case 'doors_city':
      dispatch(getSityNP(e.target.value))
      break;
      case 'doors_address':
      dispatch(getAddressNP(e.target.value))
      break;
    default:
      console.log(';sddddddd');
      break;
  }
};
const onChangeSitysNovaPoshta = (e) =>{
  let id = e.target.id.split('-')[0]
if (id ) {
  let ind = e.target.id.split('-')[2]
  let str = ordersAll[id][ind]
  console.log(id, ind, str);
    dispatch(getFormTable({id, str})) 
}
}

if (type === 'text' || type === 'num' || type === 'e-mail') {
     return (
    <Box sx={boxStyle} autoComplete="off" >
        {label && <Label htmlFor="named-select">
        {label}
        </Label>}
    <BootstrapInput
    autoComplete="off"
    sx={{cursor: corsor()}}
    readOnly={raadOnly}
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
        value ={dataForSelect[Number(client[name])]}      
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
      <BasicDateTimePicker name='datetime_sent' type='data'/>
      </Box>
      )
     } else if(type === 'time'){
      return(
        <Box sx={boxStyle} >
        {label && <Label htmlFor="named-select">
        {label}
        </Label>}
      <BasicTimePicker name='datetime_sent' type='time'/>
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
          )}else if (type === 'autocomplete')      
        {return(
            <Box sx={boxStyle} autoComplete="off" >
            {label && <Label htmlFor="named-select">
            {label}
            </Label>}
            <Autocomplete
                freeSolo  
                id={name}
                name={name}
                onChange={onChangeSitysNovaPoshta}
                options={getSitysNovaPoshta}                
                sx={autocompliteInputStyle}
                renderInput={(params) => <TextField onChange={searchSityFromNP} sx={textFieldStyles}  {...params}/>}
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
          {name === 'tnn' && <DotMenu/>}
          </Box>
        </Box>
         )};

  }

