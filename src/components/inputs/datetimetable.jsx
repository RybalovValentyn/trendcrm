import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Box from '@mui/material/Box';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { useState} from 'react';
import { StyledextField,} from './stylesInputs';
import { useDispatch, useSelector } from 'react-redux';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import Button from '@mui/material/Button';

export const DateTimeComponent =({ id, disp, textLabel, update, maxDate, minDate})=>{
    const [locale, setLocale] = useState('uk');
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const value = useSelector((state) => state.ordersAll.searchParams);
 const handleChangeSentFor =(newValue) =>{
        let str = newValue.format('YYYY-MM-DD T HH:mm:ss').toString().split('T')[0];
        setOpen(false)  
        dispatch(disp({id, str}))
        update()  
      }
 const ButtonReset =(props)=>{
        const { actions } = props;
        return(
      <Box sx={{width: '100%', textAlign: 'center', padding: '0px 10px 10px 10px'}}>
      <Button sx={{fontSize: '14px', textTransform: 'none', color: '#333333', width: '100%', "&:hover":{backgroundColor: '#e4dfdf'}}} 
      onClick={()=>handleButtonClick(actions)}
      variant="text">Очистити</Button>
      </Box>
        )}
 const handleButtonClick=(actions)=>{
            setOpen(false)
            dispatch(disp({id: actions, str: ''}))
            update()
            }

return (
  
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
    <Box sx={{position: 'relative'}}>
     <span style={{position: 'absolute', display: 'block',
      width: '80px', height: '100%', border: `${value[id]? '1px solid #212AFF' : '1px solid #d0d0d0' } ` , 
      top: '-1px', left: 10, borderRadius: '4px',  backgroundColor: `${value[id]? '#f0f0f0' : '#fff' } `,
      }}></span>
    <DesktopDatePicker
              id={id}
             open={open} 
             onClose={()=>setOpen(false)}
              // disableFuture  
               disableOpenPicker                     
              inputFormat="YYYY-MM-DD"
              value={value[id]?value[id]:null}
              label={`${value[id]? '' : textLabel } `}
              maxDate={maxDate}
              minDate={minDate}
              onChange={handleChangeSentFor}
              renderInput={(params) => <StyledextField color="success" onClick={()=>setOpen(true)} {...params} />}
              components={{
                 ActionBar: ButtonReset
              }}
              componentsProps={{
                actionBar:{ actions: id},
              }}
            />
    </Box >
    </LocalizationProvider>
)
}