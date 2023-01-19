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
   fontSize: 13,
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
  borderRadius: '8px',
  color: colorsRef.inputTextColor,
  position: 'relative',
  backgrounColor: '#fff',
  fontSize: 13,
  padding: '5px 32px 5px 12px',
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
      backgrounColor: '#fff'
      },
    '& div.MuiFormControl-root':{
        width: '100%',      
      marginLeft: '50px'
  },
  '& .MuiInputBase-root > fieldset': {
    // borderColor: '#c0c0c0 !important',
    borderRadius: '8px !important'
  }
});

export const BootstrapInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    borderRadius: '8px',
    position: 'relative',
    fontSize: 13,
    border: `1px solid #d0d0d0`,
    width: 'auto',
    padding: '5px',
  },
  '&:focus &:hover': {
    
    },
}));

export const StyledextField = styled(TextField)({
  '& label': {
   color: '#777777 !important',
   top:'-18px'
 },
 '& label.Mui-focused': {
   display: 'none',
   opasity: 0,

 },

   '& .MuiInputBase-input': {
       borderRadius: '4px ',
       position: 'relative',
       fontSize: '12px',
       padding: '0',         
       color: colorsRef.inputHeadTextColor, 
    
       },
     '& .MuiOutlinedInput-root': {
      
       '& fieldset': {
         color: colorsRef.inputHeadTextColor,
         border: 'none !important',
          
       },
      '&.Mui-focused fieldset': {
       border: 'none !important',
        
     }},
     '& .MuiInputBase-root': {
        miWidth: '80px',
        padding: '3px 0px 1px 8px',
        minWidth: '80px',
        marginLeft: '10px',
        marginRight: '10px',
       
       },
     '& div.MuiFormControl-root':{
       position: 'relative',
      
      },
   '& .MuiButtonBase-root':{
       padding: '0px',
       width: 0,
       height: 0,
       position: 'absolute',
       zIndex: -2,
       top: 0

   },
   // '& .MuiSvgIcon-root':{
   //     width: 0,
   //     height: 0,
   //     position: 'absolute',
   //     zIndex: -2,
   //     top: 0
   // },

 });