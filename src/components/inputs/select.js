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
  const names = useSelector((state) => state.addStatus.groupsName);
  const [groups, setgroups] = useState(['Нічого не вибрано']);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    dispatch(groupStatus(groups))
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
  const selectStyles = {
      '& .MuiInputBase-input': {
        maxHeight: '32px',
        lineHeight: 1.5,
      borderRadius: '4px',
      color: colorsRef.inputTextColor,
      position: 'relative',
      backgrounColor: '#fff',
      fontSize: 12,
      padding: '6px 32px 6px 12px',
      maxWidth: '162px',   
  },
   }

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
          input={<OutlinedInput sx={selectStyles}/>}
          renderValue={(selected) =>selected.join(', ')}
          MenuProps={MenuProps}
        >

          {names.map((name) => (
            <MenuItem  key={name} value={name} >
              <Checkbox checked={groups.indexOf(name) > -1} />
              <ListItemText sx={{fontSize: '12px' }} primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
