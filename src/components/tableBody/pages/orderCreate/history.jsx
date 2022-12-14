import { Select, MenuItem, ListItemText, InputBase, InputAdornment } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, forwardRef } from 'react';
import { getOpenTableCreate } from '../../../../redux/ordersReduser';
import { selectStyles, svgStyle, listStyle } from '../order/createHead/style';
import DifferenceIcon from '@mui/icons-material/Difference';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
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



export const AddHistoryComponent=()=>{
const dispatch = useDispatch();
const [open, setOpen] = useState(false);

const handleClickOpen = () => {
  setOpen(!open);
};

const handleClickExel = ()=>{    
  // dispatch(getOpenTableCreate({id: 'opendownload', str: true}));
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
        <SettingsIcon  sx={{color: '#606060',}}/>
      </InputAdornment>
    }  sx={selectStyles}/>}
    MenuProps={MenuProps}
  >   
      <MenuItem value={'back'} sx={listStyle} >
        <ListItemText primary={'Історія'} />
      </MenuItem>

      <MenuItem value={'cost'} sx={listStyle} >
        <ListItemText primary={'UTM мітки'} />
      </MenuItem>

      <MenuItem value={'cancel'} sx={listStyle} >
        <ListItemText primary={'Дублі'} />
      </MenuItem>

      <MenuItem sx={{borderTop: '1px solid #d0d0d0', padding: '0px'}} >
      </MenuItem>

      <MenuItem value={'copy'} sx={listStyle} >
      <DifferenceIcon sx={{fontSize: '14px', marginRight: '10px'}}/>
       <ListItemText primary={'Копіювати'} />
      </MenuItem>

      <MenuItem value={'delete'} sx={listStyle} >
        <DeleteOutlineOutlinedIcon sx={{fontSize: '14px', marginRight: '10px'}}/>
        <ListItemText primary={'Видалити'} />
      </MenuItem>
  </Select>
)
}