import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector  } from 'react-redux';
import {getFormTable} from '../../redux/ordersReduser';
import { ValidationTextField } from './stylesInputs';
import { useState } from 'react';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';

export  function BasicTimePicker({label, name, func, val, type}) {
    const dispatch = useDispatch();
    const client = useSelector((state) => state.ordersAll.createRows);
    const [locale, setLocale] = useState('uk');

  const timeChange =(newValue) =>{
let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString();
dispatch(getFormTable({id: name, str }))
  }

 const onTimeUpdate = () =>{
let str = dayjs().format('YYYY-MM-DD T HH:mm:ss');
    dispatch(getFormTable({id: name, str }))
};


  return (
    <Box sx={{width: '100%', maxWidth: '250px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
    <TimePicker
          value={client[name]}
          onChange={timeChange}
          inputFormat="HH-mm-ss"
          renderInput={(params) => <ValidationTextField align='left' {...params} />}
        />
    </LocalizationProvider>
    <AddIcon onClick={onTimeUpdate} sx={{border: '1px solid', marginRight: '3px', borderRadius: '50%', marginLeft: '3px'}} fontSize='small' />
    </Box>
  );
}

