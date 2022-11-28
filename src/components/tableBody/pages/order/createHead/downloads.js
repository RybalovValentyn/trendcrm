import { Select, MenuItem, ListItemText, InputBase, InputAdornment } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, forwardRef } from 'react';
import { getOpenTDownloadExel } from '../../../../../redux/ordersReduser';
import { selectStyles, svgStyle, listStyle } from './style';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';

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

const handleClickOpen = () => {
  setOpen(!open);
};

const handleClickExel = ()=>{    
    dispatch(getOpenTDownloadExel(true))
};



const handleChange = ()=>{    
setOpen(!open);
};


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
        <ListItemText primary={'Повернення товару'} />
      </MenuItem>
      <MenuItem value={'cost'} sx={listStyle} >
        <ListItemText primary={'Кошти отримано'} />
      </MenuItem>
      <MenuItem value={'cancel'} sx={listStyle} >
        <ListItemText primary={'Відміна'} />
      </MenuItem>

  </Select>
)
}