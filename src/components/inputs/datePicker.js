import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector  } from 'react-redux';
import {getFormTable} from '../../redux/ordersReduser';
import { ValidationTextField } from './stylesInputs';
import { useState } from 'react';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';


export  function BasicDateTimePicker({label, name, func, val, type}) {
    const dispatch = useDispatch();
    const client = useSelector((state) => state.ordersAll.createRows);
    let initDate = dayjs().format('YYYY-MM-DD T HH:mm:ss');
    const [locale, setLocale] = useState('uk');

  const daateChange =(newValue) =>{
let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString();
dispatch(getFormTable({id: name, str }))
  }

 const onDataUpdate = () =>{
  let str = initDate
    dispatch(getFormTable({id: name, str }))
}


  return (
    <Box sx={{width: '100%', maxWidth: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
      <DatePicker
      id={name}
      inputFormat="YYYY-MM-DD"
       value={client[name]}
        onChange={daateChange}
        renderInput={(params) => <ValidationTextField  align='left' {...params} />}
        />
    </LocalizationProvider>
    <AddIcon onClick={onDataUpdate} sx={{border: '1px solid', marginRight: '3px', borderRadius: '50%', marginLeft: '3px'}} fontSize='small' />
    </Box>
  );
}

