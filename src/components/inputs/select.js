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

export function SelectInput() {
  const dispatch = useDispatch();
  const groupNames = useSelector((state) => state.addStatus.groups);
  const [groups, setgroups] = useState(['Нічого не вибрано']);
  const [open, setOpen] = useState(false);


  const handleClose = () => {
    let str = groups.reduce((acc,nam)=>{
     let s = groupNames.find((n)=>{
        if ( n.name === nam) {
        return n.id
        }
     })
     acc.push(s)
     return acc
    },[]).map(s=>s.id)
    dispatch(groupStatus(str))
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
          input={<OutlinedInput sx={selectStylesCheck}/>}
          renderValue={(selected) =>selected.join(', ')}
          MenuProps={MenuProps}
        >

          {groupNames.map((name) => (
            <MenuItem  key={name.id} value={name.name} >
              <Checkbox checked={groups.indexOf(name.name) > -1} />
              <ListItemText sx={{fontSize: '12px' }} primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
