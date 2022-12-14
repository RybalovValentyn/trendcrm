import { Select, MenuItem, ListItemText, InputBase, InputAdornment } from '@mui/material';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, forwardRef } from 'react';
import { getOpenTableCreate } from '../../../../redux/ordersReduser';
import { selectStyles, svgStyle, listStyle } from '../order/createHead/style';
import { calculateNewValue } from '@testing-library/user-event/dist/utils';
import {iconStyle} from './style';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
    maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
    width: 150,
    },
  },
};



export const AddProductComponent=()=>{
const dispatch = useDispatch();
const [open, setOpen] = useState(false);

const handleClickOpen = () => {
  setOpen(!open);
};

const handleClickExel = ()=>{    
//   dispatch(getOpenTableCreate({id: 'opendownload', str: true}));
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
        <LocalMallOutlinedIcon sx={{color: '#606060',}}/>
      </InputAdornment>
    }  sx={selectStyles}/>}
    MenuProps={MenuProps}
  >   

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