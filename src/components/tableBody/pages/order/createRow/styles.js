import { colorsRef } from "../../../../../consts/colorConstants";
import {styled } from '@mui/material/styles';

 export const BootstrapInput = styled('input')(({ theme }) => 
    `border: 1px solid ${colorsRef.modalInputBorderColor};
    padding: 5px;
    border-radius: 8px;
    box-shadow: inset 0 1px 1px rgb(0 0 0 / 8%);
    font-size: 13px;
    max-width: 250px;
    width: 100%;
    
    `
 );
 export const autocompliteInputStyle={
  '& .MuiAutocomplete-input':{   
    fontSize: '13px', 
      
  },      
  width: '100%',
  maxWidth: '250px',
 };
export const textFieldStyles={
'& .MuiOutlinedInput-root':{
padding: 0,
borderRadius: '8px',
backgroundColor: colorsRef.formBgColor,
alignItems: 'center'
},
};
export const Label = styled('label')(
    ({ theme }) => `
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.85rem;
    display: block;
    font-weight: 400;
    color: ${colorsRef.labelTextColor};
    min-width: 180px;
    `,
  );
  export const inputStyle ={
    '& .MuiInputBase-input': {
        maxHeight: '32px',
        lineHeight: 1.5,
     color: colorsRef.inputTextColor,
      position: 'relative',
      backgrounColor: '#fff',
      fontSize: 13,
      padding: '6px 32px 6px 12px',
      width:'100%',
      maxWidth: '250px', 
      
      },

  }
  export const boxStyle={
    '& > :not(style)': 
    { margin:' 0 0 5px',  },
     width: '100%',
     display: 'flex',
     justifyContent: 'space-between',
     alignItems: 'center',
         
};