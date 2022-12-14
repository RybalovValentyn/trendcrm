import { colorsRef } from '../../../../../consts/colorConstants';


export  const selectStyles ={
    '& .MuiInputBase-input': {
      lineHeight: 1.5,
    borderRadius: '8px',
    color: colorsRef.inputTextColor,
    position: 'relative',
    fontSize: 13,
    padding: '5px 0px',
  
  },
  '& .MuiOutlinedInput-root':{
    padding: '0px !important',
    paddingLeft: '14px',
    color: '#fff'
},   
  
};

export  const svgStyle = {
    fill: colorsRef.svgColor,
    marginRight: '-10px'

  };

  export const listStyle={
    '& .MuiTypography-root':{
      fontSize: '13px',
    },
  };

  export const textFieldStyles={
    '@media (max-width: 520px)': {
      maxWidth: '100%',
     minWidth: '100px'
    },
    '@media (min-width: 520px)': {
      width: '250px',
    },
    paddingTop: 0,
    paddingBottom: 0,
    '& .MuiInputBase-root':{
      paddingTop: 0,
      paddingBottom: 0,
      maxHeight: '30px',
      '& input.MuiAutocomplete-input':{
        padding: '4px 10px 5px 10px',
        maxHeight: '30px',    
      },
      '& .MuiAutocomplete-root':{
        padding: '0px',
        maxHeight: '30px',    
      }
    },
  
  }