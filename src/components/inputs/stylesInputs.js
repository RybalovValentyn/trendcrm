import { colorsRef } from '../../consts/colorConstants';


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