import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import { colorsRef } from '../../../../../consts/colorConstants';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState } from 'react';
import { StyledextField, selectStylesCheck } from './input';
import { useDispatch, useSelector } from 'react-redux';
import {getSortDate} from '../../../../../redux/ordersReduser';
import { getAllOrders } from '../../../../../redux/asyncThunc';
import { StyledInput } from './input';
import { OutlinedInput, InputBase } from '@mui/material';
import { listStyle } from './style';

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
    const groups = useSelector((state)=> state.addStatus.groups);
    const packerName = useSelector((state)=> state.ordersAll.packer_name);
    const paymentType =  useSelector((state)=> state.ordersAll.payment_name);

    const [openFor, setOpenFor] = useState(false);
    const [openTo, setOpenTo] = useState(false);
    const [openUpdateFor, setOpenUdateFor] = useState(false);
    const [openUpdateTo, setOpenUdateTo] = useState(false);
    const [openSentFor, setOpenSentFor] = useState(false);
    const [openSentTo, setOpenSentTo] = useState(false);
    const [status, setStatus] = useState('');
    const [group, setGroup] = useState('');
    const [packer, setPacker] = useState('');
    const [payType, setPaytype] = useState('');


// console.log(statuses[0].name);

const handleChangeFor = (newValue) => {  
        let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString().split('T')[0];
        let id ='create_date_from'
        dispatch(getSortDate({id, str}))  
        dispatch(getAllOrders())    
      setOpenFor(false)
    };    

const handleChangeTo=(newValue)=>{
    let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString().split('T')[0];
    let id = 'create_date_to'
    dispatch(getSortDate({id, str}))   
    dispatch(getAllOrders())  
    setOpenTo(false)
}

const handleChangeUpdateFor=(newValue)=>{
  let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString().split('T')[0];
  let id ='update_date_from'
  setOpenUdateFor(false)
  dispatch(getSortDate({id, str}))  
 
  dispatch(getAllOrders())    
  
}

const handleChangeUpdateTo =(newValue)=>{
  let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString().split('T')[0];
  let id ='update_date_to'
  setOpenUdateTo(false)  
  dispatch(getSortDate({id, str}))
  dispatch(getAllOrders())    
  
}
const handleChangeSentFor =(newValue) =>{
  let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString().split('T')[0];
  let id ='datetime_sent_from'
  setOpenSentFor(false)  
  dispatch(getSortDate({id, str}))
  dispatch(getAllOrders())  
}
const handleChangeSentTo =(newValue) =>{
  let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString().split('T')[0];
  let id ='datetime_sent_to'
  setOpenSentTo(false)  
  dispatch(getSortDate({id, str}))
  dispatch(getAllOrders())  
}

const handleInputchange =(e)=>{
  let id = e.target.id
  let str = e.target.value.trim()
  if ((Number(str) && id === 'id') || (Number(str) && id === 'client_phone') || 
      (Number(str) && id === 'storage_income_price_sum') || (Number(str) && id === 'ttn_cost')
      
      ) {
    dispatch(getSortDate({id, str}))
  }else if (id !== 'id' && id !== 'client_phone' && id  !== 'storage_income_price_sum' &&
            id !== 'ttn_cost') {
    dispatch(getSortDate({id, str}))
  } 
};

const keyCodeInput = (e) =>{ 
  let id = e.target.id
if (e.key === 'Enter') {   
  dispatch(getAllOrders())  
  }else if (e.key === 'Backspace') {
    let str = ''
    dispatch(getSortDate({id, str}))
  }
};

const handleSelectChange = (e) => {
  let id = e.target.name
  // console.log(e.target.value);
  let str = ''
  const { target: { value },} = e;
  if (id === 'status_name') {
      setStatus(typeof value === 'string' ? value.split(',') : value,
   );
   str = statuses.find(str=>str.name === e.target.value)?.id   
  }else if (id === 'group_name' ) {
  setGroup(typeof value === 'string' ? value.split(',') : value,)
  str = groups.find(str=>str.name === e.target.value)?.id
  }else if (id === 'packer_name' ) {
    setPacker(typeof value === 'string' ? value.split(',') : value,)
    str = packerName.find(str=>str.name === e.target.value)?.id
    }else if (id === 'payment_name' ) {
      setPaytype(typeof value === 'string' ? value.split(',') : '0',);
      let type = paymentType.find(str=>str.name === e.target.value)?.id
      str= type?.id+`,${type?.prepay_status}`
    }
if (str === 0 || str === undefined || e.target.value === '') {
  str = ''
}
  dispatch(getSortDate({id, str}))
  dispatch(getAllOrders())
};


