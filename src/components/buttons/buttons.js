import Button from '@mui/material/Button';
import {colorsRef} from '../../consts/colorConstants';



export const StyledButton = ({text, func, startIcon, bgColor, border})=>{
    const buttonStyle={
        border: `1px solid ${border}`,
        fontSize: '12px',
        color: colorsRef.buttonTextColorInModal,
        borderRadius: '8px',
        padding: '4px 10px 3px 10px',
        minWidth: 'max-content',
        alignItem: 'center',
        '& .MuiButton-startIcon':{
            margin: 0,
            
        },
        backgroundColor: bgColor,

      }
    return(
        <Button sx={buttonStyle} onClick={func} 
        startIcon={startIcon}
        >{text}</Button>
    )
}