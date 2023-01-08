import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector,  } from 'react-redux';
import { forwardRef } from 'react';
import { getOpenTableCreate} from '../../../../redux/ordersReduser';
import { StyledButton } from '../../../buttons/buttons'; 
import { colorsRef } from '../../../../consts/colorConstants';
import {Box,Typography,IconButton} from '@mui/material';
import { useState } from 'react';
import { setOrderStatusUpdate,getFilteredOrders, getAllOrders } from '../../../../redux/asyncThunc';
import 'dayjs/locale/ru';
import 'dayjs/locale/uk';
import { ValidationTextField } from '../../../inputs/stylesInputs';


const Transition = forwardRef(function Transition(props, ref) {       
    return <Slide direction="down" ref={ref} {...props} />;
  });



const DateSendUpdate = () =>{
    const dispatch = useDispatch();
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
    const opensDateSendUpdate = useSelector((state) => state.ordersAll.modalControl.date_send_update);
    let selected =  sessionStorage.getItem("selected")?.split(',');
    let initDate = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const [locale, setLocale] = useState('uk');
    const [newDate, setNewDate] = useState(initDate)

const handleClouse =(e)=>{   
  dispatch(getOpenTableCreate({id: 'date_send_update', str: false}));
}

const handleSubmit=()=>{
    dispatch(getOpenTableCreate({id: 'date_send_update', str: false}));
    if (Number(selected[0]) && selected.length === 1) {
        dispatch(setOrderStatusUpdate({id: selected[0], sent: newDate}))
        getUpdate() 
        } else if(selected.length > 1){
            selected.map((n,ind,arr)=>{
                if (Number(n)) {
                    dispatch(setOrderStatusUpdate({id: String(n), sent: newDate}))
                    if (Number(ind) === Number(arr.length -1)) {
                        console.log(ind,Number(arr.length -1), 'end');
                        getUpdate()  
                    }
                }
            })
        }  
           
};

const daateChange =(newValue) =>{
    let str = newValue.format('YYYY-MM-DD HH:mm:ss').toString();
    setNewDate(str)
      }
    

const getUpdate = ()=>{
    if (filteredRows?.length > 0) {
      dispatch(getFilteredOrders())
    } else dispatch(getAllOrders())
  }

    return(
        <Dialog
        open={opensDateSendUpdate}
        TransitionComponent={Transition}
        keepMounted
        id={'date_send_update'}
        onClose={handleClouse}
        aria-describedby="date_send_update"
        sx={{overflow: 'hidden',  '& .MuiPaper-root': {width: '600px', top: '-20%'}}}
          >
            <Box  sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center',
             borderBottom: `1px solid ${colorsRef.modalInputBorderColor}`}}>
            <DialogTitle sx={{width: '80%', whiteSpace: 'wrap', }}>
                {"Зміна дати відправки замовлень"}</DialogTitle>
          <IconButton onClick={handleClouse}  component="button" sx={{marginRight: '10px'}}> 
            <HighlightOffIcon />
          </IconButton>
            </Box>

        <DialogContent>
        
        <Box sx={{width: '100%'}}>
            <Box sx={{ marginTop: '20px'}}>
            <Typography sx={{fontSize: '16px', margin: '10px 0' }}>{'Нова дата:'}</Typography>

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
            <DatePicker
            // id={name}
            inputFormat="YYYY-MM-DD"
            value={newDate}
            onChange={daateChange}
        renderInput={(params) => <ValidationTextField  align='left' {...params} />}
        />
    </LocalizationProvider>

            </Box>

            <Typography sx={{fontSize: '14px', marginTop: '30px'}}>{'ID виділених замовлень:'}</Typography>
            <Box sx={{display: 'flex'}}> {selected?.map((str, i, arr)=>
            <Typography key={i} sx={{fontSize: '14px'}}>{`${str} ${i!==arr.length-1?', ':''} `}</Typography>

                )}</Box>

        <Typography sx={{fontSize: '14px', marginTop: '20px'}}>{`Вибрано замовлень: ${selected[0]?selected.length:'0' }`}</Typography>
        </Box >
        </DialogContent>
        <DialogActions sx={{width: '95%',textAlign: 'center',
         marginLeft: 'auto', marginRight: 'auto', display: 'block', paddingBottom: '20px'}}>

      <StyledButton            
        text={'Зберегти'}
        func= {handleSubmit}
        border= {'#7bb31a'}               
           />

        </DialogActions>
      
      </Dialog> 
    )
}

export default DateSendUpdate