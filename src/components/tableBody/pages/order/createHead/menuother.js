import { Select, MenuItem, ListItemText, InputBase, InputAdornment} from '@mui/material';
import { useDispatch, useSelector,  } from 'react-redux';
import { useState, forwardRef } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import { getOpenTDownloadExel } from '../../../../../redux/ordersReduser';
import { selectStyles, svgStyle, listStyle } from './style';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {    
    maxHeight: ITEM_HEIGHT * 8 + ITEM_PADDING_TOP,
    width: 200,
    },

  },
};



export const OtherMenuComponent=()=>{

const dispatch = useDispatch();

const [open, setOpen] = useState(false);

const handleClickOpen = () => {
    console.log('open');
  setOpen(!open);
};





const handleClicSms = ()=>{    

    console.log('asd');
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
       <SettingsIcon  sx={svgStyle}/>
      </InputAdornment>
    }  sx={selectStyles}/>}
    MenuProps={MenuProps}
  >   
      <MenuItem value={'sms'} sx={listStyle} >
        <ListItemText onClick={handleClicSms}  primary={'Відправити SMS'} /> 
     
      </MenuItem>
      <MenuItem value={'justin'} sx={listStyle} >
        <ListItemText  primary={'Justin'} />
      </MenuItem>
      <MenuItem value={'fixed'} sx={listStyle} >
        <ListItemText  primary={'Редагувати'} />
      </MenuItem>
      <MenuItem value={'prepay'} sx={listStyle}>
        <ListItemText  primary={'Передплата'} />
      </MenuItem>
       <MenuItem value={'chnge_ststus'} sx={listStyle} >
        <ListItemText  primary={'Змінити статуси'} />
      </MenuItem>
      <MenuItem value={'schange_date'} sx={listStyle} >
        <ListItemText  primary={'Змінити дату відправлення'} />
      </MenuItem>
      <MenuItem value={'export_exel'} sx={listStyle}>
        <ListItemText  primary={'Експотр Exel'} />
      </MenuItem>
      <MenuItem value={'import_exel'} sx={listStyle} >
        <ListItemText  primary={'Імпорт Exel'} />
      </MenuItem>
      <MenuItem value={'delete'} sx={listStyle} >
        <ListItemText  primary={'Видалити'} />
      </MenuItem>

  </Select>

)
}