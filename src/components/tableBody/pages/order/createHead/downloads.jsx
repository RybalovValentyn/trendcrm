import { Select, MenuItem, ListItemText, InputBase, InputAdornment } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState} from 'react';
import { getOpenTableCreate, alertMessageUpdate } from '../../../../../redux/ordersReduser';
import { selectStyles, svgStyle, listStyle } from './style';
import { setOrderReturn, getFilteredOrders, getAllOrders, setOrderPayment } from '../../../../../redux/asyncThunc';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
    maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
    width: 180,
    },
  },
};



export const DownloadComponent=()=>{
const dispatch = useDispatch();
const [open, setOpen] = useState(false);
const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);
const isError = useSelector((state) =>state.ordersAll.isError);

let selected =  [];
if (sessionStorage.getItem("selected")) {
    selected =  sessionStorage.getItem("selected")?.split(',').filter(
      (id, index, array) => array.indexOf(id) === index);
}

const handleClickOpen = () => {
  setOpen(!open);
};
const successAlertAll = ({text, disp, func}) => { 
  if (selected?.length === 0 && selected) {
    return dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'error'}))
  }
  withReactContent(Swal).fire({  
      title: 'Увага!',  
      text: text,
      icon: 'warning',
      confirmButtonColor: 'rgb(239, 83, 80)',
      confirmButtonText: 'Так',
      showCancelButton: true,
      cancelButtonColor: '#3085d6',
      cancelButtonText: 'Ні',
    }).then((result) => {        
      if (result.isConfirmed) {
       if (func) {
          func('1')
          if (!isError) {
            Swal.fire(
              'Переміщено!',
              'Виділені замовлення успішно перенесені',
              'success'
            )
          } else return

        } 
      }
    });     
}
const handleClickExel = ()=>{    
  dispatch(getOpenTableCreate({id: 'opendownload', str: true}));
};

const handleChange = ()=>{    
setOpen(!open);
};
const handleReturnProduct =(value)=>{
  if (selected.length === 1 && selected[0] !== '') {
    dispatch(setOrderReturn({id: selected[0], value}));  
    } else if (selected.length > 1) {
    selected.map((id)=>{
      if (id !== '') {
        dispatch(setOrderReturn({id,value}))
      }  
    })    
  }
  setTimeout(getUpdate, '200') 
}

const handlePaymentReceived=(value)=>{
  if (selected?.length === 1 && selected[0] !== '') {
    dispatch(setOrderPayment({id: selected[0], value}));  
    } else if (selected?.length > 1) {
    selected.map((id)=>{
      if (id !== '') {
        dispatch(setOrderPayment({id,value}))
      }        
    })    
  }
  setTimeout(getUpdate, '200') 
}

const handleCancelled =()=>{
  if (selected?.length === 0 && selected) {
    return dispatch(alertMessageUpdate({message: 'idSelectedWarn', type: 'error'}))
  }
  handleReturnProduct('0')
  handlePaymentReceived('0')
}

const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
 }
const returnProduct=()=>{
  const text = `Замовлення перемістяться до "повернення товару"`;
  successAlertAll({text: text, func: handleReturnProduct });

}

const paymentProduct=()=>{
  const text = `Замовлення перемістяться до "оплата отримана"`;
  successAlertAll({text: text, func: handlePaymentReceived });
}
return(
    <Select 
    id="download_exel"
    value={''}
    open={open}
    onChange={handleChange}
    input={<InputBase onClick={handleClickOpen} startAdornment={

   <InputAdornment   position="start">
        <LocalMallOutlinedIcon sx={svgStyle}/>
      </InputAdornment>
    }  sx={selectStyles}/>}
    MenuProps={MenuProps}
  >   
      {/* <MenuItem value={'exel'} sx={listStyle} >
        <ListItemText onClick={handleClickExel} primary={'Завантажити Exel'} /> 
     
      </MenuItem> */}
      <MenuItem value={'back'} sx={listStyle} >
        <ListItemText onClick={returnProduct} primary={'Повернення товару'} />
      </MenuItem>
      <MenuItem value={'cost'} sx={listStyle} >
        <ListItemText onClick ={paymentProduct} primary={'Кошти отримано'} />
      </MenuItem>
      <MenuItem value={'cancel'} sx={listStyle} >
        <ListItemText onClick ={handleCancelled} primary={'Відміна'} />
      </MenuItem>

  </Select>
)
}