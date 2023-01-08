import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useDispatch, useSelector,  } from 'react-redux';
import { forwardRef } from 'react';
import { getOpenTableCreate } from '../../../../redux/ordersReduser';
import { InputFile } from '../../../inputs/fileInput/fileInput';
import { StyledButton } from '../../../buttons/buttons'; 
import { colorsRef } from '../../../../consts/colorConstants';
import { MenuItem, Select, Box, ListItemText, InputBase, Typography, OutlinedInput, IconButton } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { autoUpdate, autoUpdateRowsReupdate } from '../../../../redux/ordersReduser';
import { setCommentAdd,getFilteredOrders,getAllOrders   } from '../../../../redux/asyncThunc';


const Transition = forwardRef(function Transition(props, ref) {       
    return <Slide direction="down" ref={ref} {...props} />;
  });


 const ComentModalMenu = () =>{
    const dispatch = useDispatch();
    const openDownComent = useSelector((state) => state.ordersAll.modalControl.comentSettings);
    const rowsToUpdate = useSelector((state) => state.ordersAll.rowsToUpdate);
    const [coment, setComent]= useState('');
    const [idComent, setIdComent]= useState('');
    const filteredRows = useSelector((state) => state.ordersAll.tHeadColumnFiltered);

 useEffect(()=>{
if (rowsToUpdate?.id) {
    setComent(rowsToUpdate?.comment)
    setIdComent(rowsToUpdate?.id)
}
},[openDownComent]);

const handleClouse =(e)=>{
  dispatch(getOpenTableCreate({id: 'comentSettings', str: false}));
  dispatch(autoUpdate({id: 'rowsToUpdate', str:[]}));
}
const handleChange = (e)=>{
    setComent(e.target.value)
    console.log(coment, idComent);
}

const setHandleupdateInfo =()=>{
  dispatch(setCommentAdd({coment, idComent}));
   dispatch(getOpenTableCreate({id: 'comentSettings', str: false}));
   getUpdate()
};
const getUpdate = ()=>{
  if (filteredRows?.length > 0) {
    dispatch(getFilteredOrders())
  } else dispatch(getAllOrders())
}
    return(
        <Dialog
        open={openDownComent}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClouse}
        aria-describedby="dialog-slide-description"
        sx={{overflow: 'hidden', '& .MuiPaper-root': {width: '520px', bottom: '200px' }}}
          >
            <Box onClick={handleClouse} sx={{display: 'flex', justifyContent: 'space-around'}}>
            <DialogTitle sx={{display: 'block', position: 'relative'}} >{`Kоментарій: ${idComent?idComent:''}`}</DialogTitle>
          <IconButton sx={{marginLeft: '150px', position: 'absolute', top: '15px', right: '15px'}}  component="label">
            <HighlightOffIcon />
          </IconButton>
            </Box>

        <DialogContent sx={{display: 'flex', justifyContent: 'center'}}>
        
        <textarea
        placeholder='Додайте свій коментар'
        style={{maxWidth: '350px',
         border: `1px solid ${colorsRef.modalInputBorderColor}`,
        borderRadius: '8px',
        width: '350px',
        resize: 'vertical',
        outline: 'none',
       height: '100px'

        }}
         value={coment}
        onChange={handleChange}
         ></textarea>
     
  
        </DialogContent>
        <DialogActions sx={{width: '500px', justifyContent: 'space-around'}}>


      <StyledButton            
        text={'Зберегти'}
        func= {setHandleupdateInfo}
        border= {colorsRef.btnAddBorderColor}
               
           />

        </DialogActions>
      </Dialog> 
    )
};

export default ComentModalMenu