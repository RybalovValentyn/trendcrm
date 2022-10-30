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