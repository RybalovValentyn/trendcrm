import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { useState} from 'react';
import {  selectStylesCheck } from './input';
import { useDispatch, useSelector } from 'react-redux';
import {getSortDate} from '../../../../../redux/ordersReduser';
import { getAllOrders, getFilteredOrders } from '../../../../../redux/asyncThunc';
import { StyledInput } from './input';
import { InputBase } from '@mui/material';
import { listStyle } from './style';
import { DateTimeComponent } from '../../../../inputs/datetimetable';
import { SelectTable } from '../../../../inputs/selecttableheader';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 200,
      overflowX: 'hidden',
    },
  },
};

const  InputSelector =({name}) => {

    const dispatch = useDispatch();
    const value = useSelector((state) => state.ordersAll.searchParams);
    const statuses = useSelector((state)=> state.ordersAll.getStatuses);
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const ordersAll = useSelector((state)=> state.ordersAll);

    let initValue = ''
    if (name === 'status_name') {
         initValue =statuses?.find(n=>n.id === value.status_name)?.name?statuses?.find(n=>n.id === value.status_name)?.name:''
  }
const handleInputchange =(e)=>{
  let id = e.target.id
  let str = e.target.value.trim()
  if (id === 'id' || id === 'client_phone' || id === 'storage_income_price_sum' ||  id === 'ttn_cost' ||
       id === 'total') {
        let n = e.target.value.replace(/[^0-9.]/g, '');
        dispatch(getSortDate({id, str: n}));
    return
  }else if (id !== 'id' && id !== 'client_phone' && id  !== 'storage_income_price_sum' &&
     id !== 'ttn_cost' && id !== 'total' && id !== 'client_num_ph') {
     dispatch(getSortDate({id, str}));
    return
  } else if (id === 'client_num_ph') {
    let s =  e.target.value.replace(/[^0-9.]/g, '');
    dispatch(getSortDate({id: 'client_phone', str: s}));
  }
};

const keyCodeInput = (e) =>{ 
  let id = e.target.id
if (e.key === 'Enter' && value[id] !== '') {   
  getUpdate()
  }
};

const getUpdate = ()=>{
  sessionStorage.setItem("selected", '');
  // console.log(filteredRows?.length);
  if (filteredRows?.length > 0) {
    console.log(filteredRows?.length);
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
}
const handleSelecthandleChange = (e, id) => {
  let str = ''
  if (e.target.value === 0 || e.target.value === undefined || e.target.value === '') {
    if (id === 'payment_type' ) {
      dispatch(getSortDate({id: 'payment_name', str}))
      return  getUpdate()
    }
    dispatch(getSortDate({id, str}))
    return  getUpdate()
  }else if (e.target.value && e.target.value !== '') {
      if (id === 'payment_type' ) {
            let type = ordersAll[id]?.find(str=>str.name === e.target.value)
            if (type?.prepay_status === '') {
              str = type?.id
            } else 
          str= type?.id+`,${type?.prepay_status}`
       dispatch(getSortDate({id: 'payment_name', str}))
       return getUpdate()
        }else if (id === 'status_name') {
          str = statuses.find(str=>str.name === e.target.value)?.id
          dispatch(getSortDate({id, str}))
          return getUpdate()
        }        
  str = ordersAll[id]?.find(str=>str.name === e.target.value)?.id
  dispatch(getSortDate({id, str}))
  } 
  getUpdate()
};


const handleBlurAction=(e)=>{
  let id = e.target.id
  if (value[id] !== '' && value[id]) {   
    getUpdate()
    }  else if (id === 'client_num_ph' && value.client_phone !== '' && value.client_phone) {
      getUpdate()
    }
}

if (name === 'payment_name') {
  return (
    <SelectTable id={'payment_type'}  dataForSelect={false} InputStyle={selectStylesCheck} listStyle={listStyle} onChangeFunc={handleSelecthandleChange}/>
  )
}else if (name === 'packer_name') {
  return (
    <SelectTable id={'packer_name'}  dataForSelect={false} InputStyle={selectStylesCheck} listStyle={listStyle} onChangeFunc={handleSelecthandleChange}/>
  )
}else if (name === 'group_name') {
  return (
    <SelectTable id={'group_name'} dataForSelect={false} InputStyle={selectStylesCheck} listStyle={listStyle} onChangeFunc={handleSelecthandleChange}/>
  )
}else if (name === 'status_name') {
  return (
    <Select 
    id="status_name"
    name = {name}
    value={initValue}
    onChange={(e)=>handleSelecthandleChange(e, name)}
    input={<InputBase  sx={selectStylesCheck}/>}
    displayEmpty
    renderValue={(initValue)=>(<Box>{initValue !== ''?initValue:'Всі'}</Box>)}
    MenuProps={MenuProps}

  >
      <MenuItem  value='' sx={listStyle}>      
      {'Всі'}
      </MenuItem>
    {statuses.map((name) => (
      <MenuItem  key={name.id} value={name.name} sx={listStyle} >      
      <span style ={{display: 'block', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: name.style, marginRight: '10px'}}></span>
        {name.name} 
      </MenuItem>
    ))}
  </Select>
  )
}
 if (name === 'datetime_sent') {
  return (
      <Box component="form" key={name} sx={{width: '100%', maxWidth: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
     <DateTimeComponent  id='datetime_sent_from' disp={getSortDate} textLabel='з' update={getUpdate} maxDate={value.datetime_sent_to}/>
     <span>-</span>
     <DateTimeComponent  id='datetime_sent_to' disp={getSortDate} textLabel='по' update={getUpdate} minDate={value.datetime_sent_from}/>
      </Box>
  )
} else if (name === 'update_at') {
  return (
      <Box component="form" key={name} sx={{width: '100%', maxWidth: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
         <DateTimeComponent  id='update_date_from' disp={getSortDate} textLabel='з' update={getUpdate} maxDate={value.update_date_to}/>
     <span>-</span>
     <DateTimeComponent  id='update_date_to' disp={getSortDate} textLabel='по' update={getUpdate} minDate={value.update_date_from}/>   
        
      </Box>
  )
} else if (name === 'datetime') {
    return (
        <Box component="form" key={name} sx={{width: '100%', maxWidth: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
   <DateTimeComponent  id='create_date_from' disp={getSortDate} textLabel='з' update={getUpdate} maxDate={value.create_date_to}/>
     <span>-</span>
  <DateTimeComponent  id='create_date_to' disp={getSortDate} textLabel='по' update={getUpdate} minDate={value.create_date_from}/>   
       
       </Box>
    )
  }else if (name === 'client_phone') {
    return(
< StyledInput autoComplete='off' id={'client_num_ph'} value={value.client_phone} onBlur={handleBlurAction}  onChange={handleInputchange} onKeyDown={keyCodeInput} />
    )
    
  } else return (
      < StyledInput autoComplete='off' id={name} value={value[name]} onBlur={handleBlurAction}  onChange={handleInputchange} onKeyDown={keyCodeInput}/>
    )
}


export default  InputSelector