if (name === 'payment_name') {
  return (
    <Select 
    id="packer_name"
    name = {name}
    value={payType}
    onChange={handleSelectChange}
    input={<InputBase  sx={selectStylesCheck}/>}
    MenuProps={MenuProps}
    displayEmpty
  >
      <MenuItem  value='' sx={listStyle}>      
      {'Всі'}
      </MenuItem>
    {paymentType.map((name, ind) => (
      <MenuItem  key={ind} value={name.name} sx={listStyle}>      
        {name.name}
      </MenuItem>
    ))}
  </Select>
  )
}else if (name === 'packer_name') {
  return (
    <Select 
    id="packer_name"
    name = {name}
    value={packer}
    onChange={handleSelectChange}
    input={<InputBase  sx={selectStylesCheck}/>}
    displayEmpty
    MenuProps={MenuProps}
  >
      <MenuItem  value='' sx={listStyle}>      
      {'Всі'}
      </MenuItem>
    {packerName.map((name, ind) => (
      <MenuItem  key={ind} value={name.name} sx={listStyle} >      
        {name.name}
      </MenuItem>
    ))}
  </Select>
  )
}else if (name === 'group_name') {
  return (
    <Select 
    id="group_name"
    name = {name}
    value={group}
    onChange={handleSelectChange}
    input={<InputBase  sx={selectStylesCheck}/>}
    MenuProps={MenuProps}
    displayEmpty
  >
      <MenuItem  value='' sx={listStyle} >      
        {'Всі'}
      </MenuItem>
    {groups.map((name) => (
      <MenuItem  key={name.id} value={name.name} sx={listStyle} >      
      {name.name}
      </MenuItem>
    ))}
  </Select>
  )
}else if (name === 'status_name') {
  return (
    <Select 
    id="status_name"
    name = {name}
    value={status}
    onChange={handleSelectChange}
    input={<InputBase  sx={selectStylesCheck}/>}
    displayEmpty
    MenuProps={MenuProps}

  >
      <MenuItem  value='' sx={listStyle}>      
      {'Всі'}
      </MenuItem>
    {statuses.map((name) => (
      <MenuItem  key={name.id} value={name.name} sx={listStyle} >      
      {status[0]!==name.name && <span style ={{display: 'block', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: name.style, marginRight: '10px'}}></span>}
        {name.name} 
      </MenuItem>
    ))}
  </Select>
  )
}
 if (name === 'datetime_sent') {
  return (
      <Box component="form" key={name} sx={{width: '100%', maxWidth: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <LocalizationProvider   dateAdapter={AdapterDayjs}>
      <Box sx={{position: 'relative'}}>
       <span style={{position: 'absolute', display: 'block',
        width: '80px', height: '100%', border: `${value.datetime_sent_from? '1px solid #212AFF' : '1px solid #d0d0d0' } ` , 
        top: '-1px', left: 10, borderRadius: '4px',  backgroundColor: `${value.datetime_sent_from? '#f0f0f0' : '#fff' } `,
        }}></span>
      <DesktopDatePicker
                open={openSentFor}                                                
                inputFormat="MM-DD-YYYY"
                value={value.datetime_sent_from}
                label={`${value.datetime_sent_from? '' : 'з' } `}
                maxDate={value.datetime_sent_to}
                 onChange={handleChangeSentFor}
                renderInput={(params) => <StyledextField color="success" onClick={()=>setOpenSentFor(true)} {...params} />}
              />
      </Box >
      <span>-</span>
      <Box sx={{position: 'relative'}}>
      <span style={{position: 'absolute', display: 'block',
        width: '80px', height: '100%', border: `${value.datetime_sent_to? '1px solid #212AFF' : '1px solid #d0d0d0' } ` , 
        top: '-1px', left: 10, borderRadius: '4px', backgroundColor: `${value.datetime_sent_to? '#f0f0f0' : '#fff' } `}}></span>
      <DesktopDatePicker
              open={openSentTo}
              label={`${value.datetime_sent_to? '' : 'по' } `}
                inputFormat="MM-DD-YYYY"
                value={value.datetime_sent_to}
                minDate={value.datetime_sent_from}
                onChange={handleChangeSentTo}
                renderInput={(params) => <StyledextField   onClick={()=>setOpenSentTo(true)} {...params} />}
              />
      </Box>
      </LocalizationProvider>

      </Box>
  )
} else if (name === 'update_at') {
  return (
      <Box component="form" key={name} sx={{width: '100%', maxWidth: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <LocalizationProvider   dateAdapter={AdapterDayjs}>
      <Box sx={{position: 'relative'}}>
       <span style={{position: 'absolute', display: 'block',
        width: '80px', height: '100%', border: `${value.update_date_from? '1px solid #212AFF' : '1px solid #d0d0d0' } ` , 
        top: '-1px', left: 10, borderRadius: '4px',  backgroundColor: `${value.update_date_from? '#f0f0f0' : '#fff' } `,
        }}></span>
      <DesktopDatePicker
                open={openUpdateFor}                                                
                inputFormat="MM-DD-YYYY"
                value={value.update_date_from}
                label={`${value.update_date_from? '' : 'з' } `}
                maxDate={value.update_date_to}
                 onChange={handleChangeUpdateFor}
                renderInput={(params) => <StyledextField color="success" onClick={()=>setOpenUdateFor(true)} {...params} />}
              />
      </Box >
      <span>-</span>
      <Box sx={{position: 'relative'}}>
      <span style={{position: 'absolute', display: 'block',
        width: '80px', height: '100%', border: `${value.update_date_to? '1px solid #212AFF' : '1px solid #d0d0d0' } ` , 
        top: '-1px', left: 10, borderRadius: '4px', backgroundColor: `${value.update_date_to? '#f0f0f0' : '#fff' } `}}></span>
      <DesktopDatePicker
              open={openUpdateTo}
              label={`${value.update_date_to? '' : 'по' } `}
                inputFormat="MM-DD-YYYY"
                value={value.update_date_to}
                minDate={value.update_date_from}
                onChange={handleChangeUpdateTo}
                renderInput={(params) => <StyledextField   onClick={()=>setOpenUdateTo(true)} {...params} />}
              />
      </Box>
      </LocalizationProvider>

      </Box>
  )
} else if (name === 'datetime') {
    return (
        <Box component="form" key={name} sx={{width: '100%', maxWidth: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <LocalizationProvider   dateAdapter={AdapterDayjs}>
        <Box sx={{position: 'relative'}}>
         <span style={{position: 'absolute', display: 'block',
          width: '80px', height: '100%', border: `${value.create_date_from? '1px solid #212AFF' : '1px solid #d0d0d0' } ` , 
          top: '-1px', left: 10, borderRadius: '4px',  backgroundColor: `${value.create_date_from? '#f0f0f0' : '#fff' } `,
          }}></span>
        <DesktopDatePicker
                  open={openFor}                                  
                  inputFormat="MM-DD-YYYY"
                  value={value.create_date_from}
                  label={`${value.create_date_from? '' : 'з' } `}
                  maxDate={value.create_date_to}
                   onChange={handleChangeFor}
                  renderInput={(params) => <StyledextField color="success" onClick={()=>setOpenFor(true)} {...params} />}
                />
        </Box >
        <span>-</span>
        <Box sx={{position: 'relative'}}>
        <span style={{position: 'absolute', display: 'block',
          width: '80px', height: '100%', border: `${value.create_date_to? '1px solid #212AFF' : '1px solid #d0d0d0' } ` , 
          top: '-1px', left: 10, borderRadius: '4px', backgroundColor: `${value.create_date_to? '#f0f0f0' : '#fff' } `}}></span>
        <DesktopDatePicker
                open={openTo}
                label={`${value.create_date_from? '' : 'по' } `}
                  inputFormat="MM-DD-YYYY"
                  value={value.create_date_to}
                  minDate={value.create_date_from}
                  onChange={handleChangeTo}
                  renderInput={(params) => <StyledextField   onClick={()=>setOpenTo(true)} {...params} />}
                />
        </Box>
        </LocalizationProvider>

        </Box>
    )
  } else return (
      < StyledInput autoComplete='off' id={name} value={value[name]} onChange={handleInputchange}  onKeyDown={keyCodeInput}/>
    )
}


export default  InputSelector

