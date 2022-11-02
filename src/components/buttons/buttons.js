import Button from '@mui/material/Button';
import {colorsRef} from '../../consts/colorConstants';



export const StyledButton = ({text, func, startIcon})=>{
    const buttonStyle={
        border: `1px solid ${colorsRef.buttonBorderInModal}`,
        height: '30px',
        color: colorsRef.buttonTextColorInModal,
        borderRadius: '8px',
        padding: '4px 45px'
      }
    return(
        <Button sx={buttonStyle} onClick={func} 
        startIcon={startIcon}
        >{text}</Button>
    )
}