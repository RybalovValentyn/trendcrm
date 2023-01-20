import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import {forwardRef } from 'react';
import { StyledButton } from '../../../../buttons/buttons'; 
import { colorsRef } from '../../../../../consts/colorConstants';
import { Box,IconButton } from '@mui/material';
import { useState } from 'react';


const Transition = forwardRef(function Transition(props, ref) {       
    return <Slide direction="down" ref={ref} {...props} />;
  });


const ModalProductComponent = ({Component, open, closeButtonText, sendButtonText, titleText, 
                      funcOnSend,funcOnClouse,  borderAction, alignAction, isAutoclouse, width}) =>{
    const [maxWidth, setMaxWidth] = useState('md');

      const handleSendFromButton=()=>{
        if (!isAutoclouse) {
          funcOnClouse()
        }        
        funcOnSend()
      }

    return(
        <Dialog
        fullWidth={true}
        maxWidth={width}
        open={open}
        TransitionComponent={Transition}
        onClose={funcOnClouse}
        aria-describedby="alert-dialog-slide-description"
        sx={{'& .MuiPaper-root': {width: width?width:'600px'}}}
          >
    <Box  sx={{display: 'flex',alignItems: 'center',width: '100%',  justifyContent: 'space-between', backgroundColor: colorsRef.modalProductBgColor}}>
        <DialogTitle sx={{'@media (max-width: 650px)': {
          width: '80%', whiteSpace:'pre-wrap', 
            }, color: '#fff', textAlign: 'center', width: '90%', fontSize: '15px'}} >{titleText}</DialogTitle>
        <IconButton onClick={funcOnClouse} component="button" sx={{marginRight: '10px'}}>
            <CloseIcon fontSize='small' sx={{color: '#fff'}} />
        </IconButton>
        </Box>

        {Component?<Component/>:null}

        <DialogActions sx={{width: '100%', borderTop: borderAction?`1px solid ${colorsRef.modalInputBorderColor}`:null , 
                        paddingTop: '10px', paddingBottom:'20px',
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

export default ModalProductComponent