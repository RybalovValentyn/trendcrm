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
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import {idStatus} from '../../redux/statusReduser';




export function StyledNumInput() {
    const dispatch = useDispatch();
    const numStatus = useSelector((state) => state.addStatus.statusId);
   

    const BootstrapInput = styled(InputBase)(({ theme }) => ({
        '& .MuiInputBase-input': {
          borderRadius: 4,
          position: 'relative',
          backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
          fontSize: 12,
          border: `1px solid #d0d0d0`,
          width: 'auto',
          padding: '6px',
        },
        '&:focus &:hover': {
          
          },
      }));
const handleInputchange =(e)=>{
// console.log(e.target.value);
let result = e.target.value
dispatch(idStatus(result))
}

    return (
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%', maxWidth: '158px', margin: 0,  },
      }}
       autoComplete="off"
    >
      <BootstrapInput type='text'
    onChange={handleInputchange}
      value={numStatus}
      id="outlined" variant="outlined"
       />  
    </Box>
    );
  }