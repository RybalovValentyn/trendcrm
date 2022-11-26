import {colorsRef} from '../../consts/colorConstants.js';
import {sizeConsts} from '../../consts/sizeConst.js';
import { styled } from '@mui/material/styles';
import { red, green, blue } from '@mui/material/colors';

export const containerSize = {
    maxWidth: sizeConsts.containerFormWdth,
    bgcolor: colorsRef.formBgColor,
    marginTop: '75px',
    borderRadius: '8px',
    boxShadow: '0px 6px 10px 1px rgb(0 0 0 / 25%)',    
    padding: '5px 60px',
    marginLeft: 'auto',
    marginRight: 'auto',
    alignItems: 'center',
    '@media (max-width:600px)': {
        padding: '5px 30px',
        maxWidth: sizeConsts.containerFormMobiWidth,
      },
}
export const TypographyStyle = {
    color: colorsRef.typografyColor,
    fontFamily: ['Open Sans', 'sans-serif'],
    fontSize: '1.7em',
    fontWeight: 700,
    marginTop: '25px',
    marginBottom: '10px'

}
export const logoStyle ={
    marginTop: '40px',
    height: '41px',
    width: '250px',
    marginLeft: 'auto',
    marginRight: 'auto',
    '@media (max-width:600px)': {
        height: '30px',
        width: '180px',
      },
}

export const inputStyle = {
    height: '30px',
    fontSize: '14px',
    color: colorsRef.inputTextColor,
    backgroundColor: colorsRef.inputBgColor,
    border: '1px solid'+ colorsRef.inputBorderColor,
    boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%)',
    borderRadius: '8px',
    marginTop: '10px',
    // padding: '5px 8px',
    '& .MuiInputBase-input':{
        padding: '5px 10px',
        width: '100%'
    }
    
}
export const formStyle ={
    alignItems: 'center',
    display: 'flex',
    marginRight: '0px',
    marginLeft: '8px',
    marginTop: '15px',
    color: colorsRef.inputTextColor,

}
export const checkBoxStyle ={
    '& .MuiSvgIcon-root': { fontSize: 15 },
    width: 13,
    height: 13,
    marginRight: '3px',
    '@media (max-width:600px)': {
        '& .MuiSvgIcon-root': { fontSize: 20 },
      },
}
export const  typographyStyle = {
    fontSize: 13,
    '@media (max-width:600px)': {
        fontSize: '10px',
        marginBottom: '2px'
      },
}
export const iconHelpStyle= {
    fontSize: 19,
    fontWeight: 900,
    marginLeft: '3px',
    marginBottom: '-4px' ,

    '@media (max-width:600px)': {
        fontSize: '15px',
        marginBottom: '-4px',

      },
}
export const buttonStyle ={
    marginTop: '20px',
    marginBottom: '30px',
    backgroundColor: colorsRef.enabledBtnColor,
    fontSize: '16px',
    borderRadius: '8px',
    fontWeight: 'bold',
    color: colorsRef.typografyColor,
    height: '40px',
    textTransform: 'none',
    opacity: 0.9,
    '&:hover':{ backgroundColor: colorsRef.enabledBtnColor,
        opacity: 1},
    '&:disabled':{
        backgroundColor: colorsRef.enabledBtnColor,
        opacity: 0.65
    },
    '&:enabled':{ backgroundColor: colorsRef.enabledBtnColor,
        opacity: 0.9},

}
