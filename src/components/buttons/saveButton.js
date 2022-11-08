import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import IconButton from '@mui/material/IconButton';
import { colorsRef } from '../../consts/colorConstants';

export const SaveButton = () =>{

    const btnChangeSave =()=>{
        console.log('hi');
    }

const icoBtnStyle = {
    color: colorsRef.inputTextColor,
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'block',
    position: 'fixed',
    boxShadow:' 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%)',
    bottom: '50px',
    right: '66px'
}
    return(

        <IconButton sx={icoBtnStyle} onClick={btnChangeSave} color="primary" aria-label="upload picture" component="label">
        <SaveAsOutlinedIcon />
      </IconButton>
    )
}

