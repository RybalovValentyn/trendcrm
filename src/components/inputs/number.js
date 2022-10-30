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


const handleInputchange =(e)=>{
    if (Number(e.target.value)) {
        dispatch(idStatus(e.target.value))
    } }

    return (
      <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '100%', maxWidth: '158px', margin: 0, borderRadius: '4px', fontSize: 12, border: '1px solid #d0d0d0', padding: '6px', },
      }}     
       autoComplete="off"
    >
      <input 
    onChange={handleInputchange}
      value={numStatus}
      id="outlined" 
       />  
    </Box>
    );
  }