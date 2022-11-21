import { Select, MenuItem, ListItemText, InputBase, InputAdornment } from '@mui/material';
import { colorsRef } from '../../../../../consts/colorConstants';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, forwardRef } from 'react';

import { getOpenTDownloadExel } from '../../../../../redux/ordersReduser';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
    fontSize: '13px',
    maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
    width: 200,
    },
  },
};



export const DownloadComponent=()=>{
const dispatch = useDispatch();
const [open, setOpen] = useState(false);

const handleClickOpen = () => {
    console.log('open');
  setOpen(true);
};

const handleClose = () => {
    console.log('close');
  setOpen(false);
};

 const svgStyle = {
        fill: colorsRef.inputTextColor,
        marginRight: '-10px'
    
      };
 const selectStyles ={
        '& .MuiInputBase-input': {
          // maxHeight: '32px',
          lineHeight: 1.5,
        borderRadius: '8px',
        color: colorsRef.inputTextColor,
        position: 'relative',
        fontSize: 13,
        padding: '5px 0px',
      
      },
      '& .MuiOutlinedInput-root':{
        padding: '0px !important',
        paddingLeft: '14px',
        color: '#fff'
    },
      
};

const handleClickExel = ()=>{    
    dispatch(getOpenTDownloadExel(true))
    console.log('asd');
};



const handleChange = ()=>{
    handleClose()
    
console.log('change');
}

return(

    <Select 
    id="demo"
    value={''}
    onChange={handleChange}
    onClose={handleClickOpen}
    onOpen={handleClose}
    input={<InputBase onClick={handleClickOpen} startAdornment={

   <InputAdornment   position="start">
        <LocalMallOutlinedIcon sx={svgStyle}/>
      </InputAdornment>
    }  sx={selectStyles}/>}
    MenuProps={MenuProps}
  >   
      <MenuItem value={'exel'} >
        <ListItemText onClick={handleClickExel} sx={{fontSize: '12px' }} primary={'Завантажити Exel'} /> 
     
      </MenuItem>
      <MenuItem value={'back'} >
        <ListItemText sx={{fontSize: '12px' }} primary={'Повернення товару'} />
      </MenuItem>
      <MenuItem value={'cost'} >
        <ListItemText sx={{fontSize: '12px' }} primary={'Кошти отримано'} />
      </MenuItem>
      <MenuItem value={'cancel'} >
        <ListItemText sx={{fontSize: '12px' }} primary={'Відміна'} />
      </MenuItem>

  </Select>

)
}