import { SketchPicker, CompactPicker, ChromePicker, TwitterPicker } from 'react-color';
import {useState} from 'react';
import {Button, OutlinedInput} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import { colorsRef } from '../../consts/colorConstants';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import {colorStatus} from '../../redux/statusReduser'

const MenuProps = {
  PaperProps: {
    style: {
      width: 250,
           
    },
  },
};

export function ColorPicker() {
  const dispatch = useDispatch();
  const statusColor = useSelector((state) => state.addStatus.color);
  const [open, setOpen] = useState(false);

  const handleClose = () => {

    setOpen(false);
    
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <FormControl align= 'left' sx={{marginRight: '88px'}}>
          <Select 
            open={open}
             onClose={handleClose}
             onOpen={handleOpen}
          id="demo-multiple-checkbox"
          value="1"
          input={<OutlinedInput sx={{height: '32px'}}/>}
         
          MenuProps={MenuProps}
        >
           <MenuItem value="1" >
           <span style={{display: 'block' ,width: '25px', height:' 25px', borderRadius: '50%', backgroundColor: statusColor }}></span>
          </MenuItem>
            <MenuItem sx={{Height: 250}} >
            <SketchPicker
          onChange={(color) => {
            dispatch(colorStatus(color.hex))
          }}
          color={statusColor}
        />
            </MenuItem>
            <MenuItem sx={{display: 'flex', justifyContent: 'space-between'}} >
          <Button size="small"  variant="outlined" onClick = {handleClose}>Відмінити</Button>
          <Button size="small"  variant="outlined" onClick={handleClose}>Вибрати</Button>
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

