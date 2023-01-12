import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {forwardRef } from 'react';
import { StyledButton } from '../../../buttons/buttons'; 
import { colorsRef } from '../../../../consts/colorConstants';
import { Box,IconButton } from '@mui/material';


const Transition = forwardRef(function Transition(props, ref) {       
    return <Slide direction="down" ref={ref} {...props} />;
  });


export const ModalComponent = ({Component, open, closeButtonText, sendButtonText, titleText, 
                      funcOnSend,funcOnClouse, borderHeader, borderAction, alignAction}) =>{


      const handleSendFromButton=()=>{
        funcOnClouse()
        funcOnSend()
      }

    return(
        <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={funcOnClouse}
        aria-describedby="alert-dialog-slide-description"
        sx={{'& .MuiPaper-root': {width: '600px', bottom: '10%'}}}
          >
    <Box  sx={{display: 'flex',alignItems: 'center',width: '100%',  justifyContent: 'space-between', borderBottom: borderHeader?`1px solid ${colorsRef.modalInputBorderColor}`:null}}>
        <DialogTitle sx={{'@media (max-width: 650px)': {
          width: '80%', whiteSpace:'pre-wrap',
            }}} >{titleText}</DialogTitle>
        <IconButton onClick={funcOnClouse} component="button" sx={{marginRight: '10px'}}>
            <HighlightOffIcon />
        </IconButton>
        </Box>

<Component/>
        <DialogActions sx={{width: '100%', borderTop: borderAction?`1px solid ${colorsRef.modalInputBorderColor}`:null , 
                        paddingTop: borderAction?'20px':'10px', paddingBottom: borderAction?'20px':'10px',
                        textAlign: alignAction?'center':null,  marginLeft: alignAction?'auto':null, marginRight: alignAction?'auto':null,
                        display: alignAction?'block':null
                        }}>

        {closeButtonText? <StyledButton
        text={closeButtonText}
        func= {funcOnClouse}
        border= {'#7bb31a'} 
           />:null}

      <StyledButton            
        text={sendButtonText}
        func= {handleSendFromButton}
        border= {closeButtonText?colorsRef.btnAddBorderColor:'#7bb31a'}               
           />
        </DialogActions>
      </Dialog> 
    )
}