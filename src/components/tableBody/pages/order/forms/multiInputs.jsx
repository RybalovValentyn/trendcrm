import Box from '@mui/material/Box';
import {SearchInputSity} from '../../../../inputs/asyncInput';
import { colorsRef } from '../../../../../consts/colorConstants';
import {getFormTable} from '../../../../../redux/ordersReduser';
import { useDispatch, useSelector,  } from 'react-redux';
import { MenuItem, Select, TextField} from '@mui/material';
import {FormControl, Autocomplete} from '@mui/material';
import { BasicDateTimePicker } from '../../../../inputs/datePicker';
import { BasicTimePicker } from '../../../../inputs/timePicker';
import { getSitysFromNp, getAdressFromNp } from '../../../../../redux/asyncThunc';
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
    const sityValue = useSelector((state) => state.ordersAll.createRows.warehouse_city);    
    const adressValue = useSelector((state) => state.ordersAll.createRows.warehouse_address); 
    const paymentType = useSelector((state)=> state.ordersAll.payment_name);
    const ordersAll = useSelector((state) => state.ordersAll);

    const getSitysNovaPoshta = ordersAll[name]?.flatMap(sity=> sity.Present)?.filter((sity, index, array) => array.indexOf(sity) === index);


const getSitys =(e) =>{  
    if (e.target.id === 'warehouse_city' && deliveryCity.length === 0) {
      console.log(deliveryCity.length);
      dispatch(getSitysFromNp())
    }   
    }

  const setSytyDelivery =(e) =>{  
    console.log(sityValue);  
    let id = 'warehouse_city'
    let ind = e.target.id.split('-')[2]
    let str = deliveryCity[ind]
      dispatch(getFormTable({id, str})) 
      dispatch(getAdressFromNp())  
  }

const setStreetDelivery=(e)=>{
  let id = 'warehouse_address'
  let ind = e.target.id.split('-')[2]
  let str = deliveryAddress[ind]
    dispatch(getFormTable({id, str}))
   
}
  


const inputFocus =(e)=>{
  let id = e.target.id;
  if (id === 'client_phone'){
    let str = '+38(0'
   return dispatch(getFormTable({id, str}));
  }

    // let str = ''
  // return  dispatch(getFormTable({id, str}))
  
}
const keyCodeInput = (e) =>{ 
  let id = e.target.id; 
 if (e.key === 'Backspace') {
    let str = ''
    dispatch(getFormTable({id, str}))
  }
}

    const inputSwicher=(e)=>{
        let id = e.target.id;
        let str = e.target.value
        let name = e.target.name
        // console.log(str);
 if (id === 'backward_delivery_summ' || id === 'weight' || id ==='volume_general' || id === 'seats_amount' || id ==='backward_summ') {
          if (Number(str)) {
            console.log(str);
           return dispatch(getFormTable({id, str})) 
        }
             
   }else if (type === 'select' && name !== 'payment_name') {
    let ind = dataForSelect.find(str=>str.name === e.target.value)
        dispatch(getFormTable({id:name, str: ind.id})) 

  } else if (type === 'select' && name === 'payment_name') {
    let type = paymentType.find(str=>str.name === e.target.value)
    console.log(type);
       dispatch(getFormTable({id:name, str: type.id}))
                               
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
// console.log(sityValue);
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
        {label && <Label htmlFor={name}>
        {label}
        </Label>}
        <FormControl sx={{ m: 1, width: '100%', maxWidth: '250px',}} size="small">
       <Select
        onChange={inputSwicher}
       name={name}
        type={type}
        id="multiple-checkbox"
        value ={dataForSelect.find(n=>n.id===String(client[name]))?.name}      
         sx={inputStyle}
      >
        {dataForSelect.map((nam, ind) => (
         <MenuItem sx={{fontSize: '12px' }}  id={name} key ={ind} value={nam.name}>
         {nam.name}
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
          {label && <Label htmlFor="warehouse_city">
          {label}
          </Label>}

          {/* <SearchInputSity/> */}
          <Autocomplete
              freeSolo  
              id={name}
              name={name}
              value = {sityValue?sityValue:null}
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
            {label && <Label htmlFor="warehouse_address">
            {label}
            </Label>}
            <Autocomplete
                freeSolo  
                id={name}
                name={name}
                value = {adressValue?adressValue:null}
                options={deliveryAddress}
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

