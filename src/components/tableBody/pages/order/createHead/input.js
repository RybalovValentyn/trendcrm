import {styled } from '@mui/material/styles';
import { InputBase, TextField } from '@mui/material';
import { colorsRef } from '../../../../../consts/colorConstants';



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
    '& .MuiSvgIcon-root':{
        width: 0,
        height: 0,
        position: 'absolute',
        zIndex: -2,
        top: 0
    },

  });




export const StyledInput = styled(InputBase)(({ theme }) => ({
    '& .MuiInputBase-input': {
      borderRadius: '4px',
      position: 'relative',
      fontSize: '12px',
      border: `1px solid ${colorsRef.inputHeadBorderColor}`,
      padding: '2px 12px ',
      color: colorsRef.inputHeadTextColor, 
      width: '100%', 
      minWidth: '85px',
      // maxWidth: '85px',
      // margin: '0px 20px' 
      // marginLeft: '10px'
    },

  }));

  export const selectStylesCheck = {
    '& .MuiInputBase-input': {     
      maxHeight: '23px',
      lineHeight: 1.5,
      border: `1px solid ${colorsRef.inputHeadBorderColor}`,
    borderRadius: '4px',
    color: colorsRef.inputTextColor,
    position: 'relative',
    backgrounColor: '#fff',
    fontSize: '12px',
    padding: '2px 32px 2px 12px',
    minWidth: '65px',
    maxWidth: '86px',  
   
  },

  }

  export const selectStyles = {
    '& .MuiInputBase-input': {     
      maxHeight: '32px',
      height: '32px',
      lineHeight: 1.5,
    borderRadius: '4px',
    color: colorsRef.inputTextColor,
    position: 'relative',
    backgrounColor: '#fff',
    fontSize: '12px',
    padding: '7px 32px 7px 12px',
    minWidth: '135px',
   
  },
  
  }