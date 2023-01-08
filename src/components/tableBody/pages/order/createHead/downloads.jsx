import { Select, MenuItem, ListItemText, InputBase, InputAdornment } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, forwardRef } from 'react';
import { getOpenTableCreate } from '../../../../../redux/ordersReduser';
import { selectStyles, svgStyle, listStyle } from './style';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import { setOrderReturn, getFilteredOrders, getAllOrders, setOrderPayment } from '../../../../../redux/asyncThunc';

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
let selected =  sessionStorage.getItem("selected").split(',');

const handleClickOpen = () => {
  setOpen(!open);
};

const handleClickExel = ()=>{    
  dispatch(getOpenTableCreate({id: 'opendownload', str: true}));
};

const handleChange = ()=>{    
setOpen(!open);
};
const handleReturnProduct =(value)=>{
  let length = selected.length
  if (length === 1 && selected[0] !== '') {
    dispatch(setOrderReturn({id: selected[0], value}));  
  } else if (length > 1) {
    selected.map((id)=>{
      if (id !== '') {
        dispatch(setOrderReturn({id,value}))
      }  
    })
  }else if (length === 0) {
    return
  }
getUpdate()
}

const handlePaymentReceived=(value)=>{
  let length = selected.length
  if (length === 1 && selected[0] !== '') {
    dispatch(setOrderPayment({id: selected[0], value}));  
  } else if (length > 1) {
    selected.map((id)=>{
      if (id !== '') {
        dispatch(setOrderPayment({id,value}))
      }  
    })
  }else if (length === 0) {
    return
  }
getUpdate()
}

const handleCancelled =()=>{
  handleReturnProduct('0')
  handlePaymentReceived('0')
}
const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
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
      <MenuItem value={'exel'} sx={listStyle} >
        <ListItemText onClick={handleClickExel} primary={'Завантажити Exel'} /> 
     
      </MenuItem>
      <MenuItem value={'back'} sx={listStyle} >
        <ListItemText onClick={()=>handleReturnProduct('1')} primary={'Повернення товару'} />
      </MenuItem>
      <MenuItem value={'cost'} sx={listStyle} >
        <ListItemText onClick ={()=>handlePaymentReceived('1')} primary={'Кошти отримано'} />
      </MenuItem>
      <MenuItem value={'cancel'} sx={listStyle} >
        <ListItemText onClick ={handleCancelled} primary={'Відміна'} />
      </MenuItem>

  </Select>
)
}