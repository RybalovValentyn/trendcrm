import { colorsRef } from '../../consts/colorConstants';
import TextField from '@mui/material/TextField';
import {styled } from '@mui/material/styles';
import { InputBase } from '@mui/material';

export const selectStyles = {
    '& .MuiInputBase-input': {
      maxHeight: '30px',
      lineHeight: 1.5,
    borderRadius: '4px',
    color: colorsRef.inputTextColor,
    position: 'relative',
    backgrounColor: '#fff',
   fontSize: 12,
    padding: '0',
    maxWidth: '162px',   
},
 '&:focus &:hover': {
  border: 'none',
},
 }


 export const selectStylesCheck = {
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

export const ValidationTextField = styled(TextField)({
  '& .MuiInputBase-input': {
      borderRadius: '8px',
      position: 'relative',
      fontSize: 14,
      padding: '6px 0 6px 10px', 
      maxWidth: '120px',
      },
    '& div.MuiFormControl-root':{
        width: '100%',
      
      marginLeft: '50px'
  }
});

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    fontSize: 12,
    border: `1px solid #d0d0d0`,
    width: 'auto',
    padding: '6px',
  },
  '&:focus &:hover': {
    
    },
}));