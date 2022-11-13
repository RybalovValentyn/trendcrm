import {useState} from 'react';
import {OutlinedInput} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { colorsRef } from '../../consts/colorConstants';
import { useDispatch, useSelector } from 'react-redux';
import {groupStatus} from '../../redux/statusReduser';
import { selectStylesCheck } from './stylesInputs';
import {orderStatusUpdate} from '../../redux/asyncOrders';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
      width: 200,
      
    },
  },
};

export function StatusesSelectInput() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const statuses = useSelector((state) => state.ordersAll.getStatuses);

  let totalChecked = statuses.filter(str=>str.checked === true);
  // console.log(totalChecked);

  const stringSelectInput =() =>{
    if (statuses.length === totalChecked.length) {
      return `Всі:  ${totalChecked.length}`
    } else return totalChecked.length
  }
  const [groups, setgroups] = useState([stringSelectInput()]);

 

const setStatuses =(e)=>{
  let check = e.target.checked;
  let name = e.target.id;
// dispatch(orderStatusUpdate({name,check}))
}


const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    setgroups([])
  };
  const handleChange = (e) => {
    const {
      target: { value },
    } = e;
    setgroups(
       typeof value === 'string' ? value.split(',') : value,
    );
  };  

  return (
    <div>
      <FormControl sx={{minWidth:'158px', maxWidth: '158px', padding: 0 }}>
          <Select 
          id="demo-multiple-checkbox"
          multiple
          value={groups}
          onChange={handleChange}
          open={open}
           onClose={handleClose}
          onOpen={handleOpen}
          input={<OutlinedInput  sx={selectStylesCheck}/>}
          renderValue={(selected) =>selected.join(', ')}
          MenuProps={MenuProps}
        >

          {statuses.map((str, ind) => (
            <MenuItem  key={ind} value={str.name} onChange={setStatuses} >
              <Checkbox id={str.name} 
              defaultChecked
              //  checked={str.checked}
               />
              <ListItemText sx={{fontSize: '12px' }} primary={str.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
