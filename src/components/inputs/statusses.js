import {useState} from 'react';
import {OutlinedInput} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { colorsRef } from '../../consts/colorConstants';
import { useDispatch, useSelector } from 'react-redux';
import {allStatuses} from '../../redux/statusReduser';
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

  const stringSelectInput =() =>{
      return `Всі:  ${statuses.length}`

  }
  const [groups, setgroups] = useState([stringSelectInput()]);
  const [indexes, setIndexes] = useState([...statuses.map(s=>`${s.id}`)])

  
  const setStatuses =(e)=>{
  let check = e.target.checked;
  let name = e.target.id;
  if (!check) {
    let ind = indexes.filter(s => s!==name)
    setIndexes([...ind])
  } else setIndexes([...indexes,`${name}`])

}


const handleClose = () => {
  dispatch(allStatuses(indexes))
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
    dispatch(allStatuses([]))
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
              <Checkbox id={`${str.id}`} 
              defaultChecked
                />
              <ListItemText sx={{fontSize: '12px' }} primary={str.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
